//const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const io = require('../socket');

validateRegisterInput = require('../validation/register')
validateLoginInput = require('../validation/login');

exports.getUsers = async (req, res, next) => {
  console.log(req.userId, 'req.userId z decodedddd')
  //console.log(req.userId, 'decodedddd')
  try {
    const users = await User.find();
    res.status(200).json({ users: users })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.registerUser = async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);



  // Check Validation
  if (!isValid) {

    return res.status(400).json({ "message": errors });
  }

  const { name, email, password } = req.body;


  try {
    // checking if user exist
    const user = await User.findOne({ email })
    console.log(user, 'user')

    if (user !== null) return res.status(400).json({ message: 'User with this email address already exist' });

    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPw });
    const result = await newUser.save();

    io.getIO().emit('users', { action: 'create', user: newUser })
    res.status(201).json({ message: "User created!", userId: result._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    //loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      'mojJSONwebTokenVerySecret',
      { expiresIn: '1h' }
    );

    // ++
    const decodedToken = jwt.verify(token, config.get('jwtSecret'));
    console.log(decodedToken, 'decoded token na backendzie ')
    const decodedExp = decodedToken.exp - decodedToken.iat;
    const seconds = new Date().getTime() / 1000;
    const fromNow = decodedToken.exp - seconds;
    console.log(decodedExp, seconds, fromNow, 'decoded Exp na backendzie ')

    // --

    res.status(200).json({ token: token, userId: user._id.toString(), user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// exports.loginUser = async (req, res, next) => {
//   console.log('loginUser controller !!!!');


//   const { errors, isValid } = validateLoginInput(req.body);
//   console.log(errors, 'errors');
//   console.log(isValid, 'isValid')
//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json({ "message": errors });
//   }



//   const email = req.body.email;
//   const password = req.body.password;

//   // Find user by email
//   try {
//     const user = User.findOne({ email });
//     // Check for user
//     if (!user) {
//       errors.email = 'User not found';
//       return res.status(404).json(errors);
//     } else {
//       console.log('jest user :) 2222');

//       console.log(user, 'user');
//       return res.status(200).json(user);

//     }


//     // // Check Password
//     // bcrypt.compare(password, user.password).then(isMatch => {
//     //   if (isMatch) {
//     //     // User Matched
//     //     const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

//     //     // Sign Token
//     //     jwt.sign(
//     //       payload,
//     //       keys.secretOrKey,
//     //       { expiresIn: 3600 },
//     //       (err, token) => {
//     //         res.json({
//     //           success: true,
//     //           token: 'Bearer ' + token
//     //         });
//     //       }
//     //     );
//     //   } else {
//     //     errors.password = 'Password incorrect';
//     //     return res.status(400).json(errors);
//     //   }


//   } catch (err) {
//     console.warn(err);

//   }

// }

// exports.postUser = async (req, res, next) => {
//   console.log('post route');
//   const newUser = new User({
//     name: "Tomekss",
//     email: "tossm@test.com",
//     password: "testss"
//   });

//   try {
//     await User.save();
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };