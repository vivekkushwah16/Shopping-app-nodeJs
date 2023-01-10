const express = require("express");
const {
  getLogin,
  postLogin,
  postLogout,
  postSignup,
  getSignup,
} = require("../../controllers/auth");
const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSignup);
router.post("/signup", postSignup);

module.exports = router;
