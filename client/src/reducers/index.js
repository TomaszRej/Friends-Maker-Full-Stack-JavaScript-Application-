import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import layoutReducer from './layotRedeucer';
import registerErrorReducer from './registerErrorReducer';
import loginErrorReducer from './loginErrorReducer';
export default combineReducers({
    loginError: loginErrorReducer,
    registerError: registerErrorReducer,
    error: errorReducer,
    auth: authReducer,
    layout: layoutReducer
});