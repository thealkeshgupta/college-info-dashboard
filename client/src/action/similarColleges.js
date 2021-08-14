import axios from "axios";
import { BACKEND_PORT } from "../config/port";
import {
    SIMILAR_COLLEGES_LIST_SUCCESS,
    SIMILAR_COLLEGES_LIST_FAIL,
    SHOW_LOADER,
    HIDE_LOADER,
 
} from "./types";

// action for fetching list of similar colleges for a particular from the server
export const similarColleges = (id) => async (dispatch) => {
  
    dispatch({
      type: SHOW_LOADER,
    });
  
    try {
      const res = await axios.get(
        `${BACKEND_PORT}/colleges/similar`, {
            params: {
              id: id
            }
          }
      );
      dispatch({
        type: SIMILAR_COLLEGES_LIST_SUCCESS,
        payload: res.data,
      });

      dispatch({
        type: HIDE_LOADER,
      });
    } catch (err) {
      const errors = err;
      dispatch({
        type: SIMILAR_COLLEGES_LIST_FAIL,
      });
      dispatch({
        type: HIDE_LOADER,
      });

    }
  };