const User = require("../model/userSchema");
const { successResponse } = require("./responseControllers");



const handlePostUserData = async (req, res, next) => {
    try {
        const {username, email, password, phoneNumber, profilePicture, bio, resume} = req.body;

        if(!username || !email || !password || !phoneNumber || !profilePicture || !bio || !resume){
            return res.status(400).json({"message": "Please fill all the input fields"});
        }

        await User.create({username, email, phoneNumber, password, profilePicture, bio, resume});

        res.status(200).json({"message": "User Data inserted successfully."})
    } catch (error) {
        next(error);
    }
}




const handleGetUserData = async (req, res, next) => {
    try {
        const userData = await User.find({})

        return successResponse(res, {
            statusCode: 200,
            message: "User data fetched successfully",
            payload: userData[0],
        })
    } catch (error) {
        next(error);
    }
}



const handleUpdateUserData = async (req, res, next) => {
    try {
        const {username, email, password, phoneNumber, profilePicture, bio, resume} = req.body;

        const update = {username, email, password, phoneNumber, profilePicture, bio, resume};
        const userInfo = await User.find({})
        const id = userInfo[0]._id;
        const updatedUserInfo = await User.findOneAndUpdate(id, update, {
            new: true
          });

        return successResponse(res, {
            statusCode: 200,
            message: "User data updated successfully",
            payload: updatedUserInfo,
        })
    } catch (error) {
        next(error);
    }
}



module.exports = {
    handlePostUserData,
    handleGetUserData,
    handleUpdateUserData,
}