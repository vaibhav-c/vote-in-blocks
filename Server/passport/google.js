const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('../models/auth_models');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.Google_Client,
    clientSecret: process.env.Google_Secret,
    callbackURL: `${process.env.Server_URL}/api/auth/google/callback`
  },
  async function(accessToken, refreshToken, profile, done) {
    
    const {displayName , emails} = profile;
      email=emails[0].value;
      username = displayName;
      //console.log(displayName,email);
      let foundEmail = await User.findOne({
        email
      })
      let foundUsername = await User.findOne({
        username
      })
      if(foundEmail){
        done(null,foundEmail);
        //console.log('here');
      }  
      else if(foundUsername){
        done(null,foundUsername);
      }
      else{
        const user = new User({
          username,
          email,
      });
      user.save((err) => {
          if (err) {
            done(err,null);
          } else {
            done(null,user)
          }
      })
  }
}
));