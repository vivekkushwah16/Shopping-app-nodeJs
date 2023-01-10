const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin");
const isAuth = require("../../middleware/is-auth");
const {
  getAddProducts,
  postAddProducts,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = adminController;

// admin/add-product => GET
router.get("/add-product", isAuth, getAddProducts);
router.get("/products", isAuth, getProducts);
router.get("/edit-product/:productId", isAuth, getEditProduct);

// // admin/add-product => POST
router.post("/add-product", isAuth, postAddProducts);
router.post("/edit-product", isAuth, postEditProduct);
router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
