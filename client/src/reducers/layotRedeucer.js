import {
    OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL,OPEN_REGISTER_MODAL, CLOSE_REGISTER_MODAL
    , OPEN_FORGOT_PASSWORD_MODAL, CLOSE_FORGOT_PASSWORD_MODAL
} from '../actions/types';

const initialState = {
    loginModalOpened: false,
    registerModalOpened: false,
    forgotPasswordOpened: false 
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_LOGIN_MODAL:
            return {
                ...state,
                loginModalOpened: true,
            };
        case CLOSE_LOGIN_MODAL:
            return {
                ...state,
                loginModalOpened: false
            };
        case OPEN_REGISTER_MODAL:

            return {
                ...state,
                registerModalOpened: true
            };
        case CLOSE_REGISTER_MODAL:
            return {
                ...state,
                registerModalOpened: false
            };
        case OPEN_FORGOT_PASSWORD_MODAL:

            return {
                ...state,
                forgotPasswordModalOpened: true
            };
        case CLOSE_FORGOT_PASSWORD_MODAL:
            return {
                ...state,
                forgotPasswordModalOpened: false
            };
        default:
            return state;
    }
}