import {
    STATE_LIST_SUCCESS,
    STATE_LIST_FAIL,
  } from "../action/types";
  
  // initial states of stateCollegeList
  const initialState = {
    colleges:[],
  };
  
  
// reducer for updating the stateCollegeList by updating stateCollegeList states
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case STATE_LIST_SUCCESS:
        return {
          ...state,
          colleges : payload.request,
        };
  
      case STATE_LIST_FAIL:
        return {
          ...state,
          colleges:[]
        };
  

      default:
        return state;
    }
  }
  