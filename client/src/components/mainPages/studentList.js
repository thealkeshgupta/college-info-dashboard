import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { studentList } from "../../action/studentList";
import store from "../../store";
import { Modal, Typography,Result,Breadcrumb  } from 'antd';
import {useLocation} from "react-router-dom";
import CustomTable from '../layouts/Table'
import Loader from '../layouts/Loader'
import { setDashboardIndex } from "../../action/dashboard";
import Dashboard from "../layouts/dashboard";

const { Title } = Typography;


// StudentList Page Content
const StudentList = (props) => {
    
  // getting query paramete from the url
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    useEffect(() => {
      store.dispatch(setDashboardIndex("3"));
      store.dispatch(studentList(id));
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
    return <Fragment>
        <Title level={5}>List of Students with College ID : {id}</Title>
        {showTable()}
      </Fragment>
  }

  
// function to call model component for showing student info
  function studentInfo(student) {
    Modal.info({
      title: 'Student Detail',
      content: (
        <div>
            <p>Student ID : {student._id}</p>
            <p>Name : {student.name}</p>
            <p>Batch of : {student.year_of_batch}</p>
            <p>Skills :</p>
            <ul>
                {student.skills.map(skill=>{
                    return <li key={skill}>{skill}</li>
                })}
            </ul>
        </div>
      ),
      onOk() {},
    });
  }

// function to display table component
  function showTable() {
    const data=[];

    // preparing table data
    props.students.map(student=>{
        data.push({
          info:student,
          name:student.name,
          batch:student.year_of_batch,
          details:student,
        })
    }) 
    
    // if no students found, show 404 message else show table
    return props.students.length===0? <Result status="404" title="404" subTitle="No students found" /> : <CustomTable data={data} 
    header={"Students list in college of id : "+id} 
    footer={"Above is the list of students in college of id : "+id}
    columns= {[
              {
                title:"Student Detail",
                dataIndex: 'info',
                align: 'center',
                render: text =><a onClick={() => studentInfo(text)} key="list-loadmore-edit">{text.name}</a>,
                responsive: ['xs']
              },
              {
                title: 'Student Name',
                dataIndex: 'name',
                align: 'center',
                responsive: ['sm']
              },
              {
                title: 'Batch',
                dataIndex: 'batch',
                align: 'center',
                responsive: ['md']
              },
              {
                title: 'Show Details',
                dataIndex: 'details',
                render: text =><a onClick={() => studentInfo(text)} key="list-loadmore-edit">{text.name}</a>,
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
          <Breadcrumb.Item>Students List</Breadcrumb.Item>
        </Breadcrumb>
        {pageContent()}
      </Fragment>
   } />
  )
};

// mapping states to props to pass it to the component
const mapStateToProps = (state) => {
    return {
        loading: state.loader.loading,
        students: state.studentList.students,
    };
    
  };
  
// connecting mapStateToProps and action to the component
  export default connect(mapStateToProps, { studentList })(
    StudentList
  );
  
  