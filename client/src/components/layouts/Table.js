import React from 'react';
import { Table } from 'antd';
import { connect } from "react-redux";


// Table Component
function CustomTable(props) {  
      return <Table columns={props.columns} dataSource={props.data} bordered title={() => props.header} footer={() => props.footer}
    />;
};


// passing states as props to the component(none needed here)
const mapStateToProps = (state) => ({

});

// connecting mapStateToProps to the component
export default connect(mapStateToProps)(
    CustomTable
);