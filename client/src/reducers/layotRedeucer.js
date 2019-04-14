import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_REGISTER_MODAL, TEST } from '../actions/types';

const initialState = {
    loginModalOpened: false,
    registerModalOpened: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_LOGIN_MODAL:
        console.log('test open r modal reducer ');
        
            return {
                ...state,
                loginModalOpened: true,
                registerModalOpened: false
            };
        case CLOSE_LOGIN_MODAL:
            return {
                ...state,
                loginModalOpened: false
            };
        case TEST:
            return {
                ...state,
                loginModalOpened: true
                //registerModalOpened: 'testest'
            };
        case OPEN_REGISTER_MODAL:

            return {
                ...state,
                registerModalOpened: true
            };
        case CLOSE_REGISTER_MODAL:
            console.log('reducer rclose reg modal');
            return {
                ...state,
                registerModalOpened: false
            };
        default:
            return state;
    }
}