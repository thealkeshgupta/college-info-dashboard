import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { similarColleges } from "../../action/similarColleges";
import store from "../../store";
import { Modal, Typography,Result,Breadcrumb } from 'antd';
import {useLocation} from "react-router-dom";
import CustomTable from '../layouts/Table'
import Loader from '../layouts/Loader'
import { setDashboardIndex } from "../../action/dashboard";
import Dashboard from "../layouts/dashboard"

const { Title } = Typography;

// StateCollegeList Page Content
const SimilarColleges = (props) => {
    
  // getting query paramete from the url
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    useEffect(() => {
      store.dispatch(similarColleges(id));
      store.dispatch(setDashboardIndex("3"));
    }, []);

    
  // function to display page content
  function pageContent() {
    
    // if loading is true, show loader
    if (props.loading) {
      return <div>
          <Loader/>
      </div>;
    }
    // Page content
    return <div> {showTable()}</div>
  }

// function to call model component for showing college info
  function collegeInfo(college) {
    Modal.info({
      title: 'College Detail',
      content: (
        <div>
            <p>College ID : {college._id}</p>
            <p>Name : {college.name}</p>
            <p>Since : {college.year_founded}</p>
            <p>City : {college.city}</p>
            <p>State : {college.state}</p>
            <p>Country : {college.country}</p>
            <p>No. of Students : {college.no_of_students}</p>
            <p>Common Courses Offered:</p>
            <ul>
                {college.commonCourses.map(course=>{
                    return <li key={course}>{course}</li>
                })}
            </ul>
            <a href={"/similar/?id="+college._id}>Show Similar Colleges</a>
            <br/>
            <a href={"/students/?id="+college._id}>Show Students List</a> 
        </div>
      ),
      onOk() {},
    });
  }

  
// function to display table component
  function showTable() {
    const data=[];

  // preparing table data
    props.colleges.map(college=>{
        data.push({
          info:college,
          name:college.name,
          location:college.city+", "+college.state,
          year_founded:college.year_founded,
          details:college,
        })
    }) 
    
  // if no colleges found, show 404 message else show table
    return props.colleges.length===0? <Result status="404" title="404" subTitle="No colleges found" />: <CustomTable data={data} 
    header={"Colleges similar to the college with id :"+id} 
    footer={"Above is the list of colleges that are similar to the college with id :"+id}
    columns= {[
              {
                title:"College Detail",
                dataIndex: 'info',
                align: 'center',
                render: text =><a onClick={() => collegeInfo(text)} key="list-loadmore-edit">{text.name}</a>,
                responsive: ['xs']
              },
              {
                title: 'College Name',
                dataIndex: 'name',
                align: 'center',
                responsive: ['sm']
              },
              {
                title: 'Location',
                dataIndex: 'location',
                align: 'center',
                responsive: ['md']
              },
              {
                title: 'Year Of Foundation',
                dataIndex: 'year_founded',
                align: 'center',
                responsive: ['md']
              },
              {
                title: 'Show Details',
                dataIndex: 'details',
                render: text =><a onClick={() => collegeInfo(text)} key="list-loadmore-edit">Show Details</a>,
                align: 'center',
                responsive: ['sm']
              },
            ]}
  />
  }


  // return page content
  return (
    <Dashboard content={
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>College Details</Breadcrumb.Item>
          <Breadcrumb.Item>Similar Colleges</Breadcrumb.Item>
        </Breadcrumb>
          <Title level={5}>Similar Colleges Details</Title>
         {pageContent()}
      </Fragment>
   } />
  );
};

// mapping states to props to pass it to the component
const mapStateToProps = (state) => {
    return {
        loading: state.loader.loading,
        colleges: state.similarColleges.colleges,
    };
    
  };
  
// connecting mapStateToProps and action to the component
  export default connect(mapStateToProps, { similarColleges })(
    SimilarColleges
  );
  
