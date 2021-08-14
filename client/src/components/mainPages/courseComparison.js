import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { courseComparison } from "../../action/courseComparison";
import { setAlert, removeAlert } from "../../action/alert";
import store from "../../store";
import Loader from '../layouts/Loader'
import { Input, Breadcrumb,Typography,Result,Tooltip} from 'antd';
import PieChart from '../layouts/PieChart'
import CustomTable from '../layouts/Table'
import { setDashboardIndex } from "../../action/dashboard";
import Dashboard from "../layouts/dashboard";

const { Title } = Typography;
const { Search } = Input;

// CourseComparison Page Content
const CourseComparison = (props) => {

  // local states
    const [countryInput, setCountryInput] = useState("");
    const [haveSearched, setHaveSearched] = useState(false);

    useEffect(() => {
      store.dispatch(setDashboardIndex("5"));
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
        <div> Course-wise Comparison {countryInput==""?"":"of : "+countryInput}</div>
        
        <Tooltip
          title="Enter Country Name"
          placement="bottomRight"
          overlayClassName="numeric-input"
        >
        {/* Search component to take input of country name from the user */}
          <Search
            placeholder="Enter Country Name"
            allowClear
            enterButton="Show Comparison Details"
            size="medium"
            onSearch={onSearch}
          />
        </Tooltip>

         {/* if user has not made a query through search input yet after page load , show way to guide him*/}
        
        {haveSearched?<Fragment></Fragment>:<Title level={5}style={{ marginTop: '10vh'}}>Enter the Country name (for example : Country1) to see course-wise distribution of colleges</Title>}
        
        
        {/* if user has made a query through search input yet after page load and no details found at the server, show 404 message*/}
        
        {haveSearched && props.data.length===0 ? <Result status="404" title="404" subTitle="No detail found" /> :<Fragment></Fragment>}


        {/* if user has made a query through search input yet after page load and details fetched successfully from the server, show details*/}
        
        {haveSearched && props.data.length!=0 ? showTable() : (<Fragment></Fragment>)}
        {haveSearched && props.data.length!=0? <PieChart data={props.data} />: <Fragment></Fragment> }

      </Fragment>
    }

    //  function to dispatch removeAlert action
    function hideAlert(){
      store.dispatch(removeAlert());
    }

    //  function to search course distribution in a country by country name
    function onSearch(value){
      // if field empty show error alert
        if(value===""){
        store.dispatch(setAlert("Invalid Action","Please Enter Country Name first" ,"error"));
        setTimeout(hideAlert, 3000);
        return;
      }
      
        // if not empty, dispatch action to fetch details from the server
        setCountryInput(value);  
        setHaveSearched(true);
        store.dispatch(courseComparison({country:value}));
    };


  // function to display table component
    function showTable(){
      
      const data=[];

    // preparing table data
      props.data.map(item=>{
          data.push({
              info:item.type,
              key:item.type,
              type:item.type,
              value:item.value,
              link:item.type
          })
      })  
                
    // if no colleges found, show 404 message else show table
      return props.data.length===0? <Fragment></Fragment> : <CustomTable data={data} 
      header="Courses Comparison Result" 
      footer={"Above are the courses wise details of colleges of the country : "+countryInput}
      columns= {[
          {
            title:"Course Detail",
            dataIndex: 'info',
            align: 'center',
            render: text =><a href={"/courses/?country="+countryInput+"&course="+text}>{text}</a>,
            responsive: ['xs']
          },
          {
            title: 'Course Name',
            dataIndex: 'type',
            align: 'center',
            responsive: ['sm']
          },
          {
            title: 'No. of Colleges providing',
            dataIndex: 'value',
            align: 'center',
            responsive: ['md']
          },
          {
            title: 'Check Details',
            dataIndex: 'link',
            render: text => <a href={"/courses/?country="+countryInput+"&course="+text}>{"Explore"}</a>,
            align: 'center',
            responsive: ['sm']
          },
        ]}
      />
    };

  // return page content
      return (
        <Dashboard content={
          <Fragment> 
            <Breadcrumb>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>Country Specific Details</Breadcrumb.Item>
              <Breadcrumb.Item>Courses Comparison</Breadcrumb.Item>
            </Breadcrumb> 
            {pageContent()}
          </Fragment>
       } />
      )
}

// mapping states to props to pass it to the component
const mapStateToProps = (state) => {
    return {
        loading: state.loader.loading,
        data : state.courseComparison.coursesData
    };
    
  };
  
// connecting mapStateToProps and action to the component
  export default connect(mapStateToProps, { courseComparison })(
    CourseComparison
  );
  