import React from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    dxb_coll_triggered_num: yup.string().matches(/^[0-9]+$/, 'enter number'),
    dxb_coll_pending_num: yup.string().matches(/^[0-9]+$/, 'enter number'),
    dxb_coll_overall_num: yup.string().matches(/^[0-9]+$/, 'enter number'),
    dxb_coll_triggered_amount: yup.string().matches(/^[0-9]+$/, 'enter number'),
    dxb_coll_pending_amount: yup.string().matches(/^[0-9]+$/, 'enter number'),
    dxb_coll_overall_amount: yup.string().matches(/^[0-9]+$/, 'enter number'),
});

const Dxbcollections = () => {
    const formik = useFormik({
        initialValues: {
            dxb_coll_triggered_num: '',
            dxb_coll_pending_num: '',
            dxb_coll_overall_num: '',
            dxb_coll_triggered_amount: '',
            dxb_coll_pending_amount: '',
            dxb_coll_overall_amount: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ margin: '0% 2% 2% 2%' }}>
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
                            <Typography
                                sx={{ fontWeight: 'bold', fontSize: '2rem' }}
                            >
                                Collections
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
                                                padding: '7% 0% 0% 0%',
                                                fontWeight: 'bold',
                                            }}
                                            align="center"
                                        >
                                            Number of Customers
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography
                                            sx={{
                                                color: '#000',
                                                fontSize: '1.1em',
                                                padding: '7% 0% 0% 0%',
                                                fontWeight: 'bold',
                                            }}
                                            align="center"
                                        >
                                            Amount
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
                                            Collection Triggered
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} align="center">
                                        <TextField
                                            sx={{ width: '80%' }}
                                            variant="outlined"
                                            id="dxb_coll_triggered_num"
                                            name="dxb_coll_triggered_num"
                                            value={
                                                formik.values.dxb_coll_triggered_num
                                            }
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3} align="center">
                                        <TextField
                                            sx={{ width: '80%' }}
                                            variant="outlined"
                                            id="dxb_coll_triggered_amount"
                                            name="dxb_coll_triggered_amount"
                                            value={
                                                formik.values
                                                    .dxb_coll_triggered_amount
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
                                            Pending Collection
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} align="center">
                                        <TextField
                                            sx={{ width: '80%' }}
                                            variant="outlined"
                                            id="dxb_coll_pending_num"
                                            name="dxb_coll_pending_num"
                                            value={
                                                formik.values.dxb_coll_pending_num
                                            }
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3} align="center">
                                        <TextField
                                            sx={{ width: '80%' }}
                                            variant="outlined"
                                            id="dxb_coll_pending_amount"
                                            name="dxb_coll_pending_amount"
                                            value={
                                                formik.values.dxb_coll_pending_amount
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
                                            Overall Collected
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} align="center">
                                        <TextField
                                            sx={{ width: '80%' }}
                                            variant="outlined"
                                            id="dxb_coll_overall_num"
                                            name="dxb_coll_overall_num"
                                            value={
                                                formik.values.dxb_coll_overall_num
                                            }
                                            onChange={formik.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3} align="center">
                                        <TextField
                                            sx={{ width: '80%' }}
                                            variant="outlined"
                                            id="dxb_coll_overall_amount"
                                            name="dxb_coll_overall_amount"
                                            value={
                                                formik.values.dxb_coll_overall_amount
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
                </div>
            </form>
        </>
    );
};

export default Dxbcollections;
