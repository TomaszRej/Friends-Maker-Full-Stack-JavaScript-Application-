import axios from 'axios';
import { returnErrors, clearErrors} from './errorActions';

import { returnLoginErrors } from './loginErrorActions';

import {
    //   USER_LOADED,
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
    CLOSE_REGISTER_MODAL
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
export const register = ({ name, email, password, confirmPassword }) => async dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ name, email, password, confirmPassword });

   

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
export const login = ({ email, password }) => async dispatch => {
    console.log(email, password, "krok 1");

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });

   

    dispatch({
        type: LOGIN_LOADING,
    
    })

    try {
        const res = await axios.post('http://localhost:8000/api/users/login', body, config);
        console.log(res, 'response data z auth actions :)');
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.user
        })
        dispatch({
            type: CLOSE_LOGIN_MODAL,
        })

    } catch (err) {
        console.log(err, 'message bledy z auth login actions');

        dispatch(
            returnLoginErrors(err, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
            type: LOGIN_FAIL
        });
    }

}

// // Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// export const login = ((req, res) => {
//     const { errors, isValid } = validateLoginInput(req.body);

//     // Check Validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     const email = req.body.email;
//     const password = req.body.password;

//     // Find user by email
//     User.findOne({ email }).then(user => {
//         // Check for user
//         if (!user) {
//             errors.email = 'User not found';
//             return res.status(404).json(errors);
//         }

//         // Check Password
//         bcrypt.compare(password, user.password).then(isMatch => {
//             if (isMatch) {
//                 // User Matched
//                 const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

//                 // Sign Token
//                 jwt.sign(
//                     payload,
//                     keys.secretOrKey,
//                     { expiresIn: 3600 },
//                     (err, token) => {
//                         res.json({
//                             success: true,
//                             token: 'Bearer ' + token
//                         });
//                     }
//                 );
//             } else {
//                 errors.password = 'Password incorrect';
//                 return res.status(400).json(errors);
//             }
//         });
//     });
// }

// Login User
// export const login = ({ email, password }) => async dispatch => {
//     console.warn(email, password, 'z akcji logowania')

//     // Headers
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     // Request body
//     const body = JSON.stringify({ email, password });

//     try {
//         const res = await axios.post('http://localhost:8000/api/users/login', body, config);

//         dispatch({
//             type: LOGIN_SUCCESS,
//             payload: res.data
//         })
//     } catch (err) {
//         dispatch(
//             returnErrors(err, err.response.status, 'LOGIN_FAIL')
//         );
//         dispatch({
//             type: LOGIN_FAIL
//         });
//     }
// };

//x

//x



// // Setup config/headers and token
// export const tokenConfig = getState => {
//   // Get token from localstorage
//   const token = getState().auth.token;

//   // Headers
//   const config = {
//     headers: {
//       'Content-type': 'application/json'
//     }
//   };

//   // If token, add to headers
//   if (token) {
//     config.headers['x-auth-token'] = token;
//   }

//   return config;
// }
