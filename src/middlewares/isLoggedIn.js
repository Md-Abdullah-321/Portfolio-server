/**
 * Title: Is Logged In
 * Description: Helper middleware to check if user is logged in.
 * Author: Md Abdullah
 * Date: 10/09/2024
 */

const { errorResponse } = require("../controllers/responseControllers");



/**
 * Checks if user is logged in. If user is not logged in, an unauthorized error is thrown.
 * 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Next middleware function
 */
const isLoggedIn = (req, res, next) => {
    if (req.user === null || req.user === undefined) {
        return errorResponse(res, { statusCode: 401, message: "Unauthorized: User is not logged in." });
    }

    try {
        next();
    } catch (error) {
        console.error(error);
        return errorResponse(res, { statusCode: 500, message: "Internal server error" });
    }
};

module.exports = isLoggedIn;
