const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/products");
const { getAddProducts,postAddProducts } = productsController;



// admin/add-product => GET
router.get("/add-product", getAddProducts);

// admin/add-product => POST
router.post("/add-product", postAddProducts);

module.exports = router;
