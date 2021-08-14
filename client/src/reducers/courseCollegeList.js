import {
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
  } from "../action/types";
  
  // initial states of courseCollegeList
  const initialState = {
    colleges:[],
  };
  
  
// reducer for updating the courseCollegeList by updating courseCollegeList states
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case COURSE_LIST_SUCCESS:
        return {
          ...state,
          colleges : payload.request,
        };
  
      case COURSE_LIST_FAIL:
        return {
          ...state,
          colleges:[]
        };

  
      default:
        return state;
    }
  }
  