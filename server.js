const express = require('express');
const connectToDB = require('./config/db');

const app = express();

//Connecting to database
connectToDB();

PORT = process.env.PORT || 3500;
app.listen(PORT,()=>{console.log(`Server Started on Port:${PORT}`)});