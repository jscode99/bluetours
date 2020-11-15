const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;
const key = require("../../key");

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      consumerKey: key.google.consumerKey,
      consumerSecret: key.google.consumerSecret,
      callbackURL: "/api/admin/google/redirect",
    },
    function () {
     
      })
)

