import { combineReducers } from "redux";

import collegeList from "./collegeList";
import similarColleges from "./similarColleges";
import collegeDetails from "./collegeDetails";
import stateComparison from "./stateComparison";
import courseComparison from "./courseComparison";
import studentList from "./studentList";
import stateCollegeList from "./stateCollegeList";
import courseCollegeList from "./courseCollegeList";
import alert from "./alert";
import dashboard from "./dashboard";
import loader from "./loader";

// combining all the reducers
export default combineReducers({
    collegeList,
    similarColleges,
    collegeDetails,
    alert,
    stateComparison,
    courseComparison,
    studentList,
    stateCollegeList,
    courseCollegeList,
    dashboard,
    loader,
});