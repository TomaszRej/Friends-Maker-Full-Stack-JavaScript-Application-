const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  test: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Test', userSchema);