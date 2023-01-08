const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
// const { engine } = require("express-handlebars"); // v6

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { get404 } = require("./controllers/error");
const { mongoConnect } = require("./util/database");

// const Product = require("./models/product");
const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");
// Ejs - Dynamic template
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // Only parse the body when getting it from the form.
app.use(express.static(path.join(__dirname, "public")));

// to use user obj from req
app.use((req, res, next) => {
  User.findById("63b96418a688ecdb2cd0bd07")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(get404);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
});
