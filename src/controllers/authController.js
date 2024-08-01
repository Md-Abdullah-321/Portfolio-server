const bcrypt = require("bcryptjs");
const Auth = require("../model/authSchema");
const { successResponse, errorResponse } = require("./responseControllers");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
require("dotenv").config();

const handleUserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return errorResponse(res, {
                statusCode: 204,
                message: "Please fill all the input fields."
            });
        }

        
        const user = await Auth.findOne({ email });
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
                expiresIn: '7d'
            });

            // Set cookie with JWT token
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, 
                sameSite: 'none' 
            });

            let userInfo = await User.find({});
            delete userInfo[0].password;
            return successResponse(res, {
                statusCode: 200,
                message: "Logged in successfully",
                payload: userInfo[0]
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

module.exports = {
    handleUserLogin,
};
