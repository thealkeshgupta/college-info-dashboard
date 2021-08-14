import axios from "axios";
import { BACKEND_PORT } from "../config/port";
import {
    STATE_LIST_SUCCESS,
    STATE_LIST_FAIL,
    SHOW_LOADER,
    HIDE_LOADER,
 
} from "./types";

// action for fetching list of colleges in a particular state in a country from server
export const stateCollegeList = (country,state) => async (dispatch) => {
  
    dispatch({
      type: SHOW_LOADER,
    });
  
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/country/exploreState`, {
            params: {
              country: country,
              state:state
            }
          }
      );
      dispatch({
        type: STATE_LIST_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: HIDE_LOADER,
      });
    } catch (err) {
      const errors = err;
      dispatch({
        type: STATE_LIST_FAIL,
      });
      dispatch({
        type: HIDE_LOADER,
      });

    }
  };