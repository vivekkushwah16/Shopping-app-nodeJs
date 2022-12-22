const Product = require("../../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) =>
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    })
  );
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) =>
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
      hasProducts: products.length > 0,
      productCSS: true,
      activeShop: true,
    })
  );
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Chart",
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
