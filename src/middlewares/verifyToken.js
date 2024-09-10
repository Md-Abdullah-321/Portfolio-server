/**
 * Title: Verify Token
 * Description: Verify API calls before fetching important resources.
 * Author: Md Abdullah
 * Date: 10/09/2024
 */



const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next(); 
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', error);
      return res.status(401).json({ message: 'Unauthorized: Token is expired' });
    } else {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }
};

module.exports = verifyToken;
