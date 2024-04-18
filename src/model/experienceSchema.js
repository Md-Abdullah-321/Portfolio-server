const experienceSchema = new mongoose.Schema({
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
  });
  
  const Experience = mongoose.model('Experience', experienceSchema);
  module.exports = Experience;