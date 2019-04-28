const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    // unique: true
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Number
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);