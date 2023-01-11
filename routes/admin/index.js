const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin");
const isAuth = require("../../middleware/is-auth");
const { check, body } = require("express-validator/check");

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
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postAddProducts
);
router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postEditProduct
);
router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
