import {
    USERS_LOADED,
    USERS_LOADING,
  } from '../actions/types';
  
  
  const initialState = {
        users: []
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
      default:
        return state;
    }
  }