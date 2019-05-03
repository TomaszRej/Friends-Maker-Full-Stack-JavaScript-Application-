const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;
const io = require('../socket');


exports.followUser = async (req, res, next) => {
  //const { currUserId, userToFollowId } = req.params;
  const { currUserId, userToFollowId } = req.body;

  try {
    const currUser = await User.findById(ObjectId(currUserId));
    const userToFollow = await User.findById(ObjectId(userToFollowId));

    currUser.following.push(userToFollowId);
    currUser.save();
    userToFollow.followers.push(currUserId);
    userToFollow.save();

    io.getIO().emit('follow', {
      action: 'follow',
      users: [ currUser, userToFollow ]
    });

    res.status(200).json({ message: 'Users updated!', users: [ currUser, userToFollow ] });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Custom error message'
    }
    next(err);
  }
}



