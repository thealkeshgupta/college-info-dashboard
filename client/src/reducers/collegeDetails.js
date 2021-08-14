import {
    COLLEGE_DETAIL_SUCCESS,
    COLLEGE_DETAIL_FAIL,
  } from "../action/types";
  
  // initial states of collegeDetails
  const initialState = {
    id:null,
    name: null,
    year_founded:null,
    city:null,
    state:null,
    country:null,
    no_of_students:null,
    courses:[]

  };
  
// reducer for updating the collegeDetails by updating collegeDetails states
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case COLLEGE_DETAIL_SUCCESS:
        return {
          ...state,
          id:payload._id,
          name: payload.name,
          year_founded:payload.year_founded,
          city:payload.city,
          state:payload.state,
          country:payload.country,
          no_of_students:payload.no_of_students,
          courses:payload.courses,
        };
  
      case COLLEGE_DETAIL_FAIL:
        return {
          ...state,id:null,
          name: null,
          year_founded:null,
          city:null,
          state:null,
          country:null,
          no_of_students:null,
          courses:null,
        };

      default:
        return state;
    }
  }
  