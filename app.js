const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const csrf = require("csurf");
const mongoose = require("mongoose");
const mongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const { get404 } = require("./controllers/error");

const csrfProtection = csrf();
const MONGODB_URL =
  "mongodb+srv://vivek_kushwah:WBqvMhdpQpfxf5mh@cluster0.xvjanfb.mongodb.net/shop";
const User = require("./models/user");

// Ejs - Dynamic template
app.set("view engine", "ejs");
app.set("views", "views");

// store for creating session collection in mongoDB
const store = new mongoDBStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

app.use(bodyParser.urlencoded({ extended: false })); // Only parse the body when getting it from the form.
app.use(express.static(path.join(__dirname, "public")));
// session storage middleware
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(get404);

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    // console.log(result, ">>>>>>>>>");

    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err, ">>>>>>>>>>>>> db not connected!");
  });
