const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin");
const {
  getAddProducts,
  postAddProducts,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = adminController;

// admin/add-product => GET
router.get("/add-product", getAddProducts);
router.get("/products", getProducts);
router.get("/edit-product/:productId", getEditProduct);

// // admin/add-product => POST
router.post("/add-product", postAddProducts);
router.post("/edit-product", postEditProduct);
router.post("/delete-product", postDeleteProduct);

module.exports = router;
