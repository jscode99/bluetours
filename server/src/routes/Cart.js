const express = require("express");
const {
  requireSignin,
  userMiddleware,
} = require("../common-middleware/RequiresSign");
const router = express.Router();
const { addtoCart } = require("../controller/Cart");

// Cart router
router.post("/user/cart/addtocart", requireSignin, userMiddleware, addtoCart);
// router.get("/category/getcategories", getCategory);

module.exports = router;
