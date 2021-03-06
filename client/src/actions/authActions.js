import axios from 'axios';
import {returnErrors, clearErrors} from './errorActions';

import {returnLoginErrors} from './loginErrorActions';
import {getUsers} from './userActions';
import {getPosts} from './postActions';

import {
  USERS_LOADED,
  //   USER_LOADING,
  //   AUTH_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOADING,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  CLOSE_REGISTER_MODAL,
  UPDATE_LOGGED_USER
} from './types';

// // Check token & load user
// export const loadUser = () => (dispatch, getState) => {
//   // User loading
//   dispatch({ type: USER_LOADING });

//   axios
//     .get('/api/auth/user', tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data
//       })
//     )
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_ERROR
//       });
//     });
// };

// Register User
export const register = ({name, email, password, confirmPassword}) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({name, email, password, confirmPassword});


  dispatch({
    type: REGISTER_LOADING
  })

  try {
    const res = await axios.post('http://localhost:8000/api/users/', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch({
      type: OPEN_LOGIN_MODAL
    })
    dispatch({
      type: CLOSE_REGISTER_MODAL
    })

  } catch (err) {
    dispatch(
      returnErrors(err, err.response.status, 'REGISTER_FAIL')
    );
    dispatch({
      type: REGISTER_FAIL
    });
  }


};

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
export const login = ({email, password}, rememberMe) => async dispatch => {
  console.log(email, password, "krok 1");

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({email, password});

  dispatch({
    type: LOGIN_LOADING,
  })

  try {
    const res = await axios.post('http://localhost:8000/api/users/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: res.data.user,
        token: res.data.token,
        tokenExp: res.data.tokenExp,
        tokenIat: res.data.tokenIat
      }
    })


    dispatch(getUsers())
    dispatch(getPosts())
    dispatch({
      type: CLOSE_LOGIN_MODAL,
    })

    if (rememberMe) {
      const user = JSON.stringify(res.data.user);
      localStorage.setItem('user', user);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('tokenExp', res.data.tokenExp);

    }


  } catch (err) {
    console.log(err, 'message bledy z auth login actions');

    // dispatch(
    //   returnLoginErrors(err, err.response.status, 'REGISTER_FAIL')
    // );
    dispatch({
      type: LOGIN_FAIL
    });
  }

}

// // Logout User
// export const logout = () => {
//   return {
//     type: LOGOUT_SUCCESS
//   };
// };

export const updateLoggedUser = (user) => dispatch => {
  dispatch({
    type: UPDATE_LOGGED_USER,
    payload: user
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
  dispatch({
    type: USERS_LOADED,
    payload: []
  });
};
