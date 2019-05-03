import axios from 'axios';
import {
    USERS_LOADING,
    USERS_LOADED,
    UPDATE_USER,
} from './types';
import tokenConfig from '../helpers/tokenConfig';


export const follow = (currUserId, userToFollowId) => async (dispatch, getState) => {
    const body = { currUserId, userToFollowId };
    console.log(tokenConfig(getState))

    try {
        const res = await axios.put('http://localhost:8000/api/users/', body, tokenConfig(getState));
       

    } catch (err) {
        console.log(err, 'follow err');
    }

}

export const updateUser = (user) => async (dispatch, getState) => {
    console.log(user, 'userUpdating...');
    // update only on front end

    dispatch({
        type: UPDATE_USER,
        payload: user
    })


}

export const getUsers = () => async (dispatch, getState) => {

    dispatch({
        type: USERS_LOADING,

    })

    try {
        const res = await axios.get('http://localhost:8000/api/users/', tokenConfig(getState));
        console.log('22222', res.data)
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

