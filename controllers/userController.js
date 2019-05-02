const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;
//const io = require('../socket');




exports.followUser = async (req, res, next) => {
  //const postId = req.params.postId;
  console.log('REQUEST', req)
  //const {currUserId, userToFollowId } = req.body.currUserId;
  const {currUserId, userToFollowId } = req.params;

  console.log(currUserId, userToFollowId, 'current and toFollow users id');

  try {
    const currUser = await User.findById(ObjectId(currUserId));
    const userToFollow = await User.findById(ObjectId(userToFollowId));
    console.log(currUser, userToFollow);
    currUser.following.push(userToFollowId);
    currUser.save();
    userToFollow.followers.push(currUserId);
    userToFollow.save();

    res.status(200).json({ message: 'Users updated!', users: {currUser, userToFollow} });

  } catch (err) {
    console.log('------ERROR------')
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}



