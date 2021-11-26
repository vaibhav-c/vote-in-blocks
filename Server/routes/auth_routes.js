const express = require('express');
const fetch = require('node-fetch');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const nodemailer = require("nodemailer");

const errorHandler = require('../Helper/dbErrorHandler');
const User = require('../models/auth_models');

const passport = require('passport')
require('../passport/google')


const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    const token = jwt.sign({ _id: foundUsername._id},process.env.SECRET,{expiresIn: '7d'});
    res.redirect(`${process.env.CLIENT_URL}/profile`);
    res.json({
        token,
        user:{
            username,
            email
        }
        
    })
    res.end();
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

module.exports = router;