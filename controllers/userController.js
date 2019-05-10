const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;
const io = require('../socket');


exports.followUser = async (req, res, next) => {
  const { currUserId, userToFollowId } = req.body;

  try {
    const currUser = await User.findById(ObjectId(currUserId));
    const user = await User.findById(ObjectId(userToFollowId));


    currUser.following.push(userToFollowId);
    currUser.save();
    user.followers.push(currUserId);
    user.save();


    io.getIO().emit('follow', {
      action: 'follow',
      users: [currUser, user]
    });

    res.status(200).json({ message: 'Users updated!', users: [ currUser, user ] });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Custom error message'
    }
    next(err);
  }
}



