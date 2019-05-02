const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    // unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
  // posts: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Post'
  //   }
  // ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
