import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import UserService from '../../Service/user.service';
import helperService from '../../Service/helper.service';
import AuditCard from '../common/AuditCard';

export default function TNAuditCard() {
    const [monthDataTN, setMonthDataTN] = React.useState([]);

    const getOverallAudit = () => {
        UserService.getauditData(
            helperService.last35daysDateRange()[0],
            helperService.last35daysDateRange()[1],
            'dhanlaxmi',
            'tamil nadu'
        )
            .then((res) => {
                setMonthDataTN(res?.data[0]?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getOverallAudit();
    }, []);

    let ll = monthDataTN.length;

    let mfinaltn = monthDataTN[ll - 1];

    let TNCardValue = Object.assign(
        {},
        {
            callsDialed: mfinaltn?.audit?.callsdialed?.day,
            audited: mfinaltn?.audit?.audited?.day,
            onHold: mfinaltn?.audit?.onhold?.day,
            rejected: mfinaltn?.audit?.rejected?.day,
            date: mfinaltn?.date.substring(0, 5),
            state: 'Tamil Nadu',
        }
    );

    return (
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
                <AuditCard cardValue={TNCardValue} />
            </Grid>
        </Grid>
    );
}
