import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import UserService from '../../Service/user.service';
import helperService from '../../Service/helper.service';
import DisbursementCard from '../common/DisbursementCard';

export default function JLGMaharashtraCard() {
    const [monthData, setMonthData] = useState([]);
    let previousMonthData;
    let foundValue;
    const [month, setMonth] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    let previousDate = [];
    const [found, setFound] = useState('');
    const getMHJlgDisbursement1 = async () => {
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
            setMonthData(res?.data[0]?.data);
            setCurrentDate(res?.data[0]?.data[res?.data[0]?.data.length - 1].date);
            previousDate = helperService.getOneMonthAgo(
                res?.data[0]?.data[res?.data[0]?.data.length - 1].date
            );
            setMonth(
                helperService.getSpeceficMonth(
                    res?.data[0]?.data[res?.data[0]?.data.length - 1].date
                )
            );

            // Call getTNAgriDisbursement2 after getTNAgriDisbursement1 finishes
            await getMHJlgDisbursement2();
        } catch (err) {
            console.log(err);
        }
    };

    const getMHJlgDisbursement2 = async () => {
        try {
            const response = await UserService.getdisbursementData(
                helperService.getDateBeforeAndAfter(previousDate[0])[0],
                helperService.getDateBeforeAndAfter(previousDate[0])[1],
                'federal',
                'maharashtra',
                'jlg'
            );

            response.data[0].data.sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateA - dateB;
            });
            previousMonthData = response?.data[0]?.data;
            for (const item of previousMonthData) {
                if (item.date === previousDate[1]) {
                    foundValue = item.disbursment;
                    break;
                }
            }
            setFound(foundValue);
        } catch (err) {
            console.log(err);
        }
    };

    // Call getTNAgriDisbursement1 to start the process

    let l = monthData.length;
    let mdata = monthData[l - 1];
    let mdata1 = monthData[l - 2];
    let currentTrend = helperService.calculatePastTrend(
        mdata1?.disbursment?.disbursedamount?.day,
        mdata?.disbursment?.disbursedamount?.day
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
        found?.disbursedamount?.month,
        mdata?.disbursment?.disbursedamount?.month
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
            prospectsourced: mdata?.disbursment?.prospectsourced?.day,
            creditAccepted: mdata?.disbursment?.creditaccepted?.day,
            disbursed: mdata?.disbursment?.disbursed?.day,
            disbursedamount: mdata?.disbursment?.disbursedamount?.day,
            trend: currentTrend,
            icon: trendIcon,
            color: trendColor,
            month: month,
            date: mdata?.date.substring(0, 5),
            type: 'day',
        }
    );

    let monthCardValue = Object.assign(
        {},
        {
            prospectsourced: mdata?.disbursment?.prospectsourced?.month,
            creditAccepted: mdata?.disbursment?.creditaccepted?.month,
            disbursed: mdata?.disbursment?.disbursed?.month,
            disbursedamount: mdata?.disbursment?.disbursedamount?.month,
            trend: monthTrend,
            icon: monthTrendIcon,
            color: monthTrendColor,
            month: month,
            date: mdata?.date.substring(0, 5),
            type: 'month',
        }
    );

    useEffect(() => {
        getMHJlgDisbursement1();
    }, []);

    return (
        <Grid
            style={{ 'margin-top': '15px' }}
            container
            gap={3}
            alignItems={'center'}
            sx={{
                display: 'flex',
                margin: { md: '15px', sm: '15px 0 0 0' },
                width: 'auto',
                justifyContent: 'start',
            }}
        >
            <Grid item lg={3.5} md={3.5} sm={12} xs={12}>
                <DisbursementCard cardValue={dayCardValue} />
            </Grid>

            <Grid item lg={3.5} md={3.5} sm={12} xs={12}>
                <DisbursementCard cardValue={monthCardValue} />
            </Grid>
        </Grid>
    );
}
