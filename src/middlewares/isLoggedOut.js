/**
 * Title: Is Logged Out
 * Description: Helper middleware to check if user is logged out.
 * Author: Md Abdullah
 * Date: 10/09/2024
 */

const jwt = require('jsonwebtoken');
const { errorResponse } = require('../controllers/responseControllers');
const { SECRET_KEY } = process.env;



/**
 * Check if user is logged out. If user is already logged in, an unauthorized 
 * error will be thrown with a 401 status code.
 * 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Next middleware function
 */
const isLoggedOut = (req, res, next) => { 
    try {
        const token = req.cookies.accessToken;
        const decoded = jwt.verify(token, SECRET_KEY);

        if(decoded) {
            return errorResponse(res, { statusCode: 401, message: "Unauthorized: You are already logged in." });
        }

        next();
    } catch (error) {
        next(error);
    }   
};



module.exports = isLoggedOut;