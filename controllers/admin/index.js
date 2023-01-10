const Product = require("../../models/product");

exports.getAddProducts = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    // isAuthenticated: req.session.isLoggedIn,
    path: "/admin/add-product",
    editing: false,
  });
};
exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });
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
  Product.find()
    .then((products) =>
      res.render("admin/products", {
        prods: products,
        pageTitle: "All Products",
        // isAuthenticated: req.session.isLoggedIn,
        path: "/admin/products",
      })
    )
    .catch((err) => {
      console.log(">>>>>", err);
    });
};

exports.getEditProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
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
        // isAuthenticated: req.isLoggedIn,
        path: "/admin/edit-product",
        editing: !!editMode,
        product,
      });
    })
    .catch((err) => console.log(">>>>", err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.findById(productId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      product.save();
    })
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

  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log("PRODUCT DELETED>>>>", prodId);
      req.user.removeFromCart(prodId).then(() => {
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      console.log(">>>>>", err);
    });
};
