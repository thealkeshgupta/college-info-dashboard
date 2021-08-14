import axios from "axios";
import { BACKEND_PORT } from "../config/port";
import {
    STATE_COMPARISON_DATA_SUCCESS,
    STATE_COMPARISON_DATA_FAIL,
    SHOW_LOADER,
    HIDE_LOADER,
 
} from "./types";

// action for fetching counts of colleges in each states of a country from the server
export const stateComparison = ({ country }) => async (dispatch) => {

    dispatch({
      type: SHOW_LOADER,
    });
  
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/country/states`, {
          params: {
            country: country
          }
        }
      );
      dispatch({
        type: STATE_COMPARISON_DATA_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: HIDE_LOADER,
      });
    } catch (err) {
      const errors = err;
      dispatch({
        type: STATE_COMPARISON_DATA_FAIL,
      });
      dispatch({
        type: HIDE_LOADER,
      });

    }
  };
