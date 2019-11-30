import {CHAT_WITH_FRIEND, STOP_CHATTING_WITH_FRIEND} from "./types";

export const chatWithFriendAction = (friend) => dispatch => {


  dispatch({
    type: CHAT_WITH_FRIEND,
    payload: {id: friend._id, friend: friend}
  });
};

export const stopChatingWithFriendAction = friend => dispatch => {


  dispatch({
    type: STOP_CHATTING_WITH_FRIEND,
    payload:  friend._id
  });
};