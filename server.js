const express = require('express');
const connectToDB = require('./config/db');

const app = express();

//Connecting to database
connectToDB();

//Init Middleware
app.use(express.json({extended: false}))


//Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

PORT = process.env.PORT || 3500;
app.listen(PORT,()=>{console.log(`Server Started on Port:${PORT}`)});