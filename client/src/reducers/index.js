import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import layoutReducer from './layotRedeucer';
import registerErrorReducer from './registerErrorReducer';
import loginErrorReducer from './loginErrorReducer';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import chatReducer from "./chatReducer";

export default combineReducers({
    posts: postsReducer,
    users: usersReducer,
    loginError: loginErrorReducer,
    registerError: registerErrorReducer,
    error: errorReducer,
    auth: authReducer,
    layout: layoutReducer,
    chatReducer: chatReducer
});