const express = require("express");
//router import
const router = express.Router();
//controller
const {signup,signin,requireSignin} =require('../../controller/admin/auth')



//===================== signup route =================
router.post("/admin/signup",signup);
//====================================================



//======================signin route===================
router.post("/admin/signin",signin);
//=====================================================

//====================== profile ======================

//=====================================================

module.exports = router;
