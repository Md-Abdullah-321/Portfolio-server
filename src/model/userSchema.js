const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address']
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^(?:\+?88)?01[3-9]\d{8}$/, 'Invalid phone number for Bangladesh']
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: String,
  bio: String,
  resume: String 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
