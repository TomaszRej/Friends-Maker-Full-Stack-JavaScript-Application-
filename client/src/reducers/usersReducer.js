import {
  USERS_LOADED,
  USERS_LOADING,
  UPDATING_USER_ERROR,
  USER_UPDATING,
  USER_UPDATED,

} from '../actions/types';


const initialState = {
  isLoading: false,
  updatingError: null,
  users: [],

};

export default function (state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_UPDATING:
    case USERS_LOADED:
      return {
        ...state,
        isLoading: false,
        users: action.payload
      };
    case USER_UPDATED:
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
      };

    case UPDATING_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        updatingError: action.payload

      };

    default:
      return state;
  }
}