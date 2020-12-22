const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUrl');

const connectToDB = async ()=>{
    try{
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
        console.log("Connected to Database");
    }catch(err){
        console.log(err);
        //Exiting Process with failure
        process.exit(1)
    }
}

module.exports = connectToDB;