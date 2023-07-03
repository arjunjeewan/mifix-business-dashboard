import React from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object({
    kar_prossourced_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    kar_prossourced_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    kar_prossourced_tilldate: yup.string().matches(/^[0-9]+$/, 'enter number'),
    kar_disbursed_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    kar_disbursed_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    kar_disbursed_tildate: yup.string().matches(/^[0-9]+$/, 'enter number'),
    kar_disbamount_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    kar_disbamount_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    kar_disbamount_tilldate: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_prossourced_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_prossourced_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_prossourced_tilldate: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_disbursed_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_disbursed_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_disbursed_tildate: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_disbamount_day: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_disbamount_month: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_disbamount_tilldate: yup.string().matches(/^[0-9]+$/, 'enter number'),
});
const Jlgform = () => {
    const formik = useFormik({
        initialValues: {
            kar_prossourced_day: '',
            kar_prossourced_month: '',
            kar_prossourced_tilldate: '',
            kar_disbursed_day: '',
            kar_disbursed_month: '',
            kar_disbursed_tildate: '',
            kar_disbamount_day: '',
            kar_disbamount_month: '',
            kar_disbamount_tilldate: '',
            maha_prossourced_day: '',
            maha_prossourced_month: '',
            maha_prossourced_tilldate: '',
            maha_disbursed_day: '',
            maha_disbursed_month: '',
            maha_disbursed_tildate: '',
            maha_disbamount_day: '',
            maha_disbamount_month: '',
            maha_disbamount_tilldate: '',
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
                            Karnataka
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
                                        id="kar_prossourced_day"
                                        name="kar_prossourced_day"
                                        value={formik.values.kar_prossourced_day}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.kar_prossourced_day &&
                                            Boolean(
                                                formik.errors.kar_prossourced_day
                                            )
                                        }
                                        helperText={
                                            formik.touched.kar_prossourced_day &&
                                            formik.errors.kar_prossourced_day
                                        }
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="kar_prossourced_month"
                                        name="kar_prossourced_month"
                                        value={formik.values.kar_prossourced_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="kar_prossourced_tilldate"
                                        name="kar_prossourced_tilldate"
                                        value={
                                            formik.values.kar_prossourced_tilldate
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
                                        Disbursed
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="kar_disbursed_day"
                                        name="kar_disbursed_day"
                                        value={formik.values.kar_disbursed_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="kar_disbursed_month"
                                        name="kar_disbursed_month"
                                        value={formik.values.kar_disbursed_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="kar_disbursed_tilldate"
                                        name="kar_disbursed_tilldate"
                                        value={formik.values.kar_disbursed_tilldate}
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
                                        id="kar_disbamount_day"
                                        name="kar_disbamount_day"
                                        value={formik.values.kar_disbamount_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="kar_disbamount_month"
                                        name="kar_disbamount_month"
                                        value={formik.values.kar_disbamount_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="kar_disbamount_tilldate"
                                        name="kar_disbamount_tilldate"
                                        value={formik.values.kar_disbamount_tilldate}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    defaultExpanded={true}
                    elevation="5"
                    sx={{ '&:before': { display: 'none' } }}
                    style={{
                        borderRadius: '10px',
                        backgroundColor: '#F3F3F3',
                        marginTop: '2%',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                            Maharashtra
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
                                        id="maha_prossourced_day"
                                        name="maha_prossourced_day"
                                        value={formik.values.maha_prossourced_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="maha_prossourced_month"
                                        name="maha_prossourced_month"
                                        value={formik.values.maha_prossourced_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="maha_prossourced_tilldate"
                                        name="maha_prossourced_tilldate"
                                        value={
                                            formik.values.maha_prossourced_tilldate
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
                                        Disbursed
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="maha_disbursed_day"
                                        name="maha_disbursed_day"
                                        value={formik.values.maha_disbursed_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="maha_disbursed_month"
                                        name="maha_disbursed_month"
                                        value={formik.values.maha_disbursed_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="maha_disbursed_tilldate"
                                        name="maha_disbursed_tilldate"
                                        value={formik.values.maha_disbursed_tilldate}
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
                                        id="maha_disbamount_day"
                                        name="maha_disbamount_day"
                                        value={formik.values.maha_disbamount_day}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="maha_disbamount_month"
                                        name="maha_disbamount_month"
                                        value={formik.values.maha_disbamount_month}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        id="maha_disbamount_tilldate"
                                        name="maha_disbamount_tilldate"
                                        value={
                                            formik.values.maha_disbamount_tilldate
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

export default Jlgform;
