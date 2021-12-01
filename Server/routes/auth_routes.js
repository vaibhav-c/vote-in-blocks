const express = require('express');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const nodemailer = require("nodemailer");

const errorHandler = require('../Helper/dbErrorHandler');
const User = require('../models/auth_models');
const Vote = require('../models/voting_model');
const passport = require('passport')
require('../passport/google')

const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
      if(req.user.aadhar === "undefined") {
        res.redirect(`${process.env.CLIENT_URL}/details?${req.user.email}`)
      } else {
        console.log(req)
        const token = jwt.sign({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            aadhar: req.user.aadhar,
            dateOfBirth: req.user.dateOfBirth
        }, process.env.SECRET, {expiresIn: 50000})
        res.redirect(`${process.env.CLIENT_URL}/home?${token}`);
      }
  }
);

router.post('/register',async(req,res)=>{
    console.log("here at register")
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
        if(foundEmail) {
                return res.status(400).json({
                    error: "Email is taken"
            })
        }
        let foundAadhar = await User.findOne({
            aadhar
        })
        if(foundAadhar) {
                return res.status(400).json({
                    error: "Aadhar is taken"
            })
        }
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
                const token = jwt.sign({
                    id: foundemail._id,
                    name: foundemail.name,
                    email: foundemail.email,
                    aadhar: foundemail.aadhar,
                    dateOfBirth: foundemail.dateOfBirth
                }, process.env.SECRET, {expiresIn: 50000});
                console.log("Found");
                console.log(token);
                return res.json({
                    token
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
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.email,
        pass: process.env.NodemailerPassword
        }
    });
    const {
        name,
        desc,
        startTime,
        endTime,
        candidates,
        candidateDetails,
        invites, adminEmail, resultsDeclared} = req.body.election;
    const vote = new Vote({
        name,
        desc,
        startTime,
        endTime,
        candidates,
        candidateDetails,
        invites,
        adminEmail,
        resultsDeclared
    })
    console.log(candidateDetails);

    var mailOptions = {
        from: process.env.email,
        to: invites,
        subject: 'Invites',
        html: `
            
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

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
            id: vote._id,
            candidateDetails: vote.candidateDetails,
            message: 'saved'
          });
        }
    })
})

router.get('/conducted',async(req,res)=>{
    const {email} = req.query
    let Found = await Vote.find({
        adminEmail : email
    })
    if(Found)
        return res.json({
            success: true,
            conducted: Found
        })
    else
        return res.json({
            success: false
        })
    
})


router.get('/votingelection',async(req,res)=>{
    const { email } = req.query
    let Found = await Vote.find({
        invites: email
    })

    if(Found)
        return res.json({
            success: true,
            conducted: Found
        })
    else
        return res.json({
            success: false
        })
})

router.put('/update',async(req,res)=>{
    const { ID } = req.body
    let Found = await Vote.findOneAndUpdate({
        _id: ID
    },{resultsDeclared: true},{new:true})

    if(Found)
        return res.json({
            success: true,
            conducted: Found
        })
    else
        return res.json({
            success: false
    })
})


module.exports = router;