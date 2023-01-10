const Product = require("../../models/product");
const Order = require("../../models/order");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        isAuthentication: req.session.isLoggedIn,
        path: "/",
      });
    })
    .catch((err) => {
      console.log(">>>>>>", err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        isAuthentication: req.session.isLoggedIn,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(">>>>>>", err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId, ">>>>>>>PRO");
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        isAuthentication: req.session.isLoggedIn,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(">>>>>>", err);
    });
};

exports.getCart = (req, res, next) => {
  req.session.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        isAuthentication: req.session.isLoggedIn,
        path: "/cart",
        pageTitle: "Your Cart",
        products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => req.session.user.addToCart(product))
    .then((result) => {
      console.log(result, ">>>>>>>>>Cart");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.session.user._id })
    .then((orders) => {
      console.log(orders[0].products, ">>>>");
      res.render("shop/orders", {
        isAuthentication: req.session.isLoggedIn,
        path: "/orders",
        pageTitle: "Your Orders",
        orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.session.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => ({
        quantity: i.quantity,
        product: { ...i.productId._doc },
      }));
      const order = new Order({
        user: { name: user.name, userId: user },
        products,
      });
      return order.save();
    })
    .then(() => {
      req.session.user.clearCart();
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    isAuthentication: req.session.isLoggedIn,
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.session.user
    .removeFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
