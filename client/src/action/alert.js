import { SET_ALERT, REMOVE_ALERT } from "./types";


// action for setting the alert
export const setAlert = (message, description, type) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {message, description, type},
  });

};

// action for removing the alert
export const removeAlert = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
  });

};

