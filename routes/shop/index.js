const express = require("express");
const router = express.Router();
const shopController = require("../../controllers/shop");
const isAuth = require("../../middleware/is-auth");

const {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getProduct,
  postCart,
  postCartDeleteProduct,
  postOrder,
  getOrders,
} = shopController;

router.get("/", getIndex);
router.get("/cart", isAuth, getCart);
router.post("/cart", isAuth, postCart);
// // router.get("/checkout", getCheckout);
router.get("/products", getProducts);
router.get("/products/:productId", getProduct);
router.post("/cart-delete-item", isAuth, postCartDeleteProduct);
router.post("/create-order", isAuth, postOrder);
router.get("/orders", isAuth, getOrders);

module.exports = router;
