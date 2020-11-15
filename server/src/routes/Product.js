const express = require("express");
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/RequiresSign");
const { createProduct } = require("../controller/Products");
const multer = require("multer");
const path = require('path');
const router = express.Router();
const shortid = require("shortid");
//const { addCategory, getCategory } = require("../controller/Category");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),"uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//====================== Product creation route ================================
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  upload.single("productPictures"),
  createProduct,
);
//==============================================================================

// router.get("/category/getcategories", getCategory);

module.exports = router;
