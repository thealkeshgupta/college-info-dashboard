import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import store from "../../store";
import Loader from '../layouts/Loader'
import { setDashboardIndex } from "../../action/dashboard";
import Dashboard from "../layouts/dashboard";
import { Typography,Breadcrumb } from 'antd';

const { Title,Paragraph } = Typography;

// Home Page Content
const Index = (props) => {
    useEffect(() => {
      store.dispatch(setDashboardIndex("1"));
    });

  // function to display page content
    function pageContent() {
      
    // if loading is true, show loader
      if (props.loading) {
        return <div>
            <Loader/>
        </div>;
      }
      
  // Page content
      return <div>
        <Breadcrumb>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Title>Welcome to Colleges Info Dashboard</Title>
        <Paragraph>
          This application is developed to check colleges details with features such as:
        </Paragraph>
        <Paragraph>
          <ul>
            <li>
              List of all colleges
            </li>
            <li>
              Colleges details by ID/name
            </li>
            <li>
              Similar colleges based on location, no of students and courses offered
            </li>
            <li>
              List of students in a college
            </li>
            <li>
              State-based distribution graph
            </li>
            <li>
              Course-based distribution graph
            </li>
            <li>
              State-specific colleges details in a country
            </li>
            <li>
              Course-specific colleges details in a country
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          This application is developed using <a href="https://expressjs.com/">Express.js</a> as backend, <a href="https://reactjs.org/">React</a> as frontend along with <a href="https://ant.design/">Ant Design</a>
        </Paragraph>
      </div>
    }
  
  
  // return page content
  return (
    <Dashboard content={
      <Fragment> {pageContent()} </Fragment>
   } />
  )
};

// mapping states to props to pass it to the component
const mapStateToProps = (state) => ({
  loading: state.loader.loading
});

// connecting mapStateToProps to the component
export default connect(mapStateToProps)(Index);
