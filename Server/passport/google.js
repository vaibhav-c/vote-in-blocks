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
    
      const {photos , emails} = profile;
      email=emails[0].value
      photo = photos[0].value;
      //console.log(profile);
      let foundEmail = await User.findOne({
        email
      })
      if(foundEmail){
        done(null,foundEmail);
        
      }
      else{
        const user = new User({
          name: "undefined",
          email,
          password: "undefined",
          dateOfBirth: undefined,
          aadhar: "undefined"
        });
        user.save((err) => {
          if (err) {
            console.log('Save error', err);
            
          } 
          else
          done(null,user)
        })
        console.log(user);
        
        done(null,user)
        
      }
}
));