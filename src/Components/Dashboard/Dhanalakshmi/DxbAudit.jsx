import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chart from '../../Chart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import helperService from '../../../Service/helper.service';
import VerticalToggleButtons from '../../common/ToggleChartAndTrend';
import UserService from '../../../Service/user.service';
import { Grid, Typography } from '@mui/material';
import AuditCard from '../../TrendCards/DxbOverallAuditCard';
import { useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';

const Dxbaudit = ({ bank, state }) => {
    const chartRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [dateval, setDateval] = useState('');
    const currentDate = dayjs();
    const tenDaysAgo = currentDate.subtract(20, 'day').format('YYYY-MM-DD');
    const [graphDate, setGraphDate] = useState({
        from: tenDaysAgo,
        to: currentDate.format('YYYY-MM-DD'),
    });
    const [summaryDropDown, setSummaryDropDown] = useState(10);
    const [summaryDropDownType, setSummaryDropDownType] = useState('');
    let option = [];
    const [graphdata, setGraphdata] = useState([]);
    const [showNoPreviewAlert, setShowNoPreviewAlert] = useState(false);
    const selectOnChange = (value) => {
        setSummaryDropDownType(value.type);
        setSummaryDropDown(value.value);
    };

    const handleFromDateOnChange = (e) => {
        setGraphDate({
            from: e.format('YYYY-MM-DD'),
            to: e.format('YYYY-MM-DD'),
        });
    };

    const [toggleTN, setToggleTN] = useState('trend');

    const toggleOnChange = (value) => {
        setToggleTN(value);
    };
    let Audited = null;
    let Callsdialed = null;
    let Onhold = null;
    let Rejected = null;
    let auditoption = null;

    useEffect(() => {
        if (showGraph && chartRef.current) {
            chartRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showGraph]);
    useEffect(() => {
        setShowNoPreviewAlert(false);
        setOpen(false);
        UserService.getauditData(graphDate.from, graphDate.to, bank, state)
            .then((res) => {
                if (!res || !res.data) {
                    setOpen(true);
                    setShowGraph(false);
                }
                const dataset = res?.data[0]?.data;
                const parsedDates = dataset.map(
                    (obj) => new Date(obj.date.split('/').reverse().join('-'))
                );

                let latestDate = new Date(Math.max(...parsedDates));

                // Filter array elements matching the latest date
                const latestData = dataset.filter((obj) => {
                    const date = new Date(obj.date.split('/').reverse().join('-'));
                    return date.getTime() === latestDate.getTime();
                });
                setDateval(latestData[0]?.date);
                const data = helperService.dataNullChecker(latestData[0]);

                if (data != null) {
                    setShowGraph(true);
                    setGraphdata(latestData);
                } else {
                    setShowNoPreviewAlert(true);
                    setOpen(false);
                    setShowGraph(false);
                }
            })
            .catch((err) => console.log(err));
    }, [graphDate]);

    Audited = graphdata[0]?.audit?.audited?.day;
    Callsdialed = graphdata[0]?.audit?.callsdialed?.day;
    Onhold = graphdata[0]?.audit?.onhold?.day;
    Rejected = graphdata[0]?.audit?.rejected?.day;
    auditoption = {
        color: ['#B31B1B', '#f7a624', '#909ba0'],
        tooltip: {
            trigger: 'item',
            formatter:
                '{a} <br/><hr></hr> Calls dialed : ' +
                Callsdialed +
                '<br/>{b} : {c}',
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Audited', 'Rejected', 'On hold'],
        },
        graphic: {
            type: 'circle',
            shape: { r: 90 },
            left: 'center',
            top: 'center',
            keyframeAnimation: [
                {
                    duration: 3000,
                    loop: true,
                    color: '#D73021',
                    keyframes: [
                        {
                            percent: 0,
                            easing: 'sinusoidalInOut',
                            scaleX: 0.1,
                            scaleY: 0.1,
                        },
                        {
                            percent: 0.9,
                            easing: 'sinusoidalInOut',
                            scaleX: 0.98,
                            scaleY: 0.98,
                            color: '#D73021',
                        },
                    ],
                },
            ],
        },
        series: [
            {
                name: dateval,
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'false',
                minShowLabelAngle: 1,
                stillShowZeroSum: false,
                animationDuration: 3000,
                labelLine: {
                    show: true,
                    length: 5,
                },
                labelLayout: {
                    verticalAlign: 'middle',
                    draggable: true,
                },
                data: [
                    { value: Audited, name: 'Audited' },
                    { value: Onhold, name: 'On hold' },
                    { value: Rejected, name: 'Rejected' },
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

    return (
        <>
            <Accordion elevation={10} defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Tamil Nadu</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12} md={3}>
                        {toggleTN === 'chart' ? (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Select Date"
                                    format="DD/MM/YYYY"
                                    maxDate={dayjs()}
                                    onChange={handleFromDateOnChange}
                                    slotProps={{
                                        textField: {
                                            variant: 'outlined',
                                            size: 'small',
                                            sx: {
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 50,
                                                    backgroundColor: '#FFF',
                                                    '& fieldset': {
                                                        borderColor: 'none',
                                                    },
                                                },
                                                margin: '15px 0 0 0',
                                                width: '170px',
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        ) : (
                            <></>
                        )}

                        <VerticalToggleButtons
                            view={toggleTN}
                            toggleOnChange={toggleOnChange}
                        />
                    </Grid>
                    {toggleTN === 'chart' && showGraph && (
                        <div ref={chartRef}>
                            <Chart option={auditoption} />
                        </div>
                    )}

                    {toggleTN === 'trend' && <AuditCard />}
                    {toggleTN === 'chart' && open && (
                        <Alert sx={{ margin: '20px 10px' }} severity="error">
                            NO DATA AVAILABLE FOR THE DAY{' '}
                            {graphDate.from.split('-').reverse().join('/') || ''}
                        </Alert>
                    )}
                    {toggleTN === 'chart' && showNoPreviewAlert && (
                        <Alert sx={{ margin: '20px 10px' }} severity="warning">
                            NO CALLS DIALED FOR THE DAY{' '}
                            {dateval.split('-').reverse().join('/') || ''}
                        </Alert>
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Dxbaudit;
