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
}


exports.addPost = async (req, res, next) => {
  
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.body.author);
  console.log(req.body.userId);
  console.log(req.userId);
  console.log(req.userName);
  
  console.log('---------')




  try {
    //const postAuthor = await User.find(ObjectId(req.userId));
    //const postAuthorName = postAuthor.name;
   
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

