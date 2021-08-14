import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import './App.css';
import index from "./components/mainPages/index";
import collegeList from "./components/mainPages/collegeList";
import similarColleges from "./components/mainPages/similarColleges";
import collegeDetails from "./components/mainPages/collegeDetails";
import stateComparison from "./components/mainPages/stateComparison";
import courseComparison from "./components/mainPages/courseComparison";
import studentsList from "./components/mainPages/studentList";
import stateCollegeList from "./components/mainPages/stateCollegeList";
import courseCollegeList from "./components/mainPages/courseCollegeList";
import dashboard from "./components/layouts/dashboard";
import Alert from "./components/layouts/alert";
import 'antd/dist/antd.css';
function App() {
  return (
    
    <Provider store={store}>
    <Router> 
      <Alert />
      <Route exact path="/" component={index} />
      <Route exact path="/collegeList" component={collegeList} />
      <Route exact path="/similar" component={similarColleges} />
      <Route exact path="/collegeDetails" component={collegeDetails} />
      <Route exact path="/statecomparison" component={stateComparison} />
      <Route exact path="/coursecomparison" component={courseComparison} />
      <Route exact path="/students" component={studentsList} />
      <Route exact path="/states" component={stateCollegeList} />
      <Route exact path="/courses" component={courseCollegeList} />
      <Route exact path="/dashboard" component={dashboard} />
    </Router>
    </Provider>
  );
}

export default App;
