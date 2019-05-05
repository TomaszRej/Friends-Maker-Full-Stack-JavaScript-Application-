const areTheUsersFriends = (currUser, user) => {

  const currUserFollowingUser = currUser.following.filter(userId => userId === user._id);
  const currUserFollowersUser = currUser.followers.filter(userId => userId === user._id)


  console.log(currUserFollowingUser[0]);
  console.log(currUserFollowersUser[0]);


  if (currUserFollowingUser[0] !== undefined) {

    if (currUserFollowingUser[0] === currUserFollowersUser[0]) {
      return true;
    } else {
      return false;
    }
  }

}


module.exports = areTheUsersFriends;