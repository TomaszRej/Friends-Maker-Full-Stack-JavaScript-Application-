const User = require('../models/Test');


exports.test = async (req, res, next) => {
  console.log('test controller')
    const newTest = new Test({
    test: "test KURDE"
  });

  try {
    await newTest.save();
  } catch (err) {
    console.log('BLAD')
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}