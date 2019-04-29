import { GET_POSTS, ADD_POST, POSTS_LOADING } from './types';
import tokenConfig from '../helpers/tokenConfig';
import axios from 'axios';



export const getPosts = () => async (dispatch, getState) => {

  dispatch({
    type: POSTS_LOADING
  })

  try {
    const res = await axios.get('http://localhost:8000/api/posts/', tokenConfig(getState));
    dispatch({
      type: GET_POSTS,
      payload: res.data.posts
    })
  } catch (err) {
    console.log(err)
  }
};

export const addPost = ({ title, description }) => async (dispatch, getState) => {
  const body = { title: title, description: description, author: getState().auth.user._id };

  try {
    await axios.post('http://localhost:8000/api/posts/', body, tokenConfig(getState));
    dispatch({
  //to do fetch Post action
    })

  } catch (err) {
    console.log(err)
  }

}