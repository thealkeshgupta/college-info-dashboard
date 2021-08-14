import { SHOW_LOADER, HIDE_LOADER } from "../action/types";

  // initial states of loader
const initialState = {loading:false};

// reducer for showing or hiding the loader by updating loader states
export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SHOW_LOADER:
      return {...state, loading:true};
    case HIDE_LOADER:
      return{...state, loading:false}
    default:
      return state;
  }
}
