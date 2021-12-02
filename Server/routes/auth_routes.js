const express = require('express');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

const errorHandler = require('../Helper/dbErrorHandler');
const User = require('../models/auth_models');
const Vote = require('../models/voting_model');
const passport = require('passport');
const { Routes } = require('react-router');
require('../passport/google')

const router = express.Router();

const saltRounds = 10;

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google'),
  function(req, res) {
      if(req.user.aadhar === "undefined") {
        const token = jwt.sign({
            email: req.user.email,
        }, process.env.SECRET, {expiresIn: 50000})
        res.redirect(`${process.env.CLIENT_URL}/details?${token}`)
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
    let pass;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        pass = hash;
        console.log(pass);
        const user = new User({
            name,
            email,
            password: pass,
            dateOfBirth,
            aadhar
        });
        console.log(user)
        user.save((err) => {
            if (err) {
             // console.log(err)
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
    
});


router.post('/login',async (req,res)=>{
    
    const {email,password} = req.body;
    let foundemail = await User.findOne({
        email
    })
    if(foundemail){
        bcrypt.compare(password, foundemail.password, function(err, result) {
            if(result == true){
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
        });
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
    var stA = new Date(req.body.election.startTime).toString().split(" ");
    var start = stA[0] + ", " + stA[1] + " " + stA[2] + " " + stA[3] + " " + stA[4];
    var etA = new Date(req.body.election.endTime).toString().split(" ")
    var end = etA[0] + ", " + etA[1] + " " + etA[2] + " " + etA[3] + " " + etA[4];
    var mailOptions = {
        from: process.env.email,
        to: invites,
        subject: `Invites for Election ${req.body.election.name}`,
        html: `
        <html>
            <head>
            </head>
            <body style = "text-align: center; background-color: #3396FF;">
            <img src="https://i2.wp.com/www.yesmagazine.org/wp-content/uploads/2020/01/ranked-choice-voting-burton.jpg?fit=1400%2C840&quality=90&ssl=1" class="img-rounded">
            <div>
                <h1 style = "color: black;">
                    You are invited to vote in ${req.body.election.name}
                </h1>
                <h2 style = "color: black;">
                    ${req.body.election.desc}
                </h2>
                <h2 style = "color: black;">
                    The election is live between<br><b>${start}</b> and <b>${end}</b>
                </h2>
                <h2 style = "color: black;">
                    <a href = "http://localhost:1234" style = "color: black;">Click here</a> to vote
                </h2>
                <br>
                <br>
            </div>
            </body>
        </html>
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

router.get('/totalelection',async(req,res)=>{
    const { email,time } = req.query
    let invited = await Vote.find({
        invites: email
    })
    let conducted = await Vote.find({
        adminEmail: email
    })
    Vote.find().then((elec) => {
        let count = 0;
        for(let i=0;i<elec.length;i++) {
            if(elec[i].startTime<time && elec[i].endTime>time)
                count++
        }
        res.json({
            electionSize: elec.length,
            invitedSize: invited.length,
            conductedSize: conducted.length,
            live: count
        })
      }).catch((err)=>{
          console.log(err);
          res.json({
              err
          })
      });
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
    const { id } = req.body
    console.log(req);
    let Found = await Vote.findOneAndUpdate({
        _id: id
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