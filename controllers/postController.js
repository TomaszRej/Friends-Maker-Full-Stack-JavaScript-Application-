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



exports.addPost =(req, res, next) => {
  console.log(req.userId, 'req z add post')
  const newPost = new Post({ title: 'new1', description:'test1', author: req.userId});
  newPost.save();
  res.status(201).json({ message: "Post created!", post: newPost })
}