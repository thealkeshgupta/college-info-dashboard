import axios from "axios";
import { BACKEND_PORT } from "../config/port";
import {
    COURSE_COMPARISON_DATA_SUCCESS,
    COURSE_COMPARISON_DATA_FAIL,
    SHOW_LOADER,
    HIDE_LOADER,
 
} from "./types";


// action for fetching college counts for all types of course in a country from server
export const courseComparison = ({ country }) => async (dispatch) => {

    dispatch({
      type: SHOW_LOADER,
    });
  
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/country/courses`, {
          params: {
            country: country
          }
        }
      );
      dispatch({
        type: COURSE_COMPARISON_DATA_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: HIDE_LOADER,
      });
    } catch (err) {
      const errors = err;
      dispatch({
        type: COURSE_COMPARISON_DATA_FAIL,
      });
      dispatch({
        type: HIDE_LOADER,
      });

    }
  };
