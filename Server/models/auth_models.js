const mongoose = require('mongoose');

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
    },
    aadhar:{
        type: String,
        required: true
    },

    
},{ timestamps: true });


module.exports = mongoose.model('User',userSchema);
