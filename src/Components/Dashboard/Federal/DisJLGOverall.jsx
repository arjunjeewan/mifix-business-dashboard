import React, { useEffect, useState, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Typography } from '@mui/material';
import helperService from '../../../Service/helper.service';
import VerticalToggleButtons from '../../common/ToggleChartAndTrend';
import CustomDatePicker from '../../CustomSelectDate';
import UserService from '../../../Service/user.service';
import Graphoption from '../../Graphoption/graphoption';
import FederalOverallDisbursement from '../../TrendCards/FedJlgOverallDisbursement';
import Snackbar from '../../Snackbar/Snackbar';

const FedDisJLGOverall = ({ bank, product }) => {
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
    let option = [];
    const [count, setCount] = useState(0);
    const [graphdata, setGraphdata] = useState([]);
    const [updatedBy, setUpdatedBy] = useState({});
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

    const [overall, setOverall] = useState('trend');
    const toggleOnChange = (value) => {
        setOverall(value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await UserService.getdisbursementData(
                    graphDate.from,
                    graphDate.to,
                    bank,
                    'karnataka',
                    product
                );
                const response2 = await UserService.getdisbursementData(
                    graphDate.from,
                    graphDate.to,
                    bank,
                    'maharashtra',
                    product
                );
                if ((!response1.data || !response2.data) && count > 0) {
                    setOpen(true);
                }
                if (summaryDropDownType === 'day') {
                    const data1 = response1.data[0].data;
                    const data2 = response2.data[0].data;

                    const combinedData = [];
                    data1.map((item1, index1) => {
                        data2.map((item2, index2) => {
                            if (item1.date == item2.date) {
                                let perDayValue = {
                                    date: item1?.date,
                                    Sourced:
                                        item1?.disbursment?.prospectsourced.day &&
                                        item2?.disbursment?.prospectsourced.day
                                            ? parseFloat(
                                                  item1?.disbursment?.prospectsourced
                                                      .day
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.prospectsourced
                                                      .day
                                              )
                                            : 0,
                                    Disbursed:
                                        item1?.disbursment?.disbursed?.day &&
                                        item2?.disbursment?.disbursed?.day
                                            ? parseFloat(
                                                  item1?.disbursment?.disbursed?.day
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.disbursed?.day
                                              )
                                            : 0,
                                    DisbursedAmount:
                                        item1?.disbursment?.disbursedamount.day &&
                                        item2?.disbursment?.disbursedamount.day
                                            ? parseFloat(
                                                  item1?.disbursment?.disbursedamount
                                                      .day
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.disbursedamount
                                                      .day
                                              )
                                            : 0,
                                };
                                combinedData.push(perDayValue);
                            }
                        });
                    });
                    const resp = combinedData;

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
                    setUpdatedBy({
                        updatedBy: data1[data1.length - 1]?.disbursment.updatedBy,
                        updatedAt: data1[data1.length - 1]?.disbursment.updatedAt,
                    });
                } else if (summaryDropDownType === 'month') {
                    const data1 = response1.data[0].data;
                    const data2 = response2.data[0].data;
                    const combinedData = [];
                    data1.map((item1, index1) => {
                        data2.map((item2, index2) => {
                            if (item1.date == item2.date) {
                                let perDayValue = {
                                    date: item1?.date,
                                    Sourced:
                                        item1?.disbursment?.prospectsourced.month ===
                                            '0' ||
                                        item2?.disbursment?.prospectsourced.month ===
                                            '0' ||
                                        item1?.disbursment?.prospectsourced.month ===
                                            '' ||
                                        item2?.disbursment?.prospectsourced.month ===
                                            ''
                                            ? parseFloat(
                                                  item1?.disbursment?.prospectsourced
                                                      .total
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.prospectsourced
                                                      .total
                                              )
                                            : parseFloat(
                                                  item1?.disbursment?.prospectsourced
                                                      .month
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.prospectsourced
                                                      .month
                                              ),
                                    Disbursed:
                                        item1?.disbursment?.disbursed?.month ===
                                            '0' ||
                                        item2?.disbursment?.disbursed?.month ===
                                            '0' ||
                                        item1?.disbursment?.disbursed?.month ===
                                            '' ||
                                        item2?.disbursment?.disbursed?.month === ''
                                            ? parseFloat(
                                                  item1?.disbursment?.disbursed
                                                      ?.total
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.disbursed
                                                      ?.total
                                              )
                                            : parseFloat(
                                                  item1?.disbursment?.disbursed
                                                      ?.month
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.disbursed
                                                      ?.month
                                              ),
                                    DisbursedAmount:
                                        item1?.disbursment?.disbursedamount.month ===
                                            '0' ||
                                        item2?.disbursment?.disbursedamount.month ===
                                            '0' ||
                                        item1?.disbursment?.disbursedamount.month ===
                                            '' ||
                                        item2?.disbursment?.disbursedamount.month ===
                                            ''
                                            ? parseFloat(
                                                  item1?.disbursment?.disbursedamount
                                                      .total
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.disbursedamount
                                                      .total
                                              )
                                            : parseFloat(
                                                  item1?.disbursment?.disbursedamount
                                                      .month
                                              ) +
                                              parseFloat(
                                                  item2?.disbursment?.disbursedamount
                                                      .month
                                              ),
                                };
                                combinedData.push(perDayValue);
                            }
                        });
                    });
                    console.log('combined data', combinedData);
                    const lastDates = combinedData.reduce((acc, obj) => {
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
                    const matchingData = combinedData.filter((item) => {
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
                            date: formattedDate,
                            Sourced: item.Sourced,
                            Disbursed: item.Disbursed,
                            DisbursedAmount: item.DisbursedAmount,
                        };
                    });
                    setGraphdata(formattedMatchingData);
                    setUpdatedBy({
                        updatedBy: data1[data1.length - 1]?.disbursment.updatedBy,
                        updatedAt: data1[data1.length - 1]?.disbursment.updatedAt,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [summaryDropDown, graphDate]);

    return (
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
                                    overall === 'chart' ? 'inline-block' : 'none',
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
                                view={overall}
                                toggleOnChange={toggleOnChange}
                            />
                        </div>
                    </div>
                </Grid>
                {overall === 'chart' && (
                    <Graphoption
                        option={graphdata}
                        graphtype={['bar', 'line']}
                        type="disbursment"
                        chartName="Federal_JLG_Disb_Overall"
                        graphKeys={[
                            'date',
                            'Sourced',
                            'Disbursed',
                            'DisbursedAmount',
                        ]}
                    />
                )}
                {overall === 'trend' && <FederalOverallDisbursement />}
                <Snackbar open={open} setOpen={setOpen} />
            </AccordionDetails>
        </Accordion>
    );
};

export default FedDisJLGOverall;
