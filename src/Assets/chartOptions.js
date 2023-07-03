const colors = ['#ff667f', '#909ba0'];

export const collectionOption = {
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
        // valueFormatter: (category) => 'Day' + category,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
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
            },
            magicType: {
                type: ['line', 'bar', 'pie'],
            },
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        name: 'Last 30 Days',
        nameLocation: 'center',
        // formatter: (value) => `Day ${value}`
        nameGap: 55,
        axisLabel: {
            rotate: 35,
        },
    },
    yAxis: {
        type: 'value',
        name: 'Customers count',
        nameLocation: 'middle',
        nameRotate: 90,
        left: 0,
        nameGap: 50,
    },
    dataZoom: {
        type: 'inside',
        disabled: false,
    },
    dataset: {
        dimensions: ['day', 'Collection triggered', 'Pending Collection'],
        source: [
            {
                day: '23-04-23',
                'Collection triggered': 150,
                'Pending Collection': 100,
            },
            {
                day: '24-04-23',
                'Collection triggered': 250,
                'Pending Collection': 150,
            },
            {
                day: '25-04-23',
                'Collection triggered': 100,
                'Pending Collection': 50,
            },
            {
                day: '26-04-23',
                'Collection triggered': 200,
                'Pending Collection': 100,
            },
            {
                day: '27-04-23',
                'Collection triggered': 450,
                'Pending Collection': 400,
            },
            {
                day: '28-04-23',
                'Collection triggered': 350,
                'Pending Collection': 250,
            },
            {
                day: '29-04-23',
                'Collection triggered': 100,
                'Pending Collection': 50,
            },
            {
                day: '30-04-23',
                'Collection triggered': 200,
                'Pending Collection': 100,
            },
            {
                day: '01-05-23',
                'Collection triggered': 450,
                'Pending Collection': 400,
            },
            {
                day: '02-05-23',
                'Collection triggered': 400,
                'Pending Collection': 200,
            },
            {
                day: '03-05-23',
                'Collection triggered': 150,
                'Pending Collection': 100,
            },
            {
                day: '04-05-23',
                'Collection triggered': 450,
                'Pending Collection': 250,
            },
            {
                day: '05-05-23',
                'Collection triggered': 200,
                'Pending Collection': 150,
            },
            {
                day: '06-05-23',
                'Collection triggered': 300,
                'Pending Collection': 100,
            },
            {
                day: '07-05-23',
                'Collection triggered': 450,
                'Pending Collection': 200,
            },
            {
                day: '08-05-23',
                'Collection triggered': 350,
                'Pending Collection': 250,
            },
            {
                day: '09-05-23',
                'Collection triggered': 100,
                'Pending Collection': 150,
            },
            {
                day: '10-05-23',
                'Collection triggered': 400,
                'Pending Collection': 100,
            },
            {
                day: '11-05-23',
                'Collection triggered': 550,
                'Pending Collection': 200,
            },
            {
                day: '12-05-23',
                'Collection triggered': 450,
                'Pending Collection': 150,
            },
            {
                day: '13-05-23',
                'Collection triggered': 100,
                'Pending Collection': 100,
            },
            {
                day: '14-05-23',
                'Collection triggered': 300,
                'Pending Collection': 200,
            },
            {
                day: '15-05-23',
                'Collection triggered': 350,
                'Pending Collection': 160,
            },
            {
                day: '16-05-23',
                'Collection triggered': 450,
                'Pending Collection': 350,
            },
            {
                day: '17-05-23',
                'Collection triggered': 200,
                'Pending Collection': 90,
            },
            {
                day: '18-05-23',
                'Collection triggered': 200,
                'Pending Collection': 100,
            },
            {
                day: '19-05-23',
                'Collection triggered': 650,
                'Pending Collection': 400,
            },
            {
                day: '20-05-23',
                'Collection triggered': 650,
                'Pending Collection': 150,
            },
            {
                day: '21-05-23',
                'Collection triggered': 110,
                'Pending Collection': 50,
            },
            {
                day: '22-05-23',
                'Collection triggered': 400,
                'Pending Collection': 70,
            },
            {
                day: '23-05-23',
                'Collection triggered': 100,
                'Pending Collection': 70,
            },
        ],
    },
    series: [
        {
            type: 'bar',
            smooth: true,
        },
        {
            type: 'bar',
            smooth: true,
        },
    ],
};

export const option1 = {
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
        // valueFormatter: (category) => 'Day' + category,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
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
            },
            magicType: {
                type: ['line', 'bar', 'pie'],
            },
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        name: 'Last 30 Days',
        nameLocation: 'center',
        // formatter: (value) => `Day ${value}`
        nameGap: 55,
        axisLabel: {
            rotate: 35,
        },
    },
    yAxis: {
        type: 'value',
        name: 'Customers count',
        nameLocation: 'middle',
        nameRotate: 90,
        left: 0,
        nameGap: 50,
    },
    dataZoom: {
        type: 'inside',
        disabled: false,
    },
    dataset: {
        dimensions: ['day', 'Demand', 'Collected'],
        source: [
            { day: '23-04-23', Demand: 350, Collected: 200 },
            { day: '24-04-23', Demand: 550, Collected: 350 },
            { day: '25-04-23', Demand: 500, Collected: 550 },
            { day: '26-04-23', Demand: 600, Collected: 500 },
            { day: '27-04-23', Demand: 650, Collected: 600 },
            { day: '28-04-23', Demand: 450, Collected: 650 },
            { day: '29-04-23', Demand: 300, Collected: 450 },
            { day: '30-04-23', Demand: 200, Collected: 300 },
            { day: '1-05-23', Demand: 300, Collected: 200 },
            { day: '2-05-23', Demand: 400, Collected: 300 },
            { day: '3-05-23', Demand: 550, Collected: 400 },
            { day: '4-05-23', Demand: 650, Collected: 550 },
            { day: '5-05-23', Demand: 500, Collected: 650 },
            { day: '6-05-23', Demand: 500, Collected: 500 },
            { day: '7-05-23', Demand: 450, Collected: 500 },
            { day: '8-05-23', Demand: 350, Collected: 450 },
            { day: '9-05-23', Demand: 200, Collected: 350 },
            { day: '10-05-23', Demand: 100, Collected: 200 },
            { day: '11-05-23', Demand: 350, Collected: 100 },
            { day: '12-05-23', Demand: 450, Collected: 350 },
            { day: '13-05-23', Demand: 500, Collected: 450 },
            { day: '14-05-23', Demand: 600, Collected: 500 },
            { day: '15-05-23', Demand: 750, Collected: 600 },
            { day: '16-05-23', Demand: 650, Collected: 750 },
            { day: '17-05-23', Demand: 400, Collected: 650 },
            { day: '18-05-23', Demand: 300, Collected: 400 },
            { day: '19-05-23', Demand: 250, Collected: 300 },
            { day: '20-05-23', Demand: 150, Collected: 250 },
            { day: '21-05-23', Demand: 50, Collected: 350 },
            { day: '22-05-23', Demand: 200, Collected: 50 },
        ],
    },
    series: [
        {
            type: 'line',
            smooth: true,
        },
        {
            type: 'bar',
            smooth: true,
        },
    ],
};

export const option2 = {
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
        // valueFormatter: (category) => 'Day' + category,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
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
            },
            magicType: {
                type: ['line', 'bar', 'pie'],
            },
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        name: 'Last 30 Days',
        nameLocation: 'center',
        // formatter: (value) => `Day ${value}`
        nameGap: 55,
        axisLabel: {
            rotate: 35,
        },
    },
    yAxis: {
        type: 'value',
        name: 'Customers count',
        nameLocation: 'middle',
        nameRotate: 90,
        left: 0,
        nameGap: 50,
    },
    dataZoom: {
        type: 'inside',
        disabled: false,
    },
    dataset: {
        dimensions: ['day', 'Prospect Sourced', 'Disbursed'],
        source: [
            { day: '23-04-23', 'Prospect Sourced': 350, Disbursed: 200 },
            { day: '24-04-23', 'Prospect Sourced': 550, Disbursed: 350 },
            { day: '25-04-23', 'Prospect Sourced': 500, Disbursed: 550 },
            { day: '26-04-23', 'Prospect Sourced': 600, Disbursed: 500 },
            { day: '27-04-23', 'Prospect Sourced': 650, Disbursed: 600 },
            { day: '28-04-23', 'Prospect Sourced': 450, Disbursed: 650 },
            { day: '29-04-23', 'Prospect Sourced': 300, Disbursed: 450 },
            { day: '30-04-23', 'Prospect Sourced': 200, Disbursed: 300 },
            { day: '1-05-23', 'Prospect Sourced': 300, Disbursed: 200 },
            { day: '2-05-23', 'Prospect Sourced': 400, Disbursed: 300 },
            { day: '3-05-23', 'Prospect Sourced': 550, Disbursed: 400 },
            { day: '4-05-23', 'Prospect Sourced': 650, Disbursed: 550 },
            { day: '5-05-23', 'Prospect Sourced': 500, Disbursed: 650 },
            { day: '6-05-23', 'Prospect Sourced': 500, Disbursed: 500 },
            { day: '7-05-23', 'Prospect Sourced': 450, Disbursed: 500 },
            { day: '8-05-23', 'Prospect Sourced': 350, Disbursed: 450 },
            { day: '9-05-23', 'Prospect Sourced': 200, Disbursed: 350 },
            { day: '10-05-23', 'Prospect Sourced': 100, Disbursed: 200 },
            { day: '11-05-23', 'Prospect Sourced': 350, Disbursed: 100 },
            { day: '12-05-23', 'Prospect Sourced': 450, Disbursed: 350 },
            { day: '13-05-23', 'Prospect Sourced': 500, Disbursed: 450 },
            { day: '14-05-23', 'Prospect Sourced': 600, Disbursed: 500 },
            { day: '15-05-23', 'Prospect Sourced': 750, Disbursed: 600 },
            { day: '16-05-23', 'Prospect Sourced': 650, Disbursed: 750 },
            { day: '17-05-23', 'Prospect Sourced': 400, Disbursed: 650 },
            { day: '18-05-23', 'Prospect Sourced': 300, Disbursed: 400 },
            { day: '19-05-23', 'Prospect Sourced': 250, Disbursed: 300 },
            { day: '20-05-23', 'Prospect Sourced': 150, Disbursed: 250 },
            { day: '21-05-23', 'Prospect Sourced': 50, Disbursed: 350 },
            { day: '22-05-23', 'Prospect Sourced': 200, Disbursed: 50 },
            { day: '23-05-23', 'Prospect Sourced': 350, Disbursed: 200 },
        ],
    },
    series: [
        {
            type: 'line',
            smooth: true,
        },
        {
            type: 'line',
            smooth: true,
        },
    ],
};

export const option3 = {
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
        // valueFormatter: (category) => 'Day' + category,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
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
        right: '0%',
        itemSize: 15,
        feature: {
            dataZoom: {
                yAxisIndex: 'none',
            },
            dataView: {
                readOnly: false,
                contentToOption: function (opt) {
                    var axisData = opt.xAxis[0].data;
                    var series = opt.series;
                    var table =
                        '<table style="width:100%;text-align:center"><tbody><tr>' +
                        '<td>Time:</td>' +
                        '<td>' +
                        series[0].name +
                        '</td>' +
                        '<td>' +
                        series[1].name +
                        '</td>' +
                        '</tr>';
                    for (var i = 0, l = axisData.length; i < l; i++) {
                        table +=
                            '<tr>' +
                            '<td>' +
                            axisData[i] +
                            '</td>' +
                            '<td>' +
                            series[0].data[i] +
                            '</td>' +
                            '<td>' +
                            series[1].data[i] +
                            '</td>' +
                            '</tr>';
                    }
                    table += '</tbody></table>';
                    return table;
                },
            },
            magicType: {
                type: ['line', 'bar', 'pie'],
            },
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        name: 'Last 30 Days',
        nameLocation: 'center',
        // formatter: (value) => `Day ${value}`
        nameGap: 55,
        axisLabel: {
            rotate: 35,
        },
    },
    yAxis: {
        type: 'value',
        name: 'Customers count',
        nameLocation: 'middle',
        nameRotate: 90,
        left: 0,
        nameGap: 50,
    },
    dataZoom: {
        type: 'inside',
        disabled: false,
    },
    dataset: {
        dimensions: ['day', 'Prospect Sourced', 'Disbursed'],
        source: [
            { day: '23-04-23', 'Prospect Sourced': 350, Disbursed: 200 },
            { day: '24-04-23', 'Prospect Sourced': 550, Disbursed: 350 },
            { day: '25-04-23', 'Prospect Sourced': 500, Disbursed: 550 },
            { day: '26-04-23', 'Prospect Sourced': 600, Disbursed: 500 },
            { day: '27-04-23', 'Prospect Sourced': 650, Disbursed: 600 },
            { day: '28-04-23', 'Prospect Sourced': 450, Disbursed: 650 },
            { day: '29-04-23', 'Prospect Sourced': 300, Disbursed: 450 },
            { day: '30-04-23', 'Prospect Sourced': 200, Disbursed: 300 },
            { day: '1-05-23', 'Prospect Sourced': 300, Disbursed: 200 },
            { day: '2-05-23', 'Prospect Sourced': 400, Disbursed: 300 },
            { day: '3-05-23', 'Prospect Sourced': 550, Disbursed: 400 },
            { day: '4-05-23', 'Prospect Sourced': 650, Disbursed: 550 },
            { day: '5-05-23', 'Prospect Sourced': 500, Disbursed: 650 },
            { day: '6-05-23', 'Prospect Sourced': 500, Disbursed: 500 },
            { day: '7-05-23', 'Prospect Sourced': 450, Disbursed: 500 },
            { day: '8-05-23', 'Prospect Sourced': 350, Disbursed: 450 },
            { day: '9-05-23', 'Prospect Sourced': 200, Disbursed: 350 },
            { day: '10-05-23', 'Prospect Sourced': 100, Disbursed: 200 },
            { day: '11-05-23', 'Prospect Sourced': 350, Disbursed: 100 },
            { day: '12-05-23', 'Prospect Sourced': 450, Disbursed: 350 },
            { day: '13-05-23', 'Prospect Sourced': 500, Disbursed: 450 },
            { day: '14-05-23', 'Prospect Sourced': 600, Disbursed: 500 },
            { day: '15-05-23', 'Prospect Sourced': 750, Disbursed: 600 },
            { day: '16-05-23', 'Prospect Sourced': 650, Disbursed: 750 },
            { day: '17-05-23', 'Prospect Sourced': 400, Disbursed: 650 },
            { day: '18-05-23', 'Prospect Sourced': 300, Disbursed: 400 },
            { day: '19-05-23', 'Prospect Sourced': 250, Disbursed: 300 },
            { day: '20-05-23', 'Prospect Sourced': 150, Disbursed: 250 },
            { day: '21-05-23', 'Prospect Sourced': 50, Disbursed: 350 },
            { day: '22-05-23', 'Prospect Sourced': 200, Disbursed: 50 },
            { day: '23-05-23', 'Prospect Sourced': 200, Disbursed: 50 },
        ],
    },
    series: [
        {
            type: 'bar',
            smooth: true,
        },
        {
            type: 'bar',
            smooth: true,
        },
    ],
};

export const auditOption = {
    color: ['#FF667F', '#909ba0', '#f7a624'],
    title: {
        text: 'Audit details',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        bottom: 10,
        left: 'center',
        data: ['Rejected', 'Onhold', 'Audited'],
    },
    series: [
        {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
                { value: 735, name: 'Rejected' },
                { value: 510, name: 'onhold' },
                { value: 434, name: 'audited' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
};
export const option100 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
        data: ['Disbursed', 'Credit accepted', 'Prospect sourced'],
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            selectedMode: 'single',
            color: 'skyblue',
            radius: [0, '30%'],
            label: {
                position: 'inner',
                fontSize: 14,
            },
            labelLine: {
                show: false,
            },
            data: [{ value: 1548, name: 'Disbursed' }],
        },
        {
            name: 'Access From',
            type: 'pie',
            selectedMode: 'single',
            radius: ['30%', '50%'],
            label: {
                position: 'inner',
                fontSize: 14,
            },
            labelLine: {
                show: false,
            },
            data: [{ value: 1548, name: 'Credit accepted' }],
        },
        {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '80%'],
            labelLine: {
                length: 20,
            },
            label: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#F6F8FC',
                borderColor: '#8C8D8E',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                    a: {
                        color: '#6E7079',
                        lineHeight: 22,
                        align: 'center',
                    },
                    hr: {
                        borderColor: '#8C8D8E',
                        width: '100%',
                        borderWidth: 1,
                        height: 0,
                    },
                    b: {
                        color: '#4C5058',
                        fontSize: 19,
                        fontWeight: 'bold',
                        lineHeight: 33,
                    },
                    per: {
                        color: '#fff',
                        backgroundColor: '#4C5058',
                        padding: [6, 4],
                        borderRadius: 4,
                    },
                },
            },
            data: [{ value: 102, name: 'Prospect sourced' }],
        },
    ],
};

export const option200 = {
    title: {
        text: 'Stacked Line',
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    toolbox: {
        feature: {
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
    ],
};

export const option300 = {
    color: colors,
    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross',
        },
    },
    legend: {},
    grid: {
        top: 70,
        bottom: 50,
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true,
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1],
                },
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return (
                            'Precipitation  ' +
                            params.value +
                            (params.seriesData.length
                                ? '：' + params.seriesData[0].data
                                : '')
                        );
                    },
                },
            },
            // prettier-ignore
            data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'],
        },
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true,
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0],
                },
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return (
                            'Precipitation  ' +
                            params.value +
                            (params.seriesData.length
                                ? '：' + params.seriesData[0].data
                                : '')
                        );
                    },
                },
            },
            // prettier-ignore
            data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12'],
        },
    ],
    yAxis: [
        {
            type: 'value',
        },
    ],
    series: [
        {
            name: 'Precipitation(2015)',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            emphasis: {
                focus: 'series',
            },
            data: [
                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
            ],
        },
        {
            name: 'Precipitation(2016)',
            type: 'line',
            smooth: true,
            emphasis: {
                focus: 'series',
            },
            data: [
                3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7,
            ],
        },
    ],
};
