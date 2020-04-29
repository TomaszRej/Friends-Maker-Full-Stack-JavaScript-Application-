import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import FriendItem from './FriendItem';
import areTheUsersFriends from '../../helpers/areTheUsersFriends';
import {chatWithFriendAction, createChatRoomAction} from "../../actions/chatActions";


const FriendsList = () => {
  const currUser = useSelector(state => state.auth.user);
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();


  const friends = users.filter(user => {
    if (areTheUsersFriends(currUser, user)) {
      return user
    }
  });


  const chatWithFriend = friend => {
    dispatch(chatWithFriendAction(friend));
    dispatch(createChatRoomAction(friend._id));
  };


  return (
    friends.map(friend => {
      return <FriendItem
        onClick={() => chatWithFriend(friend)}
        friend={friend}/>
    })

  )

};


export default FriendsList;
