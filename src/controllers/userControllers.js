const User = require("../model/userSchema");
const bcrypt = require('bcryptjs');
const { successResponse } = require("./responseControllers");


const handlePostUserData = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, profilePicture, bio, resume } = req.body;

    if (!username || !email || !password || !phoneNumber || !profilePicture || !bio || !resume) {
      return res.status(400).json({ message: "Please fill all the input fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword, phoneNumber, profilePicture, bio, resume });

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    successResponse(res, {
      statusCode: 201,
      message: "User has been created successfully.",
      payload: userWithoutPassword
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const handleGetUserData = async (req, res) => {
  try {
    const userData = await User.find({}).select('-password');

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
    const {id, username, email, phoneNumber, profilePicture, bio, resume } = req.body;

    if(!id){
      return res.status(400).json({ message: "Please provide an id to update user info." });
    }

    const currentUser = await User.findById(id);

    const updatedUserInfo = {
      username: username || currentUser.username,
      email: email || currentUser.email,
      phoneNumber: phoneNumber || currentUser.phoneNumber,
      profilePicture: profilePicture || currentUser.profilePicture,
      bio: bio || currentUser.bio,
      resume: resume || currentUser.resume,
      password: currentUser.password
    }

    let updatedUser = await User.findByIdAndUpdate(id, updatedUserInfo, { new: true });
    updatedUser = { ...updatedUser.toObject() };
    delete updatedUser.password;
   
    res.json({
      statusCode: 200,
      message: "User data updated successfully",
      payload: updatedUser,
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
