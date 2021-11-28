const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({

    name:{
        type: String,
        required: true,
        
    },
    url:{
        type: String,
        required: true
    }
},{ timestamps: true });

const voteSchema = mongoose.Schema({

    
    name:{
        type: String,
        required: true,
        
    },
    desc:{
        type: String,
        required: true
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    },
    candidates:{
        type: Number,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    resultsDeclared: {
        type: Boolean,
        required: true
    },
    invites: [String],
    candidateDetails: [candidateSchema]
    
},{ timestamps: true });


module.exports = mongoose.model('Vote',voteSchema);
