import {
    STATE_COMPARISON_DATA_SUCCESS,
    STATE_COMPARISON_DATA_FAIL,
  } from "../action/types";
  
  
  // initial states of stateComparison
  const initialState = {
    statesData:[],
  };
  
// reducer for updating the stateComparison by updating stateComparison states
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case STATE_COMPARISON_DATA_SUCCESS:
        return {
          ...state,
          statesData : payload.data,
        };
  
      case STATE_COMPARISON_DATA_FAIL:
        return {
          ...state,
          statesData:[]
        };
  
      default:
        return state;
    }
  }
  