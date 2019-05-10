const areTheUsersFriends = (currUser, user) => {

    if (currUser.following.includes(user._id) && currUser.followers.includes(user._id)){
      return true;
    } else {
      return false;
    }

}


module.exports = areTheUsersFriends;