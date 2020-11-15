// JWT
const jwt = require("jsonwebtoken");
//key
const { JWT_SECRET } = require("../../key");
//model user
const User = require("../models/user");

//===================== RequireSignin =============================
exports.requireSignin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(422).json({ message: "You must be logged in" });
    const token = authorization.replace("Bearer ", "");
    //verifying
    await jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error)
        return res
          .status(401)
          .json({ message: "Something went wrong.Try again !!" });
      const { _id } = payload;
      User.findById(_id).then(userdata => {
        req.user = userdata;
        next();
      });
    });
  } catch (error) {
    console.log(error);
  }
};
//==================================================================

//==================== Admin middleware ==============================
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(422).json({ message: "Admin access Denied !!!" });
  next();
};
//=====================================================================


//======================= User Middleware =============================
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user")
    return res.status(422).json({ message: "User access Denied !!!" });
  next();
}
//======================================================================