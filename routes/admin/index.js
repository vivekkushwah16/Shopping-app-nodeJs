const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin");
const { getAddProducts, postAddProducts, getProducts } = adminController;

// admin/add-product => GET
router.get("/add-product", getAddProducts);
router.get("/products", getProducts);
// router.get("/edit-product");

// admin/add-product => POST
router.post("/add-product", postAddProducts);

module.exports = router;
