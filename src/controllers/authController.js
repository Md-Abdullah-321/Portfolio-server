const bcrypt = require("bcryptjs");
const Auth = require("../model/authSchema");
const { successResponse, errorResponse } = require("./responseControllers");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
require("dotenv").config();

const handleUserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        
        if (!email || !password) {
            return errorResponse(res, {
                statusCode: 204,
                message: "Please fill all the input fields."
            });
        }

        
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, {
                statusCode: 401,
                message: "User not found or credentials are invalid."
            });
        }

        // Compare passwords
        const isMatched = bcrypt.compareSync(password, user.password);
        if (isMatched) {
            // Generate JWT token
            const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
                expiresIn: '1d'
            });

            // Set cookie with JWT token
            res.cookie('accessToken', token, {
                httpOnly: true,
                // secure: true, 
                sameSite: 'none' 
            });

            let userInfo = { ...user.toObject() };
            delete userInfo.password;

            return successResponse(res, {
                statusCode: 200,
                message: "Logged in successfully",
                payload: {
                    ...userInfo,
                    token
                }
            });
        } else {
            return errorResponse(res, {
                statusCode: 401,
                message: "Wrong password, please try again"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const handleChangePassword = async (req, res, next) => {
    try {
        const { id, currentPassword, newPassword } = req.body;

        if (!id || !currentPassword || !newPassword) {
            return errorResponse(res, {
                statusCode: 400,
                message: "Please fill all the input fields."
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message: "Could not find user with this id."
            });
        }

        const isMatched = bcrypt.compareSync(currentPassword, user.password);
        if (!isMatched) {
            return errorResponse(res, {
                statusCode: 401,
                message: "Incorrect Password."
            });
        }

        const hashedUpdatedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(id, { password: hashedUpdatedPassword }, { new: true });

        const updatedUserWithoutPassword = { ...updatedUser.toObject() };
        delete updatedUserWithoutPassword.password;

        return successResponse(res, {
            statusCode: 200,
            message: "Password has been updated successfully.",
            payload: updatedUserWithoutPassword
        });

    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    handleUserLogin,
    handleChangePassword
};
