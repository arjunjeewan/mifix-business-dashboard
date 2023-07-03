import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chart from '../../Chart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Typography } from '@mui/material';
import { option1 } from '../../../Assets/chartOptions';
import helperService from '../../../Service/helper.service';
import CustomDatePicker from '../../CustomSelectDate';
import VerticalToggleButtons from '../../common/ToggleChartAndTrend';
import UserService from '../../../Service/user.service';
import Graphoption from '../../Graphoption/graphoption';
import CollectionCard from '../../TrendCards/FedOVerallCollectionsCard';
//import { useSnackbar } from "notistack";
import Snackbar from '../../Snackbar/Snackbar';

const FedCollectionsOverall = ({ bank }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    let option = [];
    const [count, setCount] = useState(0);

    const [open, setOpen] = useState(false);
    const [graphdata, setGraphdata] = useState([]);

    const [toggleTN, setToggleTN] = useState('trend');
    const [customDate, setCustomDate] = useState({
        from: '',
        to: '',
    });
    const [graphDate, setGraphDate] = useState(
        !isSmallScreen
            ? {
                  from: helperService.last30daysDateRange()[0],
                  to: helperService.last30daysDateRange()[1],
              }
            : {
                  from: helperService.last7daysDateRange()[0],
                  to: helperService.last7daysDateRange()[1],
              }
    );
    const [summaryDropDown, setSummaryDropDown] = useState(!isSmallScreen ? 10 : 20);
    const [summaryDropDownType, setSummaryDropDownType] = useState('');

    const selectOnChange = (value) => {
        setSummaryDropDownType(value.type);
        setSummaryDropDown(value.value);
    };

    const fromDateOnChange = (value) => {
        setCustomDate({
            ...customDate,
            from: value,
        });
        setGraphDate({
            ...graphDate,
            from: value.format('YYYY-MM-DD'),
        });
    };

    const toDateOnChange = (value) => {
        setCustomDate({
            ...customDate,
            to: value,
        });
        setGraphDate({
            ...graphDate,
            to: value.format('YYYY-MM-DD'),
        });
    };

    const toggleOnChange = (value) => {
        setToggleTN(value);
    };
    useEffect(() => {
        UserService.getcollectionData(graphDate.from, graphDate.to, bank)
            .then((res) => {
                if (!res.data && count > 0) {
                    setOpen(true);
                }
                option = [];
                res.data[0]?.data.forEach((item) => {
                    option.push({
                        date: item?.date,
                        Collected: item?.collections?.amount
                            ? parseFloat(
                                  item?.collections?.amount.replaceAll(',', '')
                              )
                            : 0,
                        Demand: item?.collections?.demandamount
                            ? parseFloat(
                                  item?.collections?.demandamount.replaceAll(',', '')
                              )
                            : 0,
                    });
                });

                option.sort((a, b) => {
                    const dateA = new Date(a.date.split('/').reverse().join('-'));
                    const dateB = new Date(b.date.split('/').reverse().join('-'));
                    return dateA - dateB;
                });

                setCount((prev) => prev + 1);
                setGraphdata([...option]);
            })
            .catch((err) => console.log(err));
    }, [summaryDropDown, graphDate]);
    console.log('type', summaryDropDownType);
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
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display:
                                        toggleTN === 'chart'
                                            ? 'inline-block'
                                            : 'none',
                                }}
                            >
                                <CustomDatePicker
                                    selectOnChange={selectOnChange}
                                    selectValue={summaryDropDown}
                                    fromDateOnChange={fromDateOnChange}
                                    toDateOnChange={toDateOnChange}
                                    dateValue={customDate}
                                    setDateValue={setCustomDate}
                                    graphDate={graphDate}
                                    setGraphDate={setGraphDate}
                                />
                            </div>
                            <div>
                                <VerticalToggleButtons
                                    view={toggleTN}
                                    toggleOnChange={toggleOnChange}
                                />
                            </div>
                        </div>
                    </Grid>
                    {toggleTN === 'chart' && (
                        <Graphoption
                            option={graphdata}
                            graphtype={['bar', 'bar']}
                            type="collections"
                            chartName="Federal_Coll_Overall"
                            graphKeys={['date', 'Collected', 'Demand']}
                        />
                    )}
                    {toggleTN === 'trend' && <CollectionCard />}
                    <Snackbar open={open} setOpen={setOpen} />
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default FedCollectionsOverall;
