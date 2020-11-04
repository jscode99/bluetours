var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      consumerKey:
        "670209693410-jephrvr7n8fp27m39ahao38n14jm1aeu.apps.googleusercontent.com",
      consumerSecret: "rgwxfP7W3-8g_TKW_YQA-yfk",
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    function (token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    },
  ),
);

//client id and secret
//670209693410-jephrvr7n8fp27m39ahao38n14jm1aeu.apps.googleusercontent.com
//rgwxfP7W3-8g_TKW_YQA-yfk