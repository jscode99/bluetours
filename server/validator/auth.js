//Express validator
const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstname").notEmpty().withMessage("First name is required !!"),
  check("lastname").notEmpty().withMessage("Last name is required !!"),
  check("email").isEmail().withMessage("Valid email address required !!"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long !!"),

];


exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid email address required !!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Incorrect password !!"),
];


exports.isRequestValid = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
    next();
};
