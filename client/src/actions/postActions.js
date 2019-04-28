import { GET_POSTS, ADD_POST } from './types';
import tokenConfig from '../helpers/tokenConfig';
import axios from 'axios';

export const getPosts = () => async (dispatch, getState) => {

  console.log('reched getPosts');
  

//   dispatch({
//       type: REGISTER_LOADING
//   })

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