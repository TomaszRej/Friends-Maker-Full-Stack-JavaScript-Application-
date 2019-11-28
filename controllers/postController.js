const Post = require('../models/Post');
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;
const io = require('../socket');


exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts: posts })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.addPost = async (req, res, next) => {
  
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      authorName: req.userName
    });
    newPost.save();

    io.getIO().emit('posts', {
      action: 'create',
      post:  newPost
    });

    res.status(201).json({ message: "Post created!", post: newPost })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

