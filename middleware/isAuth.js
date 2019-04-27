const jwt = require('jsonwebtoken');

 const config = require('config');
module.exports = (req, res, next) => {
 // const authHeader = req.header('x-auth-token');
  const authHeader  = req.header('Authorization');

  console.error(authHeader, 'authHeader')

  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  //const token = authHeader.split(' ')[1];
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.get('jwtSecret'));
    console.warn(decodedToken, 'decoded token');
    

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
  next();
};


// const config = require('config');
// const jwt = require('jsonwebtoken');

// function isAuth(req, res, next) {
//   const token1 = req.header('x-auth-token');
//   console.log(token1, 'TOKEN ??noValid?????')

//   const token = req.header('Authorization');
  

//   // Check for token
//   if (!token)
//     return res.status(401).json({ msg: 'No token, authorizaton denied' });

//   try {
//     // Verify token

//     const decoded = jwt.verify(token, config.get('jwtSecret'));
//     // Add user from payload
//     console.log(decoded, 'decoder')
//     req.user = decoded;
//     next();
//   } catch (e) {
//     res.status(400).json({ msg: 'Token is not valid' });
//   }
// }

// module.exports = isAuth;
