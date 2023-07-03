import React from 'react';
import { Grid, Typography, Stack } from '@mui/material';
import DisJLGtn from './Dhanalakshmi/DisJLGtn';
import Audit from './Federal/Audit';
import Dxbaudit from './Dhanalakshmi/DxbAudit';

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

const DhanDash = (props) => {
    return (
        <>
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
                        justifyContent:
                            "simport { SnackbarProvider } from 'notistack';pace-between",
                    }}
                >
                    <Grid lg={12} md={12} xs={12}>
                        <h2>JLG DISBURSEMENT</h2>
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
                                        props.bankData?.banks?.dhanlaxmi?.disbursment
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
                                            props.bankData?.banks?.dhanlaxmi?.disbursment?.jlg?.updatedDetails?.updatedAt
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
                    <DisJLGtn bank="dhanlaxmi" state="tamil nadu" product="jlg" />
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
                                        props.bankData?.banks?.dhanlaxmi?.audit
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
                                            props.bankData?.banks?.dhanlaxmi?.audit?.updatedDetails?.updatedAt
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
                    <Dxbaudit bank="dhanlaxmi" state="tamil nadu" />

                    {/* <Accordion elevation={10} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Tamil Nadu</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Chart option={auditOption} />
            </AccordionDetails>
          </Accordion> */}
                </div>
                <br />
            </div>
        </>
    );
};

export default DhanDash;
