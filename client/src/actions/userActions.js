import axios from 'axios';
import {
    USERS_LOADING,
    USERS_LOADED
} from './types';


export const getUsers = () => async (dispatch, getState) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    console.log(tokenConfig(getState), 'CONFIG heders right ??')


    dispatch({
        type: USERS_LOADING,

    })

    try {
        const res = await axios.get('http://localhost:8000/api/users/', tokenConfig(getState));
        console.log('2', res.data)
        dispatch({
            type: USERS_LOADED,
            payload: res.data.users
        })


    } catch (err) {
        console.log(err, 'ERR z GET USERS ACTION');

        // dispatch(
        //     returnLoginErrors(err, err.response.status, 'REGISTER_FAIL')
        // );
        // dispatch({
        //     type: LOGIN_FAIL
        // });
    }

}

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    console.warn(token, 'TOKEN W TOKEN CONFIG FUNC :)  W USER ACTION')

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
       // config.headers['x-auth-token'] = token;
        config.headers['Authorization'] = token;
    }

    return config;
}