const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: "13820392798-qgi3fa57hg0qcrs8804voqn32m3hqqgb.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:4500/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});