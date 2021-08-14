import React from "react";
import { connect } from "react-redux";
import { Alert } from 'antd';

// Alert Component
function CustomAlert({message, description, type}) {
  // if not blank message show alert
  if(message !== "" ){
    return (
      <div>
        <Alert
        message={message}
        description={description}
        type={type}
        showIcon
      />
      </div>
    );
  }
  return <div></div>;
  
}

// passing states as props to the component
const mapStateToProps = (state) => ({
  message: state.alert.message,
  description: state.alert.description,
  type: state.alert.type,
});

// connecting mapStateToProps to the component
export default connect(mapStateToProps)(
  CustomAlert
);

