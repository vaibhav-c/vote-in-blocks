const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('dotenv').config({
    path: './config/config.env'
})

const authRoute = require('./routes/auth_routes');

mongoose.connect(process.env.MongoDB,{useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true}).then(()=>{
    console.log("MongoDB connected")
}).catch(()=>{
    console.log("error");
});

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'));
}


app.use(cookieSession({
    name: 'session',
    keys: [process.env.Cookie_key1, process.env.Cookie_key2]
  }))
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



app.use('/api',authRoute);

app.use((req,res,next)=>{
    //console.log(req.user);
    res.status(404).json({
        success: false,
        messsage: "Page not found"
    })
})

const PORT = process.env.PORT;

app.listen(PORT,() =>{
    console.log(`Server:  ${process.env.PORT}`);
})
