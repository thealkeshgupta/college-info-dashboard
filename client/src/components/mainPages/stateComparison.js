import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateComparison } from "../../action/stateComparison";
import { setAlert, removeAlert } from "../../action/alert";
import store from "../../store";
import Loader from '../layouts/Loader'
import { Input ,Breadcrumb} from 'antd';
import PieChart from '../layouts/PieChart'
import CustomTable from '../layouts/Table'
import { setDashboardIndex } from "../../action/dashboard";
import Dashboard from "../layouts/dashboard";
import { Typography,Result,Tooltip } from 'antd';

const { Title } = Typography;
const { Search } = Input;


// StateComparison Page Content
const StateComparison = (props) => {

  // local states
    const [countryInput, setCountryInput] = useState("");
    const [haveSearched, setHaveSearched] = useState(false);

    useEffect(() => {
      store.dispatch(setDashboardIndex("4"));
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
      return <Fragment>
        <Title level={4}> State-wise Comparison {countryInput==""?"":"of : "+countryInput}</Title>
      
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
        
        {haveSearched?<Fragment></Fragment>:<Title level={5}style={{ marginTop: '10vh'}}>Enter the Country name (for example : Country2) to see state-wise distribution of colleges</Title>}
        
        
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

    //  function to search state distribution in a country by country name
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
        store.dispatch(stateComparison({country:value}));
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
                
    // if no states found, show 404 message else show table
      return props.data.length===0? <></> : <CustomTable data={data} 
      header="State Comparison Result" 
      footer={"Above are the state wise details of colleges of the country : "+countryInput}
      columns= {[
          {
            title:"State Detail",
            dataIndex: 'info',
            align: 'center',
            render: text =><a href={"/courses/?country="+countryInput+"&course="+text}>{text}</a>,
            responsive: ['xs']
          },
          {
            title: 'State Name',
            dataIndex: 'type',
            align: 'center',
            responsive: ['sm']
          },
          {
            title: 'No. of Colleges',
            dataIndex: 'value',
            align: 'center',
            responsive: ['md']
          },
          {
            title: 'Check Details',
            dataIndex: 'link',
            render: text => <a href={"/states/?country="+countryInput+"&state="+text}>{"Explore"}</a>,
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
              <Breadcrumb.Item>State Comparison</Breadcrumb.Item>
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
        data : state.stateComparison.statesData
    };
    
  };
  
// connecting mapStateToProps and action to the component
  export default connect(mapStateToProps, { stateComparison })(
    StateComparison
  );
  