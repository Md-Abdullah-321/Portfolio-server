/**
 * Title: Verify Token
 * Description: Verify API calls before fetching important resources.
 * Author: Md Abdullah
 * Date: 10/09/2024
 */



const jwt = require('jsonwebtoken');
const { errorResponse } = require('../controllers/responseControllers');
const { SECRET_KEY } = process.env;

/**
 * Verify Token
 * Verifies the JWT token provided in the request cookies.
 * If token is invalid or expired, a 401 status code is returned.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Next middleware function
 */
const verifyToken = (req, res, next) => {
     const token = req.cookies.accessToken

    if (!token) {
        return errorResponse(res, { statusCode: 401, message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return errorResponse(res, { statusCode: 401, message: 'Unauthorized: Token is expired' });
        } else {
            return errorResponse(res, { statusCode: 401, message: 'Unauthorized: Invalid token' });
        }
    }

};

module.exports = verifyToken;
