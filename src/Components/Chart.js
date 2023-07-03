import React from 'react';
import ReactEcharts from 'echarts-for-react';

function Chart(props) {
    return (
        <div>
            <ReactEcharts option={props.option} />
        </div>
    );
}
export default Chart;
