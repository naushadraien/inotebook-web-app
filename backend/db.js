const mongoose = require('mongoose');
//instead of using localhost in the mongoURI, use 127.0.0.1 for avoiding the 1000ms inserting error()
//const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"  , here inotebook in this url inserted for creating the inotebook database
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"

const connectToMongo = ()=>{
    mongoose.set('strictQuery', false); // Set strictQuery to false
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;