import React from 'react';
import { Pie } from '@ant-design/charts';
import { connect } from "react-redux";

// Piechart component
function PieChart(props) {

    var data = props.data;

    // configuring the piechart
      var config = {
        appendPadding: 10,
        data: data,        
        title:{
            visible:true,
            text:"Pie Chart"
        },
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,

        label: {
          type: 'outer',
          content: '{name} {percentage}',
        },
        interactions: [{},{ type: 'pie-legend-active' }, { type: 'element-active' }],
      };
      
      return <Pie {...config} />;
};


// passing states as props to the component(none needed here)
const mapStateToProps = (state) => ({

});


// connecting mapStateToProps to the component
export default connect(mapStateToProps)(
    PieChart
);