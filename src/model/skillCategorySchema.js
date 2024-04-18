const skillCategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
  });
  
  const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
  module.exports = SkillCategory;
  