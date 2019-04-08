const User = require('../models/User');


exports.addUser = async (req, res, next) => {
  console.log('addUSER')
  const {name, email, password} = req.body;
    const newUser = new User({
    name: name,
    email: email,
    password: password
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log('BLAD')
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




exports.test = () => {
  console.log('test');
}


exports.getUsers = async (req, res, next) => {
    console.log('get route');
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json({
      users: users
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}
