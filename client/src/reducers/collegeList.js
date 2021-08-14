import {
    COLLEGE_LIST_SUCCESS,
    COLLEGE_LIST_FAIL,
  } from "../action/types";
  
  // initial states of collegeList
  const initialState = {
    colleges:[],
  };
  
  
// reducer for updating the collegeList by updating collegeList states
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case COLLEGE_LIST_SUCCESS:
        return {
          ...state,
          colleges : payload.request,
        };
  
      case COLLEGE_LIST_FAIL:
        return {
          ...state,
          colleges:[]
        };
  
  
      default:
        return state;
    }
  }
  