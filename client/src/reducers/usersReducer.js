import {
  USERS_LOADED,
  USERS_LOADING,
  UPDATE_USER,
  FRIENDS_LOADED
} from '../actions/types';


const initialState = {
  isLoading: false,
  users: [],
  friends: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USERS_LOADED:
      return {
        ...state,
        isLoading: false,
        users: action.payload
      };
    case FRIENDS_LOADED:
      return {
        ...state,
        friends: action.payload
      }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => {
          if (user._id === action.payload._id) {
            return {
              ...action.payload,

            }
          }
          return user
        })
      }
    default:
      return state;
  }
}