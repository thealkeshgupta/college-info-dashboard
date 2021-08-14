import React from "react";
import { connect } from "react-redux";
import { Spin} from 'antd';

// Loader Component
function Loader() {
  return (
    <div>
      <div style={{
        margin: "20px 0",
        marginBottom: "20px",
        padding: "30px 50px",
        textAlign: "center",
        borderRadius: "4px"
      }}>
        <Spin size="large" tip="Loading..."></Spin>
      </div>  
    </div>
  );
}


// passing states as props to the component
const mapStateToProps = (state) => ({
});

// connecting mapStateToProps to the component
export default connect(mapStateToProps)(
  Loader
);