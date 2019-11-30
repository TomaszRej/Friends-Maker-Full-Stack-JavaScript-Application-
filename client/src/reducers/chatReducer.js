import {
  CHAT_WITH_FRIEND,
  STOP_CHATTING_WITH_FRIEND
} from '../actions/types';


const initialState = {
  activeChats: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHAT_WITH_FRIEND:
      return {
        ...state,
        activeChats: [...state.activeChats, {id: action.payload.id, withFriend: action.payload.friend}]
      };


    case STOP_CHATTING_WITH_FRIEND:
      return {
        ...state,
        activeChats: [...state.activeChats.filter(chat => chat.withFriend._id !== action.payload)]

      };

    default:
      return state;
  }
}