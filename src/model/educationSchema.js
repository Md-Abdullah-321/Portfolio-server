const educationSchema = new mongoose.Schema({
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
  });
  
  const Education = mongoose.model('Education', educationSchema);
  module.exports = Education;