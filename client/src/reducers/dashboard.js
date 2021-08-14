import { SET_DASHBOARD_INDEX } from "../action/types";

// initial states of dashboard
const initialState = {index:"1"};

// reducer for updating the dashboard by updating dashboard states
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DASHBOARD_INDEX:
      return {...state, index:payload.index};
    default:
      return state;
  }
}
