const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      message: 'No token provided - Please login to continue',
      requiresLogin: true 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ 
        message: 'Invalid or expired token - Please login again',
        requiresLogin: true,
        logoutRequired: true 
      });
    }
    req.user = decoded; // contains { id, iat, exp }
    next();
  });
};

module.exports = verifyToken;
