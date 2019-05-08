const areTheUsersFriends = (currUser, user) => {

    if (user.following.includes(currUser._id) && currUser.following.includes(user._id)){
      return true;
    } else {
      return false;
    }

}


module.exports = areTheUsersFriends;