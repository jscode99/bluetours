const router = require("express").Router();
//controller
const {
  signup,
  signin,
  requireSignin,
  logout,
  googleLogin,
} = require("../../controller/admin/auth");
const passport = require("passport");

//===================== signup route =================
router.post("/admin/signup", signup);
//====================================================

//===================== Google auth ===================
router.post("/admin/googleLogin",googleLogin);
//=====================================================

//======================signin route===================
router.post("/admin/signin", signin);
//=====================================================
//======================= Logout ======================
router.get("/admin/logout", logout);
//=====================================================

//====================== profile ======================

//=====================================================

module.exports = router;
