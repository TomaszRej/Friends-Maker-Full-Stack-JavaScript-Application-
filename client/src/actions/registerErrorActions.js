
import { GET_REGISTER_ERRORS, CLEAR_REGISTER_ERRORS } from './types';

// RETURN ERRORS
export const returnRegisterErrors = (message, status, id = null) => {
  return {
    type: GET_REGISTER_ERRORS,
    payload: { message, status, id } 
  };
};

// CLEAR ERRORS
export const clearRegisterErrors = () => {
  return {
    type: CLEAR_REGISTER_ERRORS
  }
}