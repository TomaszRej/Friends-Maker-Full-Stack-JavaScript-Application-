const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.get('jwtSecret'));
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  req.userName = decodedToken.name;
  next();
};


