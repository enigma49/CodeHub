const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUrl', {useNewUrlParser: true}, { useUnifiedTopology: true });

const connectToDB = async ()=>{
    try{
        await mongoose.connect(db);
        console.log("Connected to Database");
    }catch(err){
        console.log(err);
        //Exiting Process with failure
        process.exit(1)
    }
}

module.exports = connectToDB;