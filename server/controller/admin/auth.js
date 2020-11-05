//model user
const User = require("../../models/user");
//bcrypt
const bcrypt = require("bcrypt");
//jwt
const jwt = require("jsonwebtoken");
//key
const { JWT_SECRET } = require("../../key");
//clientID
const key = require("../../key");
//google auth lib
const { OAuth2Client } = require("google-auth-library");


//====================== New OAuth2Client ============================
const client = new OAuth2Client(key.google.consumerKey);
//=============================================================

//============ Module signup ======================================
exports.signup = (req, res) => {
  //=========== Destructuring the req body ========================
  const { firstname, lastname, email, password } = req.body;
  //========== finding user =====================================
  User.findOne({ email: email })
    .then(savedUser => {
      if (savedUser)
        return res.status(422).json({ error: "Admin already exists" });
      //password hashing
      bcrypt.hash(password, 12).then(hashedPassword => {
        //creating new user
        const user = new User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          username: Math.random().toString(),
          role: "admin",
        });
        user
          .save()
          .then(data => {
            console.log(data);
            res.status(200).json({ success: "Admin created !!" });
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

//====================== Google Login ============================
exports.googleLogin = (req,res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({ idToken:tokenId, audience: key.google.consumerKey })
    .then(response => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(422).json({
              error: "Something went wrong...",
            });
          } else {
            if (user) {
              //jwt token auth
              const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                expiresIn: "7d",
              });
              //DESTRUCTURING THE USER
              const { _id, role, name, email } = user;
              res.status(200).json({ token: token, user: { _id, role, name, email } });
            } else {
              let password = email + JWT_SECRET
              let user = new User({
                name,
                email,
                password,
                role: "admin",
              });
            user.save((err, data) => {
                if (err) {
                  return res.status(422).json({
                    error: "Something went wrong...",
                  });
                }
                //jwt token auth
                const token = jwt.sign({ _id: data._id }, JWT_SECRET, {
                  expiresIn: "7d",
                });
                //DESTRUCTURING THE USER
                const { _id, role, name, email } = user;
                res
                  .status(200)
                  .json({ token: token, user: { _id, role, name, email } });
              })
            }
          }
        });
      }
    });
};
//===============================================================

//========================== Logout module========================
exports.logout = (req, res) => {
  return res.send("logout");
};
//================================================================

//================== module signin ================================
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).exec((err, user) => {
    if (err) return res.status(422).json({ error: "Invalid email" });
    if (user && user.role === "admin") {
      bcrypt.compare(password, user.password).then(doMatch => {
        if (doMatch) {
          //jwt token auth
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: "7d",
          });
          //DESTRUCTURING THE USER
          const { _id, role, email } = user;
          res.status(200).json({ token: token, user: { _id, role, email } });
        } else {
          return res.status(422).json({ message: "Invalid email or password" });
        }
      });
    } else {
      res.status(422).json({ error: "Invalid email or password !!" });
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
