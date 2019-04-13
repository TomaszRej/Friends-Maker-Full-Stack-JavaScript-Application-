//const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
validateRegisterInput = require('../validation/register')

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
    console.log(user,'user')

    if (user !== null ) return res.status(400).json({ message: 'User with this email address already exist' });

    const hashedPw = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPw });
    const result = await newUser.save();
    res.status(201).json({ message: "User created!", userId: result._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
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