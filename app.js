const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
// const { engine } = require("express-handlebars"); // v6

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/error");
const mongoose = require("mongoose");

const User = require("./models/user");

// Ejs - Dynamic template
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // Only parse the body when getting it from the form.
app.use(express.static(path.join(__dirname, "public")));

// to use user obj from req
app.use((req, res, next) => {
  User.findById("63bad6c4e954ec18404e021f")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(get404);

mongoose
  .connect(
    "mongodb+srv://vivek_kushwah:WBqvMhdpQpfxf5mh@cluster0.xvjanfb.mongodb.net/shop?retryWrites=true"
  )
  .then((result) => {
    console.log(result, ">>>>>>>>>");
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            name: "vivek_kushwah",
            email: "test@email.com",
            cart: { items: [] },
          });
          user.save();
        }
      })
      .catch((err) => console.log(err));

    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err, ">>>>>>>>>>>>> db not connected!");
  });
