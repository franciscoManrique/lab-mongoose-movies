const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  occupation: String,
  catchPhrase: {
    type: String,
    minlength: 10
  },
  image: {
    type: String,
    default: 'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0='
  },
  hobbies: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  }
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 10;
}

const Celebrity = mongoose.model("Celebrity", celebritySchema); // 1. crea collection 'celebrities' en db

module.exports = Celebrity;
