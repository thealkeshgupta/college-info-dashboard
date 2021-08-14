import axios from "axios";
import { BACKEND_PORT } from "../config/port";
import {
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    SHOW_LOADER,
    HIDE_LOADER,
 
} from "./types";

// action for fetching colleges list for a particular course in a country from server
export const courseCollegeList = (country,course) => async (dispatch) => {
  
    dispatch({
      type: SHOW_LOADER,
    });
  
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/country/exploreCourse`, {
            params: {
              country: country,
              course:course
            }
          }
      );
      dispatch({
        type: COURSE_LIST_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: HIDE_LOADER,
      });
    } catch (err) {
      const errors = err;
      dispatch({
        type: COURSE_LIST_FAIL,
      });
      dispatch({
        type: HIDE_LOADER,
      });

    }
  };