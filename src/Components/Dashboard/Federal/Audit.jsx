import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chart from '../../Chart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Typography } from '@mui/material';
import helperService from '../../../Service/helper.service';
import dayjs from 'dayjs';
import VerticalToggleButtons from '../../common/ToggleChartAndTrend';
import UserService from '../../../Service/user.service';
import AuditCard from '../../TrendCards/FedOverallAuditCard';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Alert from '@mui/material/Alert';

const Audit = ({ bank, state }) => {
    const chartRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [showNoPreviewAlert, setShowNoPreviewAlert] = useState(false);
    let latstDate = '';
    let Audited = null;
    let Callsdialed = null;
    let Onhold = null;
    let Rejected = null;
    let dateval = null;
    let auditoption = null;
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

    const [graphdata1, setGraphdata1] = useState([]);
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

    const [toggleTN, setToggleTN] = useState('trend'); //chart & trend

    const toggleOnChange = (value) => {
        setToggleTN(value);
    };
    useEffect(() => {
        if (showGraph && chartRef.current) {
            chartRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showGraph]);
    useEffect(() => {
        let response1 = null,
            response2 = null;
        setShowNoPreviewAlert(false);
        setOpen(false);
        const fetchData = async () => {
            try {
                response1 = await UserService.getauditData(
                    graphDate.from,
                    graphDate.to,
                    bank,
                    'karnataka'
                );
                response2 = await UserService.getauditData(
                    graphDate.from,
                    graphDate.to,
                    bank,
                    'maharashtra'
                );

                if (
                    !response1 ||
                    !response2 ||
                    !response1?.data ||
                    !response2?.data
                ) {
                    latstDate = new Date(graphDate.to);
                    setOpen(true);
                    setShowGraph(false);
                    return;
                }
                // Parse and compare dates
            } catch (err) {
                console.log(err);
            }
        };
        fetchData()
            .then((res) => {
                const dataset1 = response1?.data[0]?.data;
                const dataset2 = response2?.data[0]?.data;

                const parsedDates1 = dataset1.map(
                    (obj) => new Date(obj.date.split('/').reverse().join('-'))
                );
                const parsedDates2 = dataset2.map(
                    (obj) => new Date(obj.date.split('/').reverse().join('-'))
                );

                let latestDate = null;

                for (
                    let i = 0;
                    i <
                    (parsedDates1.length > parsedDates2.length
                        ? parsedDates1.length
                        : parsedDates2.length);
                    i++
                ) {
                    if (
                        new Date(Math.max(...parsedDates1)).toLocaleDateString() !=
                        new Date(Math.max(...parsedDates2)).toLocaleDateString()
                    ) {
                        if (
                            new Date(
                                Math.max(...parsedDates1)
                            ).toLocaleDateString() >
                            new Date(Math.max(...parsedDates2)).toLocaleDateString()
                        ) {
                            parsedDates1.splice(
                                parsedDates1.indexOf(
                                    new Date(Math.max(...parsedDates1))
                                )
                            );
                        } else
                            parsedDates2.splice(
                                parsedDates2.indexOf(
                                    new Date(Math.max(...parsedDates2))
                                )
                            );
                    } else {
                        latestDate = new Date(Math.max(...parsedDates2));
                        latstDate = latestDate;
                    }
                }

                // Filter array elements matching the latest date
                const latestData1 = dataset1.filter((obj) => {
                    const date = new Date(obj.date.split('/').reverse().join('-'));
                    return date.getTime() === latestDate.getTime();
                });

                const latestData2 = dataset2.filter((obj) => {
                    const date = new Date(obj.date.split('/').reverse().join('-'));
                    return date.getTime() === latestDate.getTime();
                });

                const data1 = helperService.dataNullChecker(latestData1[0]);
                const data2 = helperService.dataNullChecker(latestData2[0]);

                if (data1 != null || data2 != null) {
                    setGraphdata(latestData1);
                    setGraphdata1(latestData2);
                    setShowGraph(true);
                } else {
                    latstDate = new Date(graphDate.to);
                    setShowNoPreviewAlert(true);
                    setOpen(false);
                    setShowGraph(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [graphDate]);
    Audited = graphdata[0]
        ? Number(graphdata[0]?.audit?.audited?.day) +
          Number(graphdata1[0]?.audit?.audited?.day)
        : 'NA';
    Callsdialed = graphdata[0]
        ? Number(graphdata[0]?.audit?.callsdialed?.day) +
          Number(graphdata1[0]?.audit?.callsdialed?.day)
        : 'NA';
    Onhold = graphdata[0]
        ? Number(graphdata[0]?.audit?.onhold?.day) +
          Number(graphdata1[0]?.audit?.onhold?.day)
        : 'NA';
    Rejected = graphdata[0]
        ? Number(graphdata[0]?.audit?.rejected?.day) +
          Number(graphdata1[0]?.audit?.rejected?.day)
        : 'NA';
    dateval = graphdata[0] ? graphdata[0]?.date : 'NA';
    latstDate = latstDate ? latstDate : new Date(graphDate.to);
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
                    verticalAlign: 'top',
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

    function Handledefaultdisplaydate() {
        let a = helperService.getSplitdate(dateval, 'DD/MM/YYYY');
        let d = Number(a.day);
        if (d <= 12) {
            dateval = dayjs(dateval).format('DD/MM/YYYY');
        }
        console.log(dateval, 'this');
        return dateval;
    }

    const getInvalidDate = () => {
        let modifiedDate =
            latstDate &&
            helperService.getSplitdate(
                new Date(latstDate).toLocaleDateString('en'),
                'MM/DD/YYYY'
            );
        modifiedDate = `${modifiedDate.day}/${modifiedDate.month}/${modifiedDate.year}`;
        return modifiedDate;
    };

    return (
        <>
            <Accordion elevation={10} defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Overall</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid item xs={12} md={3}>
                        {toggleTN === 'chart' ? (
                            <>
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
                            </>
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
                            NO DATA AVAILABLE FOR THE DAY {getInvalidDate() || ''}
                        </Alert>
                    )}
                    {toggleTN === 'chart' && showNoPreviewAlert && (
                        <Alert sx={{ margin: '20px 10px' }} severity="warning">
                            NO CALLS DIALED FOR THE DAY {getInvalidDate() || ''}
                        </Alert>
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default Audit;
