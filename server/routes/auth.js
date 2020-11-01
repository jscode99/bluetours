const express = require("express");
//router import
const router = express.Router();
//controller
const { signup, signin, requireSignin } = require("../controller/auth");
const {
  validateSigninRequest,
  isRequestValid,
  validateSignupRequest,
} = require("../validator/auth");

//===================== signup route =================
router.post("/signup", validateSignupRequest, isRequestValid, signup);
//====================================================

//======================signin route===================
router.post("/signin", validateSigninRequest, isRequestValid, signin);
//=====================================================

//====================== profile ======================
// router.post("/profile",requireSignin, (req, res) => {
//     res.status(200).json({user:"profile"})
// })
//=====================================================

module.exports = router;
