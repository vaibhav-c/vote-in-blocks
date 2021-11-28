const express = require('express');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const errorHandler = require('../Helper/dbErrorHandler');
const User = require('../models/auth_models');
const Vote = require('../models/voitng_model');
const passport = require('passport')
require('../passport/google')


const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/details` }),
  function(req, res) {
      console.log("here");
    res.redirect(`${process.env.CLIENT_URL}/home?${req.user.email}&${req.user.aadhar}`);
    
  }
);

router.post('/register',async(req,res)=>{
    const { name,
        email,
        password,
        dateOfBirth,
        aadhar} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const firstError = errors.array().map((err) =>error.msg)[0];
        return res.status(422).json({
            error: firstError
        })
    }
    else{
        let foundEmail = await User.findOne({
            email
        })
        if(foundEmail)
            return res.status(400).json({
                error: "email is taken"
        })
    }
    const user = new User({
        name,
        email,
        password,
        dateOfBirth,
        aadhar
    });
    user.save((err) => {
        if (err) {
          console.log('Save error', errorHandler(err));
          return res.status(400).json({
            errors: errorHandler(err)
          });
        } else {
          return res.json({
            success: true,
            message: 'Signup success'
          });
        }
    })
});


router.post('/login',async (req,res)=>{
    
    const {email,password} = req.body;
    let foundemail = await User.findOne({
        email
    })
    if(foundemail){
            if(foundemail.password === password){
                const token = jwt.sign({ _id: foundemail._id},process.env.SECRET,{expiresIn: '7d'});
                const {email,name} = foundemail;
                console.log("Found");
                return res.json({
                    token,
                    user:{
                        name,
                        email
                    }
                    
                })
            }
            else{
                return res.status(400).json({
                    error: "Email or Password does not match"
                })
            }
    }
    else{
        return res.status(400).json({
            error: "Email does not exist"
        })
    }

})

router.post('/voting',async(req,res)=>{
    const { ID,
        name,
        desc,
        startTime,
        endTime,
        candidates,
        candidateDetails,
        invites, } = req.body.election;
    const vote = new Vote({
        name,
        desc,
        startTime,
        endTime,
        candidates,
        candidateDetails,
        invites,
    })
    console.log(candidateDetails);

    vote.save((err) => {
        if (err) {
          console.log('Save error ', errorHandler(err));
          return res.status(400).json({
            errors: errorHandler(err)
          });
        } else {
            console.log("saved");
          return res.json({
            success: true,
            message: 'saved'
          });
        }
    })
})

module.exports = router;