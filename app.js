const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
// const { engine } = require("express-handlebars"); // v6

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/error");

// ExpressHandlebars - Dynamic template
// app.engine("hbs", engine({ extname: "hbs", defaultLayout: "main-layout",layoutsDir:"views/layouts/" }));
// app.set("view engine", "hbs");
// app.set("views", "views");

// PUG - Dynamic template
// app.set("view engine", "pug");
// app.set("views", "views");

// Ejs - Dynamic template
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // Only parse the body when getting it from the form.
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(get404);

app.listen(3000, () => console.log("listening on port 3000"));
