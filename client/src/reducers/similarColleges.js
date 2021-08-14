import {
    SIMILAR_COLLEGES_LIST_SUCCESS,
    SIMILAR_COLLEGES_LIST_FAIL,
  } from "../action/types";
  
// initial states of similarColleges
  const initialState = {
    colleges:[],
  };
  
// reducer for updating the similarColleges by updating similarColleges states
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SIMILAR_COLLEGES_LIST_SUCCESS:
        return {
          ...state,
          colleges : payload.request,
        };
  
      case SIMILAR_COLLEGES_LIST_FAIL:
        return {
          ...state,
          colleges:[]
        };
  
      default:
        return state;
    }
  }
  