const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String, 
    required: true,
    unique: true
  },
  created: {
    type: Number,
    default: Date.now
  }
});

User.statics.findAll = function() {
  return this.find().sort("-created");
};


module.exports = mongoose.model('User', User);