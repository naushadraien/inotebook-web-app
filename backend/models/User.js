const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  //Here const User = mongoose.model('user', UserSchema), User.createIndexes(), module.exports = User are created for not duplicating the data of user like name, email etc
  
  const User = mongoose.model('user', UserSchema);
  User.createIndexes();

  module.exports = User;