const User = require("../model/userSchema");
const bcrypt = require('bcryptjs');
const { successResponse } = require("./responseControllers");


const handlePostUserData = async (req, res) => {
  try {
    const { name, jobTitle, jobSubTitle, email, secondaryEmail, phoneNumbers, password, profilePicture, bioOne, bioTwo, resume, socialLinks, location } = req.body;

    if (!email || !password) {
      return errorResponse(res, {
        statusCode: 204,
        message: "Please fill all the input fields."
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, jobTitle, jobSubTitle, email,secondaryEmail, phoneNumbers, password: hashedPassword, profilePicture, bioOne, bioTwo, resume, socialLinks, location });

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

    return successResponse(res, {
      statusCode: 201,
      message: "User data fetched successfully.",
      payload: userData[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateUserData = async (req, res) => {
  try {
    const {name, jobTitle, jobSubTitle, email, secondaryEmail, phoneNumbers, password, profilePicture, bioOne, bioTwo, resume, socialLinks, location} = req.body;
    const decodedEmail = req.user.email;

    if(!decodedEmail){
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized: Please login first."
      })
    }

    const currentUser = await User.findOne({email : decodedEmail});

    const updatedUserInfo = {
      name: name || currentUser.name,
      jobTitle: jobTitle || currentUser.jobTitle,
      jobSubTitle: jobSubTitle || currentUser.jobSubTitle,
      email: email || currentUser.email,
      secondaryEmail: secondaryEmail || currentUser.secondaryEmail,
      phoneNumbers: phoneNumbers || currentUser.phoneNumbers,
      password: password || currentUser.password,
      profilePicture: profilePicture || currentUser.profilePicture,
      bioOne: bioOne || currentUser.bioOne,
      bioTwo: bioTwo || currentUser.bioTwo,
      resume: resume || currentUser.resume,
      socialLinks: socialLinks || currentUser.socialLinks,
      location: location || currentUser.location
    };

    let updatedUser = await User.findOneAndUpdate({email: decodedEmail}, updatedUserInfo, { new: true });
    updatedUser = { ...updatedUser.toObject() };
    delete updatedUser.password;
   
    return successResponse(res, {
      statusCode: 200,
      message: "User data updated successfully.",
      payload: updatedUser
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
