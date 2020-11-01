const express = require("express");
//router import
const router = express.Router();
//controller
const { signup, signin, requireSignin } = require('../../controller/admin/auth')
//validator
const {
  validateSigninRequest,
  isRequestValid,
  validateSignupRequest,
} = require("../../validator/auth");



//===================== signup route =================
router.post("/admin/signup",validateSignupRequest,isRequestValid,signup);
//====================================================

//======================signin route===================
router.post("/admin/signin",validateSigninRequest,isRequestValid,signin);
//=====================================================

//====================== profile ======================

//=====================================================

module.exports = router;
