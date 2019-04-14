import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import layoutReducer from './layotRedeucer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    layout: layoutReducer
});