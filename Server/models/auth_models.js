const mongoose = require('mongoose');
const crypto = require('crypto');
const { timeStamp } = require('console');
const { stringify } = require('querystring');

const userSchema = mongoose.Schema({

    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        
    },
    password:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    aadhar:{
        type: String,
        required: true
    },

    
},{ timestamps: true });


module.exports = mongoose.model('User',userSchema);
