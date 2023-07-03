import React, { useEffect, useState, useRef } from 'react';
import Chart from '../Chart';
import shareImage from '../../utils/shareImage';

const Graphoption = ({ option, graphtype, type, chartName, graphKeys }) => {
    console.log('option', graphKeys);
    const [newArr, setNewArr] = useState([]);

    useEffect(() => {
        option.map((item, index) => {
            if (index === 0) {
                let arr = [];
                arr = [...Object.keys(item)];

                setNewArr(arr);
            }
        });
    }, [option]);

    const domEl = useRef(null);
    const shareOnClick = (cardName) => {
        shareImage(domEl.current);
    };

    const option1 = React.useMemo(() => {
        const colors = ['#B31B1B', '#909ba0'];
        return {
            color: colors,
            legend: {
                type: 'scroll',
                orient: 'horizontal',
                itemWidth: 20,
                itemHeight: 15,
                top: 0,
                bottom: 10,
                padding: 20,
            },
            tooltip: {
                axisPointer: {
                    type: 'shadow',
                },
                formatter: (params) => {
                    if (type === 'disbursment') {
                        var x = `<div><span>${params[0]?.data?.date}</span> <hr></hr>
            <span>Sourced: ${params[0]?.data?.Sourced}</span></br>
            <span>Disbursed: ${params[0]?.data?.Disbursed}</span></br>
            <span>Disb. Amnt: ${
                params[0]?.data?.DisbursedAmount >= 10000
                    ? (params[0]?.data?.DisbursedAmount / 10000000).toFixed(2) +
                      '&nbsp;Cr'
                    : params[0]?.data?.DisbursedAmount === 0
                    ? params[0]?.data?.DisbursedAmount
                    : (params[0]?.data?.DisbursedAmount / 100000).toFixed(2) +
                      '&nbsp;Lakh'
            }</span>
          </div>`;
                        return x;
                    } else {
                        var y = `<div><span>${params[0]?.data?.date}</span> <hr></hr>
            <span>Collected: ${
                params[0]?.data?.Collected >= 10000
                    ? (params[0]?.data?.Collected / 10000000).toFixed(2) + '&nbsp;Cr'
                    : (params[0]?.data?.Collected / 100000).toFixed(2) + '&nbsp;Lakh'
            }</span></br>
            <span>Demand: ${
                params[0]?.data?.Demand >= 10000
                    ? (params[0]?.data?.Demand / 10000000).toFixed(2) + '&nbsp;Cr'
                    : (params[0]?.data?.Demand / 100000).toFixed(2) + '&nbsp;Lakh'
            }</span></br>
          </div>`;
                        return y;
                    }
                },
            },

            grid: {
                show: true,
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        color: '',
                    },
                },
            },
            toolbox: {
                show: true,
                orient: 'vertical',

                itemSize: 15,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none',
                    },
                    dataView: {
                        readOnly: false,
                        optionToContent: function (params) {
                            var table =
                                '<style>table, th, td {border: 1px solid black; border-collapse: collapse;} thead {position: sticky; top: 0px; background: #b31b1b; color: white; height: 34px;}</style><table style="width:100%;text-align:center"><thead><tr>';
                            table +=
                                params.dataset[0].dimensions
                                    .map((th, i) => {
                                        return `<th>${
                                            th.charAt(0).toUpperCase() + th.slice(1)
                                        }</th>`;
                                    })
                                    .join('') + '</tr></thead><tbody>';
                            table += params.dataset[0].source
                                .map((td, i) => {
                                    return `<tr>${Object.keys(td)
                                        .map((z, i) => {
                                            return `<td>${td[z].toLocaleString(
                                                'en-US'
                                            )}</td>`;
                                        })
                                        .join('')}</tr>`;
                                })
                                .join('');
                            table += '</tbody></table>';
                            return table;
                        },
                    },
                    magicType: {
                        type: ['line', 'bar', 'pie'],
                    },
                    restore: { show: true },
                    saveAsImage: {
                        name: chartName,
                    },
                    // shareOption: {
                    //     show: true,
                    //     title: 'Share chart',
                    //     icon: ShareIcon,
                    //     onclick: shareOnClick,
                    // },
                },
            },
            xAxis: {
                type: 'category',
                // name: "Last 30 Days",
                // nameLocation: "center",
                // formatter: (value) => `Day ${value}`
                // nameGap: 55,
                // axisLabel: {
                //   rotate: 35,
                // },
            },
            yAxis: {
                type: 'value',
                // name: "Customers count",
                // nameLocation: "middle",
                // nameGap: 80,
                // nameRotate: 90,
                // left: 0,
            },
            dataZoom: {
                type: 'inside',
                disabled: false,
            },
            dataset: {
                dimensions: graphKeys,
                source: option,
            },
            series: [
                {
                    animationDuration: 3000,
                    type: graphtype[0],
                    smooth: true,
                },
                {
                    animationDuration: 3000,
                    type: graphtype[1],
                    smooth: true,
                },
            ],
        };
    }, [newArr]);

    return (
        <div ref={domEl}>
            <Chart option={option1} />
        </div>
    );
};

export default Graphoption;
