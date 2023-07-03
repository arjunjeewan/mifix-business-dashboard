import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import UserService from '../../Service/user.service';
import helperService from '../../Service/helper.service';
import DisbursementCard from '../common/DisbursementCard';

export default function FederalOverallDisbursement() {
    const [monthDataKarnataka, setMonthDataKarnataka] = React.useState([]);
    const [monthDataMaharashtra, setMonthDataMaharashtra] = React.useState([]);
    const [month, setMonth] = useState('');

    let previousMonthDataKA;
    let foundValueKA;
    let previousMonthDataMH;
    let foundValueMH;

    const [currentDate, setCurrentDate] = useState('');

    let previousDateKA = [];
    let previousDateMH = [];

    const [foundKA, setFoundKA] = useState('');
    const [foundMH, setFoundMH] = useState('');

    const getOverallFederalDisbursement1 = async () => {
        try {
            const res = await UserService.getdisbursementData(
                helperService.last35daysDateRange()[0],
                helperService.last35daysDateRange()[1],
                'federal',
                'karnataka',
                'jlg'
            );
            res.data[0].data.sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateA - dateB;
            });
            setMonthDataKarnataka(res?.data[0]?.data);
            setCurrentDate(res?.data[0]?.data[res?.data[0]?.data.length - 1].date);
            previousDateKA = helperService.getOneMonthAgo(
                res?.data[0]?.data[res?.data[0]?.data.length - 1].date
            );
            setMonth(
                helperService.getSpeceficMonth(
                    res?.data[0]?.data[res?.data[0]?.data.length - 1].date
                )
            );
            getOverallFederalDisbursement2();
        } catch (err) {
            console.log(err);
        }

        try {
            const res = await UserService.getdisbursementData(
                helperService.last35daysDateRange()[0],
                helperService.last35daysDateRange()[1],
                'federal',
                'maharashtra',
                'jlg'
            );
            res.data[0].data.sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateA - dateB;
            });
            setMonthDataMaharashtra(res?.data[0]?.data);
            previousDateMH = helperService.getOneMonthAgo(
                res?.data[0]?.data[res?.data[0]?.data.length - 1].date
            );
            setMonth(
                helperService.getSpeceficMonth(
                    res?.data[0]?.data[res?.data[0]?.data.length - 1].date
                )
            );
            getOverallFederalDisbursement2();
        } catch (err) {
            console.log(err);
        }
    };

    const getOverallFederalDisbursement2 = async () => {
        try {
            const response = await UserService.getdisbursementData(
                helperService.getDateBeforeAndAfter(previousDateKA[0])[0],
                helperService.getDateBeforeAndAfter(previousDateKA[0])[1],
                'federal',
                'karnataka',
                'jlg'
            );

            response.data[0].data.sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateA - dateB;
            });
            previousMonthDataKA = response?.data[0]?.data;
            for (const item of previousMonthDataKA) {
                if (item.date === previousDateKA[1]) {
                    foundValueKA = item.disbursment;
                    break;
                }
            }
            setFoundKA(foundValueKA);
        } catch (err) {
            console.log(err);
        }

        try {
            const response = await UserService.getdisbursementData(
                helperService.getDateBeforeAndAfter(previousDateMH[0])[0],
                helperService.getDateBeforeAndAfter(previousDateMH[0])[1],
                'federal',
                'maharashtra',
                'jlg'
            );

            response.data[0].data.sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateA - dateB;
            });
            previousMonthDataMH = response?.data[0]?.data;
            for (const item of previousMonthDataMH) {
                if (item.date === previousDateMH[1]) {
                    foundValueMH = item.disbursment;
                    break;
                }
            }
            setFoundMH(foundValueMH);
        } catch (err) {
            console.log(err);
        }
    };

    let lk = monthDataKarnataka.length;
    let lm = monthDataMaharashtra.length;

    let mfinalka = monthDataKarnataka[lk - 1];
    let mfinalmh = monthDataMaharashtra[lm - 1];

    let mfinalka1 = monthDataKarnataka[lk - 2];
    let mfinalmh1 = monthDataMaharashtra[lm - 2];

    let currentTrend = helperService.calculatePastTrend(
        Number(mfinalka1?.disbursment?.disbursedamount?.day) +
            Number(mfinalmh1?.disbursment?.disbursedamount?.day),
        Number(mfinalka?.disbursment?.disbursedamount?.day) +
            Number(mfinalmh?.disbursment?.disbursedamount?.day)
    );
    let trendIcon;
    let trendColor;
    if (currentTrend.substring(0, 1) === '-') {
        trendIcon = <TrendingDownIcon sx={{ color: 'red' }} />;
        trendColor = 'red';
    } else {
        trendIcon = <TrendingUpIcon sx={{ color: 'green' }} />;
        trendColor = 'green';
    }

    let monthTrend = helperService.calculatePastTrend(
        Number(foundKA?.disbursedamount?.month) +
            Number(foundMH?.disbursedamount?.month),
        Number(mfinalka?.disbursment?.disbursedamount?.month) +
            Number(mfinalmh?.disbursment?.disbursedamount?.month)
    );

    let monthTrendIcon;
    let monthTrendColor;
    if (monthTrend.substring(0, 1) === '-') {
        monthTrendIcon = <TrendingDownIcon sx={{ color: 'red' }} />;
        monthTrendColor = 'red';
    } else {
        monthTrendIcon = <TrendingUpIcon sx={{ color: 'green' }} />;
        monthTrendColor = 'green';
    }

    let dayCardValue = Object.assign(
        {},
        {
            prospectsourced:
                Number(mfinalka?.disbursment?.prospectsourced?.day) +
                Number(mfinalmh?.disbursment?.prospectsourced?.day),
            creditAccepted:
                Number(mfinalka?.disbursment?.creditaccepted?.day) +
                Number(mfinalmh?.disbursment?.creditaccepted?.day),
            disbursed:
                Number(mfinalka?.disbursment?.disbursed?.day) +
                Number(mfinalmh?.disbursment?.disbursed?.day),
            disbursedamount:
                Number(mfinalka?.disbursment?.disbursedamount?.day) +
                Number(mfinalmh?.disbursment?.disbursedamount?.day),
            dbPipeline:
                mfinalka?.disbursment?.dbPipeline ||
                mfinalmh?.disbursment?.dbPipeline
                    ? Number(mfinalka?.disbursment?.dbPipeline) ||
                      Number(mfinalmh?.disbursment?.dbPipeline)
                    : null,

            trend: currentTrend,
            icon: trendIcon,
            color: trendColor,
            month: month,
            date: mfinalka?.date.substring(0, 5),
            type: 'day',
            jlg: 'overall',
        }
    );

    let monthCardValue = Object.assign(
        {},
        {
            prospectsourced:
                Number(mfinalka?.disbursment?.prospectsourced?.month) +
                Number(mfinalmh?.disbursment?.prospectsourced?.month),
            creditAccepted:
                Number(mfinalka?.disbursment?.creditaccepted?.month) +
                Number(mfinalmh?.disbursment?.creditaccepted?.month),
            disbursed:
                Number(mfinalka?.disbursment?.disbursed?.month) +
                Number(mfinalmh?.disbursment?.disbursed?.month),
            disbursedamount:
                Number(mfinalka?.disbursment?.disbursedamount?.month) +
                Number(mfinalmh?.disbursment?.disbursedamount?.month),
            trend: monthTrend,
            icon: monthTrendIcon,
            color: monthTrendColor,
            month: month,
            date: mfinalka?.date.substring(0, 5),
            type: 'month',
            jlg: 'overall',
        }
    );

    useEffect(() => {
        getOverallFederalDisbursement1();
    }, []);

    return (
        <>
            <Grid
                style={{ 'margin-top': '15px' }}
                container
                gap={3}
                alignItems={'center'}
                sx={{
                    display: 'flex',
                    margin: { md: '15px', sm: '0px' },
                    width: 'auto',
                    justifyContent: 'start',
                }}
            >
                <Grid item lg={3.5} md={3.5} sm={12} xs={12}>
                    <DisbursementCard cardValue={dayCardValue} />
                </Grid>

                <Grid item lg={3.5} md={3.5} sm={12} xs={12}>
                    <DisbursementCard
                        cardValue={monthCardValue}
                        cardType={dayCardValue.dbPipeline}
                    />
                </Grid>
            </Grid>
        </>
    );
}
