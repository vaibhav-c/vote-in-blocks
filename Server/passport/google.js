const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('../models/auth_models');

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    User.findOne({email: user.email}, function(err, user) {
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.Google_Client,
    clientSecret: process.env.Google_Secret,
    callbackURL: `${process.env.Server_URL}/api/auth/google/callback`
  },
  async function(accessToken, refreshToken, profile, done) {
    
      const {photos , emails} = profile;
      email=emails[0].value
      photo = photos[0].value;
      //console.log(profile);
      let foundEmail = await User.findOne({
        email
      })
      if(foundEmail){
        done(null,foundEmail);
      } else {
        //do something
        let foundEmail = {
          email: email,
          aadhar: "undefined"
        }
        console.log(foundEmail);
        done(null, foundEmail);
      }
    
}
));