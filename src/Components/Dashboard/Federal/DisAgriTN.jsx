import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Typography } from '@mui/material';
import helperService from '../../../Service/helper.service';
import UserService from '../../../Service/user.service';
import Graphoption from '../../Graphoption/graphoption';
import VerticalToggleButtons from '../../common/ToggleChartAndTrend';
import CustomDatePicker from '../../CustomSelectDate';
import AgriDisbursementCard from '../../TrendCards/AgriDisbursementCard';
//import { useSnackbar } from "notistack";
import Snackbar from '../../Snackbar/Snackbar';

const FedDisAgriTN = ({ data, bank, state, product, type }) => {
    let option = [];
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
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [graphdata, setGraphdata] = useState([]);

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
    const [summaryDropDownType, setSummaryDropDownType] = useState('day');

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

    const [toggleTN, setToggleTN] = useState('trend'); //chart & trend

    const toggleOnChange = (value) => {
        setToggleTN(value);
    };
    useEffect(() => {
        UserService.getdisbursementData(
            graphDate.from,
            graphDate.to,
            bank,
            state,
            product
        )
            .then((res) => {
                if (!res.data && count > 0) {
                    // enqueueSnackbar("No data available, Please choose an another date", {
                    //   variant: "error",
                    // });
                    setOpen(true);
                }
                option = [];
                if (summaryDropDownType === 'day') {
                    res.data[0]?.data.forEach((item) => {
                        option.push({
                            date: item?.date,
                            Sourced: item?.disbursment?.prospectsourced.day
                                ? parseFloat(item?.disbursment?.prospectsourced.day)
                                : 0,
                            Disbursed: item?.disbursment?.disbursed?.day
                                ? parseFloat(item?.disbursment?.disbursed?.day)
                                : 0,
                            DisbursedAmount: item?.disbursment?.disbursedamount.day
                                ? parseFloat(item?.disbursment?.disbursedamount.day)
                                : 0,
                        });
                    });
                    const resp = option;

                    let arr = [];
                    arr = resp.map((item, index) => {
                        let dummy = new Date(
                            item.date.split('/').reverse().join('-')
                        );
                        delete item.date;
                        item.date = dummy;
                        return item;
                    });

                    arr.sort((a, b) => a.date - b.date);
                    let newArr = arr.map((item, index) => {
                        let dummy = new Date(item.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                        });
                        delete item.date;
                        //item.date = dummy;
                        let newItem = { date: dummy, ...item };
                        return newItem;
                    });
                    setCount((prev) => prev + 1);
                    setGraphdata(newArr);
                } else if (summaryDropDownType === 'month') {
                    const lastDates = res.data[0]?.data.reduce((acc, obj) => {
                        const [day, month, year] = obj.date.split('/');
                        const key = `${year}-${month}`;

                        if (
                            !acc[key] ||
                            parseInt(day, 10) > parseInt(acc[key].split('/')[0], 10)
                        ) {
                            acc[key] = obj.date;
                        }

                        return acc;
                    }, {});

                    const result = Object.values(lastDates);
                    const matchingData = res.data[0]?.data.filter((item) => {
                        return result.includes(item.date);
                    });
                    const resp = matchingData;

                    let arr = [];
                    arr = resp.map((item, index) => {
                        let dummy = new Date(
                            item.date.split('/').reverse().join('-')
                        );
                        delete item.date;
                        item.date = dummy;
                        return item;
                    });

                    arr.sort((a, b) => a.date - b.date);
                    let newArr = arr.map((item, index) => {
                        let dummy = new Date(item.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                        });
                        delete item.date;
                        //item.date = dummy;
                        let newItem = { date: dummy, ...item };
                        return newItem;
                    });
                    const formattedMatchingData = newArr.map((item) => {
                        const dateParts = item.date.split('/');
                        const day = parseInt(dateParts[0], 10);
                        const month = parseInt(dateParts[1], 10);
                        const year = parseInt(dateParts[2], 10);

                        const formattedDate = new Date(
                            year,
                            month - 1,
                            day
                        ).toLocaleString('en-US', {
                            month: 'short',
                            year: '2-digit',
                        });

                        return {
                            ...item,
                            formattedDate,
                        };
                    });
                    console.log(formattedMatchingData);
                    formattedMatchingData.forEach((item) => {
                        option.push({
                            date: item?.formattedDate,
                            Sourced: item?.disbursment?.prospectsourced.total
                                ? parseFloat(
                                      item?.disbursment?.prospectsourced.total
                                  )
                                : 0,
                            Disbursed: item?.disbursment?.disbursed?.total
                                ? parseFloat(item?.disbursment?.disbursed?.total)
                                : 0,
                            DisbursedAmount: item?.disbursment?.disbursedamount.total
                                ? parseFloat(
                                      item?.disbursment?.disbursedamount.total
                                  )
                                : 0,
                        });
                    });
                    console.log('option', option);
                    setGraphdata(option);
                }
            })
            .catch((err) => console.log(err));
    }, [summaryDropDown, graphDate]);
    return (
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
                                    toggleTN === 'chart' ? 'inline-block' : 'none',
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
                        graphtype={['bar', 'line']}
                        type="disbursment"
                        chartName="Federal_AGRI_Disb_Tamilnadu"
                        graphKeys={[
                            'date',
                            'Sourced',
                            'Disbursed',
                            'DisbursedAmount',
                        ]}
                    />
                )}
                {toggleTN === 'trend' && <AgriDisbursementCard />}
                <Snackbar open={open} setOpen={setOpen} />
            </AccordionDetails>
        </Accordion>
    );
};

export default FedDisAgriTN;
