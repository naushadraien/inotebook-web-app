const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/?directConnection=true"

const connectToMongo = ()=>{
    mongoose.set('strictQuery', false); // Set strictQuery to false
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;