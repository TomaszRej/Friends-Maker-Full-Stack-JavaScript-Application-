


const initialState = {
  notification: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "NOTIFY":
      return {
        ...state,
        notification: action.payload
      };

    case "CLEAR_NOTIFICATION": {
      return {
        ...state,
        notification:  ""
      }
    }
    default:
      return state;
  }
}