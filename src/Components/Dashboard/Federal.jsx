import React from 'react';
import axios from 'axios';
import FedDisJLGOverall from './Federal/DisJLGOverall';
import FedDisJLGKar from './Federal/DisJLGKar';
import FedDisJLGMaha from './Federal/DisJLGMaha';
import FedDisAgriTN from './Federal/DisAgriTN';
import FedCollection from '../Dashboard/Federal/CollectionsOverall';
import Audit from './Federal/Audit';
import { Grid, Stack, Typography } from '@mui/material';

const formatDate = (date) => {
    if (date && date != 'Invalid Date') {
        console.log('date ....' + date);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hour = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let formattedDate =
            day + '/' + month + '/' + year + ' - ' + hour + ':' + minutes;
        return formattedDate;
    } else return null;
};

const FederalDash = (props) => {
    console.log('testxx', props.bankData);
    return (
        <div>
            <div
                style={{
                    paddingLeft: '2vw',
                }}
            >
                <br />
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid item lg={12} md={12} xs={12}>
                        <h2>JLG DISBURSEMENT</h2>
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        md={12}
                        xs={12}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Grid>
                            <Typography sx={{ color: 'red', fontSize: '0.8em' }}>
                                Last Updated:
                            </Typography>
                        </Grid>
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: { sm: 'column', md: 'row' },
                            }}
                        >
                            <Grid>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        color: '#000',
                                        pl: '5px',
                                        fontSize: '0.8em',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {
                                        props.bankData?.banks?.federal?.disbursment
                                            ?.jlg?.updatedDetails?.updatedBy
                                    }
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography
                                    sx={{
                                        color: '#909090',
                                        fontSize: '0.8em',
                                        pl: '5px',
                                    }}
                                >
                                    {formatDate(
                                        new Date(
                                            props.bankData?.banks?.federal?.disbursment?.jlg?.updatedDetails?.updatedAt
                                        )
                                    )}
                                </Typography>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
                <div
                    style={{
                        marginTop: '1vh',
                    }}
                >
                    <FedDisJLGOverall bank="federal" product="jlg" />
                    <FedDisJLGKar bank="federal" state="karnataka" product="jlg" />
                    <FedDisJLGMaha
                        bank="federal"
                        state="maharashtra"
                        product="jlg"
                    />
                </div>
                <br />
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid lg={12} md={12} xs={12}>
                        <h2>AGRI DISBURSEMENT</h2>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sx={{ display: 'flex' }}>
                        <Grid>
                            <Typography sx={{ color: 'red', fontSize: '0.8em' }}>
                                Last Updated:
                            </Typography>
                        </Grid>
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: { sm: 'column', md: 'row' },
                            }}
                        >
                            <Grid>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        color: '#000',
                                        pl: '5px',
                                        fontSize: '0.8em',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {
                                        props.bankData?.banks?.federal?.disbursment
                                            ?.agri?.updatedDetails?.updatedBy
                                    }
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography
                                    sx={{
                                        color: '#909090',
                                        fontSize: '0.8em',
                                        pl: '5px',
                                    }}
                                >
                                    {formatDate(
                                        new Date(
                                            props.bankData?.banks?.federal?.disbursment?.agri?.updatedDetails?.updatedAt
                                        )
                                    )}
                                </Typography>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
                <div
                    style={{
                        marginTop: '1vh',
                    }}
                >
                    <FedDisAgriTN bank="federal" state="tamil nadu" product="agri" />
                </div>
                <br />
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid lg={12} md={12} xs={12}>
                        <h2>JLG COLLECTIONS</h2>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sx={{ display: 'flex' }}>
                        <Grid>
                            <Typography sx={{ color: 'red', fontSize: '0.8em' }}>
                                Last Updated:
                            </Typography>
                        </Grid>
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: { sm: 'column', md: 'row' },
                            }}
                        >
                            <Grid>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        color: '#000',
                                        pl: '5px',
                                        fontSize: '0.8em',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {
                                        props.bankData?.banks?.federal?.collection
                                            ?.updatedDetails?.updatedBy
                                    }
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography
                                    sx={{
                                        color: '#909090',
                                        fontSize: '0.8em',
                                        pl: '5px',
                                    }}
                                >
                                    {formatDate(
                                        new Date(
                                            props.bankData?.banks?.federal?.collection?.updatedDetails?.updatedAt
                                        )
                                    )}
                                </Typography>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
                <div
                    style={{
                        marginTop: '1vh',
                    }}
                >
                    <FedCollection bank="federal" />
                </div>
                <br />
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid lg={12} md={12} xs={12}>
                        <h2>JLG AUDIT</h2>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sx={{ display: 'flex' }}>
                        <Grid>
                            <Typography sx={{ color: 'red', fontSize: '0.8em' }}>
                                Last Updated:
                            </Typography>
                        </Grid>
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: { sm: 'column', md: 'row' },
                            }}
                        >
                            <Grid>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        color: '#000',
                                        pl: '5px',
                                        fontSize: '0.8em',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {
                                        props.bankData?.banks?.federal?.audit
                                            ?.updatedDetails?.updatedBy
                                    }
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography
                                    sx={{
                                        color: '#909090',
                                        fontSize: '0.8em',
                                        pl: '5px',
                                    }}
                                >
                                    {formatDate(
                                        new Date(
                                            props.bankData?.banks?.federal?.audit?.updatedDetails?.updatedAt
                                        )
                                    )}
                                </Typography>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
                <div
                    style={{
                        marginTop: '1vh',
                    }}
                >
                    <Audit bank="federal" state="maharashtra" />
                </div>
            </div>
        </div>
    );
};

export default FederalDash;
