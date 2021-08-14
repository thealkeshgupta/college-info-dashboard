import { SET_DASHBOARD_INDEX } from "./types";


// action for setting menu index of the dashboard
export const setDashboardIndex = (index) => (dispatch) => {
  dispatch({
    type: SET_DASHBOARD_INDEX,
    payload: {index},
  });

};


