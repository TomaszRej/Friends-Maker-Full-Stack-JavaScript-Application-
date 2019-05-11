import axios from 'axios';
import {
  USERS_LOADING,
  USERS_LOADED,
  UPDATING_USER_ERROR,
  USER_UPDATING,
  USER_UPDATED,
  FRIENDS_LOADED
} from './types';
import tokenConfig from '../helpers/tokenConfig';
import {openLoginModal} from "./layoutActions";
import {logout} from "./authActions";

export const follow = (currUserId, userToFollowId) => async (dispatch, getState) => {
  const body = {currUserId, userToFollowId};
  console.log(tokenConfig(getState))

  try {
    const res = await axios.put('http://localhost:8000/api/users/', body, tokenConfig(getState));


  } catch (err) {
    console.log(err, 'follow err');
  }

}


export const updateUser = (userId) => async (dispatch, getState) => {

  dispatch({
    type: USER_UPDATING,
  })

  try {
     const res = await axios.put(`http://localhost:8000/api/users/${userId}`, tokenConfig(getState));

    dispatch({
      type: USERS_LOADED,
      payload: res.data.updatedUser
    })


  } catch (err) {

    dispatch({
      type: UPDATING_USER_ERROR,
      payload: err
    })

  }

}


export const getUsers = () => async (dispatch, getState) => {

  dispatch({
    type: USERS_LOADING,

  })

  const tokenExp = getState().auth.tokenExp;

  //checking if token expire
  if(getState().auth.tokenExp === null ){
    dispatch(logout())
    dispatch(openLoginModal())
    return
  }


  try {
    const res = await axios.get('http://localhost:8000/api/users/', tokenConfig(getState));
    console.log('22222', res.data)
    dispatch({
      type: USERS_LOADED,
      payload: res.data.users
    })


  } catch (err) {
    console.log(err, 'ERR z GET USERS ACTION');

  }

}

