const User = require("../model/userSchema");



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



module.exports = {
    handlePostUserData,
}