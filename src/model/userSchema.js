/**
 * Title: User Schema
 * Description: handles user schema
 * Author: Md Abdullah
 * Date: 10/09/2024
 */


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  jobTitle: {
    type: String,
    trim: true
  },
  jobSubTitle: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message: 'Invalid email address'
    }
  },
  secondaryEmail : {
    type: String,
    trim: true,
    validate: {
      validator: function(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message: 'Invalid email address'
    }
  },
  phoneNumbers: {
    type: [String],
    trim: true,
    validate: {
      validator: function(phoneNumbers) {
        return phoneNumbers.every(phone => /^(?:\+?88)?01[3-9]\d{8}$/.test(phone));
      },
      message: 'Invalid phone number for Bangladesh'
    }
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    trim: true
  },
  bioOne: {
    type: String,
    trim: true
  },
  bioTwo: {
    type: String,
    trim: true
  },
  resume: {
    type: String,
    trim: true
  },
  socialLinks: {
    facebook: {
      type: String,
      trim: true
    },
    whatsApp: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    }
  },
  location: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
