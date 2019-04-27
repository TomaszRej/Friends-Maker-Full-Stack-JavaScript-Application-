import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, OPEN_REGISTER_MODAL, CLOSE_REGISTER_MODAL,CLOSE_FORGOT_PASSWORD_MODAL,OPEN_FORGOT_PASSWORD_MODAL  } from './types';

// OPEN LOGIN MODAL
export const openLoginModal = () => {
    console.log('open login modal');
    
    return {
        type: OPEN_LOGIN_MODAL
    };
};
// CLOSE LOGIN MODAL
export const closeLoginModal = () => {
    return {
        type: CLOSE_LOGIN_MODAL
    };
};

//OPEN REGISTER MODAL
export const openRegisterModal = () => {
    return {
        type: OPEN_REGISTER_MODAL
    };
};

// CLOSE REGISTER MODAL
export const closeRegisterModal = () => {
    return {
        type: CLOSE_REGISTER_MODAL
    };
};

//OPEN FORGOT_PASSWORD MODAL
export const openForgotPasswordModal = () => {
    return {
        type: OPEN_FORGOT_PASSWORD_MODAL
    };
};

// CLOSE FORGOT_PASSWORD MODAL
export const closeForgotPasswordModal = () => {
    return {
        type: CLOSE_FORGOT_PASSWORD_MODAL
    };
};






