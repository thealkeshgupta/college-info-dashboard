import { SET_ALERT, REMOVE_ALERT } from "../action/types";

// initial states of alert
const initialState = {message:"", description:"", type:""};

// reducer for setting and removing the alert by updating alert states
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return {...state, message:payload.message, description:payload.description, type: payload.type};
    case REMOVE_ALERT:
      return{...state, message:"", description:"", type:""}
    default:
      return state;
  }
}
