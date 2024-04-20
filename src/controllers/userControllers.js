const User = require("../model/userSchema");

const handlePostUserData = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, profilePicture, bio, resume } = req.body;

    // Validate required fields (early exit on missing data)
    if (!username || !email || !password || !phoneNumber || !profilePicture || !bio || !resume) {
      return res.status(400).json({ message: "Please fill all the input fields" });
    }

    // Create user (single database operation)
    await User.create({ username, email, password, phoneNumber, profilePicture, bio, resume });

    res.status(200).json({ message: "User Data inserted successfully." });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" }); // Generic error message for user
  }
};

const handleGetUserData = async (req, res) => {
  try {
    const userData = await User.find({}).limit(1);

    res.json({
      statusCode: 200,
      message: "User data fetched successfully",
      payload: userData[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateUserData = async (req, res) => {
  try {
    const update = { username: req.body.username, email: req.body.email, ...req.body }; // Destructuring for concise update object
    const updatedUserInfo = await User.findOneAndUpdate({}, update, { new: true });

    res.json({
      statusCode: 200,
      message: "User data updated successfully",
      payload: updatedUserInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handlePostUserData,
  handleGetUserData,
  handleUpdateUserData,
};
