export const notifyAction = ({message}) => async (dispatch, getState) => {

  dispatch({
    type: "NOTIFY",
    payload: message
  })


};

export const clearNotification = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_NOTIFICATION",

  })
}