import {
    STUDENT_LIST_SUCCESS,
    STUDENT_LIST_FAIL,
  } from "../action/types";
  
  // initial states of studentList
  const initialState = {
    students:[],
  };
  
// reducer for updating the studentList by updating studentList states
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case STUDENT_LIST_SUCCESS:
        return {
          ...state,
          students : payload.request,
        };
  
      case STUDENT_LIST_FAIL:
        return {
          ...state,
          students:[],
        };
  
      default:
        return state;
    }
  }
  