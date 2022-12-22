const Product = require("../../models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  });
};
exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) =>
    res.render("admin/products", {
      prods: products,
      pageTitle: "All Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      productCSS: true,
      activeShop: true,
    })
  );
};

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
  });
};
