import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { collegeDetailsById } from "../../action/collegeDetails";
import { collegeDetailsByName } from "../../action/collegeDetails";
import { setDashboardIndex } from "../../action/dashboard";
import { setAlert, removeAlert } from "../../action/alert";
import { Input, Space, Breadcrumb, Descriptions, Typography, Result, List,Tooltip  } from 'antd';
import store from "../../store";
import Loader from '../layouts/Loader'
import Dashboard from "../layouts/dashboard";

const { Title } = Typography;
const { Search } = Input;

// CollegeDetails Page Content
const CollegeDetails = (props) => {

    // local states 
    const [nameInput, setNameInput] = useState("");
    const [haveSearched, setHaveSearched] = useState(false);
    const [idInput, setIdInput] = useState("");
    
    useEffect(() => {
        store.dispatch(setDashboardIndex("3"));
      }, []);

    function pageContent() {
        // if loading is true, show loader
        if (props.loading) {
          return <div>
              <Loader/>
          </div>;
        }
        // Page content
        return <Fragment>
            <Title level={4}>College Details     
             {idInput==""?"":"of College ID : "+idInput} {nameInput==""?"":"of College Name : "+nameInput}
             </Title>
            <Space direction="vertical">

                <Tooltip
                    title="Find By College ID"
                    placement="topRight"
                    overlayClassName="numeric-input"
                >
                    {/* Search component to take input of college id from the user */}
                    <Search
                        placeholder="Find By College ID"
                        allowClear
                        enterButton="Show Details"
                        size="medium"
                        onSearch={onSearchById}
                    />
                </Tooltip>

                <Tooltip
                    title="Find By College Name"
                    placement="bottomRight"
                    overlayClassName="numeric-input"
                >
                    
                    {/* Search component to take input of college name from the user */}
                    <Search
                        placeholder="Find By College Name"
                        allowClear
                        enterButton="Show Details"
                        size="medium"
                        onSearch={onSearchByName}
                    />
                </Tooltip>
            </Space>

        {/* if user has not made a query through search input yet after page load , show way to guide him*/}
        
        {haveSearched?<Fragment></Fragment>:<Title level={5}style={{ marginTop: '10vh'}}>Enter the college id (for example : 61139f54fc13ae2b8a00007c) or name (for example : College5) to see details</Title>}
        
        

        {/* if user has made a query through search input yet after page load and no details found at the server, show 404 message*/}
        
        {haveSearched && props.id==null ? <Result status="404" title="404" subTitle="College not found" /> :<Fragment></Fragment>}

        

        {/* if user has made a query through search input yet after page load and details fetched successfully from the server, show details*/}
        
        {haveSearched && props.id!=null ?
            <Descriptions title="College Info" style={{ marginTop: '5vh'}} layout="vertical" bordered >
                <Descriptions.Item label="Name" span={2}>{props.name}</Descriptions.Item>
                <Descriptions.Item label="ID">{props.id}</Descriptions.Item>
                <Descriptions.Item label="City">{props.city}</Descriptions.Item>
                <Descriptions.Item label="State">{props.state}</Descriptions.Item>
                <Descriptions.Item label="Country">{props.country}</Descriptions.Item>
                <Descriptions.Item label="Date of Foundation" span={2}>
                {props.year_founded}
                </Descriptions.Item>
                <Descriptions.Item label="No. of Students">{props.no_of_students}</Descriptions.Item>
                <Descriptions.Item label="Courses Offered">
                <ul style={{display: "inlineBlock", textAlign: "left" }}>
                    {props.courses.map(course=>{
                        return <li key={course}>{course}</li>
                    })}
                </ul>
                </Descriptions.Item>
                
                <Descriptions.Item label="Check Other Details" > 
                <List.Item actions={[<a href={"/similar/?id="+props.id}>Show Similar Colleges</a>,<a href={"/students/?id="+props.id}>Show Students List</a>]}>

                </List.Item>
            </Descriptions.Item>
            </Descriptions>
            :
            <Fragment></Fragment>
        }
    </Fragment>
    }

    //  function to dispatch removeAlert action
    function hideAlert(){
        store.dispatch(removeAlert());
    }

    //  function to search college details through id
    function onSearchById(value){
        // if field empty show error alert
        if(value===""){
            store.dispatch(setAlert("Invalid Action","Please Enter ID first" ,"error"));
            setTimeout(hideAlert, 3000);
            return;
        }
        // if not empty, dispatch action to fetch details from the server
        setNameInput("");
        setIdInput(value);
        setHaveSearched(true);
        store.dispatch(collegeDetailsById({id:value}));
    };

    
    //  function to search college details through id
    function onSearchByName(value){
        // if field empty show error alert
        if(value===""){
            store.dispatch(setAlert("Invalid Action","Please Enter Name first" ,"error"));
            setTimeout(hideAlert, 3000);
            return;
        }
        
        // if not empty, dispatch action to fetch details from the server
        setIdInput("");
        setNameInput(value);
        setHaveSearched(true);
        store.dispatch(collegeDetailsByName({name :value}));
    };

    // return page content
  return (
    <Dashboard content={
       <Fragment> 
           <Breadcrumb>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>College Details</Breadcrumb.Item>
          </Breadcrumb> 
           {pageContent()} 
        </Fragment>
    } />
  );
};

// mapping states to props to pass it to the component
const mapStateToProps = (state) => {
    return {
        loading: state.loader.loading,
        id: state.collegeDetails.id,
        name: state.collegeDetails.name,
        year_founded: state.collegeDetails.year_founded,
        city: state.collegeDetails.city,
        state: state.collegeDetails.state,
        country: state.collegeDetails.country,
        no_of_students: state.collegeDetails.no_of_students,
        courses: state.collegeDetails.courses,
    };
    
  };
   
// connecting mapStateToProps and action to the component
  export default connect(mapStateToProps, { collegeDetailsById, collegeDetailsByName })(
    CollegeDetails
  );
  
