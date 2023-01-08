const express = require("express");
const router = express.Router();
const shopController = require("../../controllers/shop");

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
router.get("/cart", getCart);
router.post("/cart", postCart);
// // router.get("/checkout", getCheckout);
router.get("/products", getProducts);
router.get("/products/:productId", getProduct);
router.post("/cart-delete-item", postCartDeleteProduct);
router.post("/create-order", postOrder);
router.get("/orders", getOrders);

module.exports = router;
