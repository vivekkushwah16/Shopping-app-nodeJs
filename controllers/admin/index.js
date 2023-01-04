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
  req.user
    .createProduct({
      description,
      imageUrl,
      title,
      price,
      userId: req.user.id,
    }) // Product.create(object)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(">>>>>>>>>", err);
    });
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts() // Product.findAll()
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
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then((products) => {
      const [product] = products;
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
  Product.findByPk(productId)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;

      return product.save();
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
  const prodId = +req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      console.log("PRODUCT DELETED>>>>");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(">>>>>", err);
    });
};
