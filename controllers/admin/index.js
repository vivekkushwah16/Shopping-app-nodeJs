const Product = require("../../models/product");
const { validationResult } = require("express-validator");
const { throwError } = require("../../util/path");

exports.getAddProducts = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: "",
    validationErrors: [],
  });
};
exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      hasError: true,
      errorMessage: errors.array()[0].msg,
      path: "/admin/add-product",
      editing: false,
      product: {
        title,
        imageUrl,
        price,
        description,
      },
      validationErrors: errors.array(),
    });
  }
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
      return next(throwError(err, 500));
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
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
        path: "/admin/edit-product",
        editing: !!editMode,
        product,
        hasError: false,
        errorMessage: "",
        validationErrors: [],
      });
    })
    .catch((err) => console.log(">>>>", err));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Edit Product",
      hasError: true,
      errorMessage: errors.array()[0].msg,
      path: "/admin/edit-product",
      editing: true,
      product: { _id: productId, title, imageUrl, price, description },
      validationErrors: errors.array(),
    });
  }
  Product.findById(productId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      product.save().then(() => {
        console.log("PRODUCT UPDATED>>>>");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      return next(throwError(err, 500));
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId, userId: req.user._id })
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
