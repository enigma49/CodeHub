const express = require('express');
const connectToDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

//Connecting to database
connectToDB();

//Init Middleware
app.use(express.json({extended: false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

//Serve Static assets in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    })
}

PORT = process.env.PORT || 3500;
app.listen(PORT,()=>{console.log(`Server Started on Port:${PORT}`)});