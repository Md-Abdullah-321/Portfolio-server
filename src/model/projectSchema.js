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
    features: {
      type: [String],
      trim: true
    },
    frontEnd: {
      type: [String],
      trim: true
    },
    backEnd: {
      type: [String],
      trim: true
    },
    tools: {
      type: [String],
      trim: true
    },
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
  