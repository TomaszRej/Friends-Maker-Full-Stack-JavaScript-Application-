import {
  GET_POSTS,
  ADD_POST,
  POSTS_LOADING
} from '../actions/types';


const initialState = {
  postsLoading: false,
  posts: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsLoading: false
      };
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: true
      };
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.payload)
      }
    default:
      return state;
  }
}