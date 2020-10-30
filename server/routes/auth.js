const express = require("express");
//router import
const router = express.Router();
//controller
const {signup,signin,requireSignin} =require('../controller/auth')



//===================== signup route =================
router.post("/signup",signup);
//====================================================



//======================signin route===================
router.post("/signin",signin);
//=====================================================

//====================== profile ======================
router.post("/profile",requireSignin, (req, res) => {
    res.status(200).json({user:"profile"})
})
//=====================================================

module.exports = router;
