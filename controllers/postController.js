const Post = require('../models/Post');

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
}



exports.addPost = (req, res, next) => {
  console.log(req.body.title);
  console.log(req.body.description)
  const newPost = new Post({ title: req.body.title, description: req.body.description, author: req.body.author });
  try {

    newPost.save();
    console.log('TAK')
    res.status(201).json({ message: "Post created!", post: newPost })
  } catch (err) {
    console.log('NIE')
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}