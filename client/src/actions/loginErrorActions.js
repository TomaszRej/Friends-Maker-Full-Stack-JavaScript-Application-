
import { GET_LOGIN_ERRORS, CLEAR_LOGIN_ERRORS } from './types';

// RETURN ERRORS
export const returnLoginErrors = (message, status, id = null) => {
  return {
    type: GET_LOGIN_ERRORS,
    payload: { message, status, id } 
  };
};

// CLEAR ERRORS
export const clearLoginErrors = () => {
  return {
    type: CLEAR_LOGIN_ERRORS
  }
}