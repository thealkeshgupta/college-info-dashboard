import {
    COURSE_COMPARISON_DATA_SUCCESS,
    COURSE_COMPARISON_DATA_FAIL,
  } from "../action/types";
  
  // initial states of courseComparison
  const initialState = {
    coursesData:[],
  };
  
// reducer for updating the courseComparison by updating courseComparison states
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case COURSE_COMPARISON_DATA_SUCCESS:
        return {
          ...state,
          coursesData : payload.data,
        };
  
      case COURSE_COMPARISON_DATA_FAIL:
        return {
          ...state,
          coursesData:[]
        };

  
      default:
        return state;
    }
  }
  