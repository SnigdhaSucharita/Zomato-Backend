const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "751349451022-5atfan4tt96c77kl3srsnn8hhlv5mn7f.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5500/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})