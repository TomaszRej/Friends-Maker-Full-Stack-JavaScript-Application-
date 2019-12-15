import {
  CHAT_WITH_FRIEND,
  STOP_CHATTING_WITH_FRIEND
} from "./types";
import axios from "axios";
import tokenConfig from '../helpers/tokenConfig';
import openSocket from 'socket.io-client';


const socket = openSocket('http://localhost:8000');

export const chatWithFriendAction = (friend) => dispatch => {
  dispatch({
    type: CHAT_WITH_FRIEND,
    payload: {id: friend._id, friend: friend}
  });
};

export const stopChattingWithFriendAction = friend => dispatch => {
  dispatch({
    type: STOP_CHATTING_WITH_FRIEND,
    payload: friend._id
  });

  socket.emit('disconnect');
  socket.of();
};

export const createChatRoomAction = (friendId) => async (dispatch, getState) => {

const state = getState();
const currUser = state.auth.user;

  socket.emit('createChatRoom',  {userId: currUser._id, friendId: friendId})


};

export const sendMessageAction = (friendId, message) =>  async (dispatch , getState) => {
  const state = getState();
  const currUser = state.auth.user;

  socket.emit('message', message);
  //socket.to(currUser._id + friendId).emit("message", message);





}