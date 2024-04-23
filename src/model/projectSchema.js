const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    overview: {
      type: String,
      trim: true
    },
    features:[],
    frontEnd: [],
    backEnd: [],
    tools:[],
    live_url: {
      type: String,
      trim: true
    },
    github_url: {
      type: String,
      trim: true
    },
  }, { timestamps: true });
  
  const Project = mongoose.model('Project', projectSchema);
  module.exports = Project;
  