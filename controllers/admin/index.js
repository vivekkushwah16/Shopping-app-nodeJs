const Product = require("../../models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({ title, price, description, imageUrl });
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(">>>>>>>>>", err);   
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) =>
      res.render("admin/products", {
        prods: products,
        pageTitle: "All Products",
        path: "/admin/products",
      })
    )
    .catch((err) => {
      console.log(">>>>>", err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: !!editMode,
        product,
      });
    })
    .catch((err) => console.log(">>>>", err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    productId,
    req.user._id
  );
  product
    .save()
    .then(() => {
      console.log("PRODUCT UPDATED>>>>");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(">>>>>", err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log("PRODUCT DELETED>>>>");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(">>>>>", err);
    });
};
