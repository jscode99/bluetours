const router = require("express").Router();
//controller
const {
  signup,
  signin,
  requireSignin,
  logout,
  googleLogin,
  emailActivation,
  forgotPassword
} = require("../../controller/admin/auth");
const passport = require("passport");

//===================== signup route =================
router.post("/admin/signup", signup);
//====================================================

//================== Email activation =================
router.post("/admin/email-activation",emailActivation)
//=====================================================

//================= Forget password ===================
router.post("/admin/forgot-password",forgotPassword)
//=====================================================

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
