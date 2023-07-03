import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import UserService from '../../Service/user.service';
import helperService from '../../Service/helper.service';
import AuditCard from '../common/AuditCard';

export default function FedAuditCard() {
    const [monthDataKarnataka, setMonthDataKarnataka] = React.useState([]);
    const [monthDataMaharashtra, setMonthDataMaharashtra] = React.useState([]);

    const getOverallAudit = () => {
        UserService.getauditData(
            helperService.last35daysDateRange()[0],
            helperService.last35daysDateRange()[1],
            'federal',
            'karnataka'
        )
            .then((res) => {
                setMonthDataKarnataka(res?.data[0]?.data);
            })
            .catch((err) => {
                console.log(err);
            });

        UserService.getauditData(
            helperService.last35daysDateRange()[0],
            helperService.last35daysDateRange()[1],
            'federal',
            'maharashtra'
        )
            .then((res) => {
                setMonthDataMaharashtra(res?.data[0]?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getOverallAudit();
    }, []);

    let lk = monthDataKarnataka.length;
    let lm = monthDataMaharashtra.length;

    let mfinalka = monthDataKarnataka[lk - 1];
    let mfinalmh = monthDataMaharashtra[lm - 1];

    let KACardValue = Object.assign(
        {},
        {
            callsDialed: lk ? mfinalka?.audit?.callsdialed?.day : null,
            audited: lk ? mfinalka?.audit?.audited?.day : null,
            onHold: lk ? mfinalka?.audit?.onhold?.day : null,
            rejected: lk ? mfinalka?.audit?.rejected?.day : null,
            date: lk ? mfinalka?.date.substring(0, 5) : null,
            state: 'Karnataka',
        }
    );

    let MHCardValue = Object.assign(
        {},
        {
            callsDialed: lm ? mfinalmh?.audit?.callsdialed?.day : null,
            audited: lm ? mfinalmh?.audit?.audited?.day : null,
            onHold: lm ? mfinalmh?.audit?.onhold?.day : null,
            rejected: lm ? mfinalmh?.audit?.rejected?.day : null,
            date: lm ? mfinalmh?.date.substring(0, 5) : null,
            state: 'Maharashtra',
        }
    );

    let overallCardValue = Object.assign(
        {},
        {
            callsDialed:
                lk && lm
                    ? Number(mfinalmh?.audit?.callsdialed?.day) +
                      Number(mfinalka?.audit?.callsdialed?.day)
                    : null,
            audited:
                lk && lm
                    ? Number(mfinalmh?.audit?.audited?.day) +
                      Number(mfinalka?.audit?.audited?.day)
                    : null,
            onHold:
                lk && lm
                    ? Number(mfinalmh?.audit?.onhold?.day) +
                      Number(mfinalka?.audit?.onhold?.day)
                    : null,
            rejected:
                lk && lm
                    ? Number(mfinalmh?.audit?.rejected?.day) +
                      Number(mfinalka?.audit?.rejected?.day)
                    : null,
            date: lk && lm ? mfinalka?.date.substring(0, 5) : null,
            state: 'Overall',
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
                <AuditCard cardValue={overallCardValue} />
            </Grid>

            <Grid item lg={3.5} md={3.5} sm={12} xs={12}>
                <AuditCard cardValue={KACardValue} />
            </Grid>

            <Grid item lg={3.5} md={3.5} sm={12} xs={12}>
                <AuditCard cardValue={MHCardValue} />
            </Grid>
        </Grid>
    );
}
