const express = require("express");
//router import
const router = express.Router();
//model user
const User = require("../models/user");
//bcrypt
const bcrypt = require("bcrypt");
//jwt
const jwt = require("jsonwebtoken");
//key
const { JWT_SECRET } = require("../key");

//============ Module signup ======================================
exports.signup = (req, res) => {
 
  //=========== Destructuring the req body =========================
  const { firstname, lastname, email, password } = req.body;
  //=================================================================

  //========== finding user =========================================
  User.findOne({ email: email })
    .then(savedUser => {
      if (savedUser)
        return res.status(422).json({ message: "User already exists" });
      //password hashing
      bcrypt.hash(password, 12).then(hashedPassword => {
        //creating new user
        const user = new User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          username: Math.random().toString(),
        });
        user
          .save()
          .then(data => {
            console.log(data);
            res.status(200).json({ message: "Account created !!" });
          })
          .catch(err => {
            console.log(err);
            res.status(422).json({ message: "Something went wrong !!" });
          });
      });
      //catching database error
    })
    .catch(err => {
      console.log(err);
    });
};
//================================================================

//================== module signin ================================
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).exec((err, user) => {
    if (err) return res.status(422).json({ message: "Invalid email" });
    if (user) {
      bcrypt.compare(password, user.password).then(doMatch => {
        if (doMatch) {
          //jwt token auth
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
          //DESTRUCTURING THE USER
          const { _id, role, email } = user;
          res.status(200).json({ token: token, user: { _id, role, email } });
        } else {
          return res.status(422).json({ message: "Invalid email or password" });
        }
      });
    } else {
      res.status(422).json({ message: "Something went wrong !!" });
    }
  });
};

//================================================================

//===================== RequireSignin =============================
exports.requireSignin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(422).json({ message: "You must be logged in" });
  const token = authorization.replace("Bearer ", "");
  //verifying
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error)
      return res.status(401).json({ message: "You must be logged in" });
    const { _id } = payload;
    User.findById(_id).then(userdata => {
      req.user = userdata;
      next();
    });
  });
};
//==================================================================
