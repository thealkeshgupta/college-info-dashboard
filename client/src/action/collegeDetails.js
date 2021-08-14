import axios from "axios";
import { BACKEND_PORT } from "../config/port";
import {
    COLLEGE_DETAIL_SUCCESS,
    COLLEGE_DETAIL_FAIL,
    SHOW_LOADER,
    HIDE_LOADER,
 
} from "./types";

// action for fetching college details by id from server
export const collegeDetailsById = ({ id }) => async (dispatch) => {

    dispatch({
      type: SHOW_LOADER,
    });
  
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/colleges/id`, {
          params: {
            id: id
          }
        }
      );
      dispatch({
        type: COLLEGE_DETAIL_SUCCESS,
        payload: res.data.request,
      });

      dispatch({
        type: HIDE_LOADER,
      });
    } catch (err) {
      const errors = err;
      dispatch({
        type: COLLEGE_DETAIL_FAIL,
      });
      dispatch({
        type: HIDE_LOADER,
      });

    }
  };


// action for fetching college details by name from server  
export const collegeDetailsByName = ({ name }) => async (dispatch) => {

  dispatch({
    type: SHOW_LOADER,
  });

  try {
    const res = await axios.get(
      `${BACKEND_PORT}/colleges/name`, {
        params: {
          name: name
        }
      }
    );
    dispatch({
      type: COLLEGE_DETAIL_SUCCESS,
      payload: res.data.request,
    });

    dispatch({
      type: HIDE_LOADER,
    });
  } catch (err) {
    const errors = err
    dispatch({
      type: COLLEGE_DETAIL_FAIL,
    });
    dispatch({
      type: HIDE_LOADER,
    });

  }
};

