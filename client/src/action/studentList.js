import axios from "axios";
import { BACKEND_PORT } from "../config/port";
import {
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,
    SHOW_LOADER,
    HIDE_LOADER,
 
} from "./types";

// action for fetching list of students of a college from the server
export const studentList = (id) => async (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
    });
  
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/colleges/students`,{
            params: {
              college_id: id
            }
          }
      );
      dispatch({
        type: STUDENT_LIST_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: HIDE_LOADER,
      });
    } catch (err) {
      const errors = err;
      dispatch({
        type: STUDENT_LIST_FAIL,
      });
      dispatch({
        type: HIDE_LOADER,
      });

    }
  };