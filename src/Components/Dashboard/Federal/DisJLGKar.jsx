import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Typography } from '@mui/material';
import VerticalToggleButtons from '../../common/ToggleChartAndTrend';
import CustomDatePicker from '../../CustomSelectDate';
import UserService from '../../../Service/user.service';
import helperService from '../../../Service/helper.service';
import Graphoption from '../../Graphoption/graphoption';
import JLGKarnatakaCard from '../../TrendCards/FedJlgKACard';
import Snackbar from '../../Snackbar/Snackbar';

const FedDisJLGKar = ({ bank, state, product }) => {
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
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
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
    const [summaryDropDownType, setSummaryDropDowntype] = useState('day');
    let option = [];
    const [graphdata, setGraphdata] = useState([]);
    const selectOnChange = (value) => {
        setSummaryDropDowntype(value.type);
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

    const [toggleKA, setToggleKA] = useState('trend');

    const toggleOnChange = (value) => {
        setToggleKA(value);
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
                if (!res.data && summaryDropDown && count > 0) {
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
                            Sourced:
                                item?.disbursment?.prospectsourced.month === '0' ||
                                item?.disbursment?.prospectsourced.month === ''
                                    ? parseFloat(
                                          item?.disbursment?.prospectsourced.total
                                      )
                                    : parseFloat(
                                          item?.disbursment?.prospectsourced.month
                                      ),
                            Disbursed:
                                item?.disbursment?.disbursed?.month === '0' ||
                                item?.disbursment?.disbursed?.month === ''
                                    ? parseFloat(item?.disbursment?.disbursed?.total)
                                    : parseFloat(
                                          item?.disbursment?.disbursed?.month
                                      ),
                            DisbursedAmount:
                                item?.disbursment?.disbursedamount.month === '0' ||
                                item?.disbursment?.disbursedamount.month === ''
                                    ? parseFloat(
                                          item?.disbursment?.disbursedamount.total
                                      )
                                    : parseFloat(
                                          item?.disbursment?.disbursedamount.month
                                      ),
                        });
                    });
                    console.log('option', option);

                    setGraphdata(option);
                }
            })
            .catch((err) => console.log(err));
    }, [summaryDropDown, graphDate]);

    return (
        <Accordion elevation={10}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Karnataka</Typography>
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
                                    toggleKA === 'chart' ? 'inline-block' : 'none',
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
                                view={toggleKA}
                                toggleOnChange={toggleOnChange}
                            />
                        </div>
                    </div>
                </Grid>
                {toggleKA === 'chart' && (
                    <Graphoption
                        option={graphdata}
                        graphtype={['bar', 'line']}
                        type="disbursment"
                        chartName="Federal_JLG_Disb_Karnataka"
                        graphKeys={[
                            'date',
                            'Sourced',
                            'Disbursed',
                            'DisbursedAmount',
                        ]}
                    />
                )}
                {toggleKA === 'trend' && <JLGKarnatakaCard />}
                <Snackbar open={open} setOpen={setOpen} />
            </AccordionDetails>
        </Accordion>
    );
};

export default FedDisJLGKar;
