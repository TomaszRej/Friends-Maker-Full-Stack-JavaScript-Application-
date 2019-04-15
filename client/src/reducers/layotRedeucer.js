import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_REGISTER_MODAL } from '../actions/types';

const initialState = {
    loginModalOpened: false,
    registerModalOpened: false
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
        default:
            return state;
    }
}