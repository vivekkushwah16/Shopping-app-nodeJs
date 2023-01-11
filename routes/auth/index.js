const express = require("express");
const {
  getLogin,
  postLogin,
  postLogout,
  postSignup,
  getSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
} = require("../../controllers/auth");
const router = express.Router();

router.post("/new-password", postNewPassword);
router.get("/reset/:token", getNewPassword);
router.post("/reset", postReset);
router.get("/reset", getReset);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSignup);
router.post("/signup", postSignup);

module.exports = router;
