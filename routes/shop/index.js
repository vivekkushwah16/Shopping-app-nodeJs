const express = require("express");
const router = express.Router();
const shopController = require("../../controllers/shop");
const { getIndex, getProducts, getCart, getCheckout } = shopController;
router.get("/", getIndex);
router.get("/cart", getCart);
router.get("/checkout", getCheckout);
router.get("/products", getProducts);

module.exports = router;
