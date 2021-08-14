import axios from "axios";
import { BACKEND_PORT } from "../config/port";
import {
    COLLEGE_LIST_SUCCESS,
    COLLEGE_LIST_FAIL,
    SHOW_LOADER,
    HIDE_LOADER,
 
} from "./types";

// action for fetching list of all colleges from the server
export const collegeList = () => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: SHOW_LOADER,
    });
  
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/colleges/`,
        config
      );
      dispatch({
        type: COLLEGE_LIST_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: HIDE_LOADER,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      dispatch({
        type: COLLEGE_LIST_FAIL,
      });
      dispatch({
        type: HIDE_LOADER,
      });

    }
  };