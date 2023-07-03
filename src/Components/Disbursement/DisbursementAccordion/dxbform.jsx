import React from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    tndxb_prossourced_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_prossourced_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_prossourced_tilldate: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_credit_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_credit_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_credit_tilldate: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_disbursed_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_disbursed_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_disbursed_tildate: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_disbamount_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_disbamount_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    tndxb_disbamount_tilldate: yup.string().matches(/^[0-9]+$/, 'enter number'),
});

const Dxbform = () => {
    const formik = useFormik({
        initialValues: {
            tndxb_prossourced_day: '',
            tndxb_prossourced_month: '',
            tndxb_prossourced_tilldate: '',
            tndxb_credit_day: '',
            tndxb_credit_month: '',
            tndxb_credit_tilldate: '',
            tndxb_disbursed_day: '',
            tndxb_disbursed_month: '',
            tndxb_disbursed_tildate: '',
            tndxb_disbamount_day: '',
            tndxb_disbamount_month: '',
            tndxb_disbamount_tilldate: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Accordion
                    defaultExpanded={true}
                    elevation="5"
                    sx={{ '&:before': { display: 'none' } }}
                    style={{
                        borderRadius: '10px',
                        backgroundColor: '#F3F3F3',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                            Tamil Nadu
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3} direction="column">
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 20%',
                                            fontWeight: 'bold',
                                        }}
                                        align="left"
                                    >
                                        DAY
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 20%',
                                            fontWeight: 'bold',
                                        }}
                                        align="left"
                                    >
                                        MONTH
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 20%',
                                            fontWeight: 'bold',
                                        }}
                                        align="left"
                                    >
                                        TILL DATE
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 20%',
                                        }}
                                        align="left"
                                    >
                                        Prospect Sourced
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_prossourced_day"
                                        name="tndxb_prossourced_day"
                                        value={formik.values.tndxb_prossourced_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_prossourced_month"
                                        name="tndxb_prossourced_month"
                                        value={formik.values.tndxb_prossourced_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_prossourced_tilldate"
                                        name="tndxb_prossourced_tilldate"
                                        value={
                                            formik.values.tndxb_prossourced_tilldate
                                        }
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 20%',
                                        }}
                                        align="left"
                                    >
                                        Credit Accepted
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_credit_day"
                                        name="tndxb_credit_day"
                                        value={formik.values.tndxb_credit_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_credit_month"
                                        name="tndxb_credit_month"
                                        value={formik.values.tndxb_credit_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_credit_tilldate"
                                        name="tndxb_credit_tilldate"
                                        value={formik.values.tndxb_credit_tilldate}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 20%',
                                        }}
                                        align="left"
                                    >
                                        Disbursed
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_disbursed_day"
                                        name="tndxb_disbursed_day"
                                        value={formik.values.tndxb_disbursed_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_disbursed_month"
                                        name="tndxb_disbursed_month"
                                        value={formik.values.tndxb_disbursed_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_disbursed_tilldate"
                                        name="tndxb_disbursed_tilldate"
                                        value={
                                            formik.values.tndxb_disbursed_tilldate
                                        }
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={3}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 20%',
                                        }}
                                        align="left"
                                    >
                                        Disbursed Amount
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_disbamount_day"
                                        name="tndxb_disbamount_day"
                                        value={formik.values.tndxb_disbamount_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_disbamount_month"
                                        name="tndxb_disbamount_month"
                                        value={formik.values.tndxb_disbamount_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="tndxb_disbamount_tilldate"
                                        name="tndxb_disbamount_tilldate"
                                        value={
                                            formik.values.tndxb_disbamount_tilldate
                                        }
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '3%',
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            color: '#F3F3F3',
                            backgroundColor: '#B31B1B',
                            borderRadius: 1,
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            '&:hover': {
                                color: '#F3F3F3',
                                backgroundColor: '#CA0123',
                            },
                            width: '20%',
                        }}
                    >
                        submit
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Dxbform;
