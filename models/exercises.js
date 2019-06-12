const shortid = require('shortid');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exercise = new Schema({
    user:{
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    date:{
        type: Date
    },
    duration:{
        type: Number
    },
    description:{
        type: String
    }
});

Exercise.statics.findAll = function() {
  return this.find().sort("-created");
};

module.exports = mongoose.model('Exercise', Exercise);