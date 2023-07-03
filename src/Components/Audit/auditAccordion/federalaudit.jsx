import React from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    nkar_audited: yup.string().matches(/^[0-9]+$/, 'enter number'),
    nkar_onhold: yup.string().matches(/^[0-9]+$/, 'enter number'),
    nkar_rejected: yup.string().matches(/^[0-9]+$/, 'enter number'),
    nkar_total: yup.string().matches(/^[0-9]+$/, 'enter number'),

    skar_audited: yup.string().matches(/^[0-9]+$/, 'enter number'),
    skar_onhold: yup.string().matches(/^[0-9]+$/, 'enter number'),
    skar_rejected: yup.string().matches(/^[0-9]+$/, 'enter number'),
    skar_total: yup.string().matches(/^[0-9]+$/, 'enter number'),

    maha_audited: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_onhold: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_rejected: yup.string().matches(/^[0-9]+$/, 'enter number'),
    maha_total: yup.string().matches(/^[0-9]+$/, 'enter number'),

    convox_audited: yup.string().matches(/^[0-9]+$/, 'enter number'),
    convox_onhold: yup.string().matches(/^[0-9]+$/, 'enter number'),
    convox_rejected: yup.string().matches(/^[0-9]+$/, 'enter number'),
    convox_total: yup.string().matches(/^[0-9]+$/, 'enter number'),

    fed_totaldialed: yup.string().matches(/^[0-9]+$/, 'enter number'),
    fed_onboardingcalls: yup.string().matches(/^[0-9]+$/, 'enter number'),
});

const Federalaudit = () => {
    const formik = useFormik({
        initialValues: {
            nkar_audited: '',
            nkar_onhold: '',
            nkar_rejected: '',
            nkar_total: '',
            skar_audited: '',
            skar_onhold: '',
            skar_rejected: '',
            skar_total: '',
            maha_audited: '',
            maha_onhold: '',
            maha_rejected: '',
            maha_total: '',
            convox_audited: '',
            convox_onhold: '',
            convox_rejected: '',
            convox_total: '',
            fed_totaldialed: '',
            fed_onboardingcalls: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div style={{ margin: '0% 2% 2% 2%' }}>
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
                            Audit
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3} direction="column">
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={2.4}></Grid>
                                <Grid item xs={2.4}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 0%',
                                            fontWeight: 'bold',
                                        }}
                                        align="center"
                                    >
                                        Audited
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 0%',
                                            fontWeight: 'bold',
                                        }}
                                        align="center"
                                    >
                                        On Hold
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 0%',
                                            fontWeight: 'bold',
                                        }}
                                        align="center"
                                    >
                                        Rejected
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 0%',
                                            fontWeight: 'bold',
                                        }}
                                        align="center"
                                    >
                                        Total
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={2.4}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 8%',
                                        }}
                                        align="left"
                                    >
                                        North Karnataka
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="nkar_audited"
                                        name="nkar_audited"
                                        value={formik.values.nkar_audited}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="nkar_onhold"
                                        name="nkar_onhold"
                                        value={formik.values.nkar_onhold}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="nkar_rejected"
                                        name="nkar_rejected"
                                        value={formik.values.nkar_rejected}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="nkar_total"
                                        name="nkar_total"
                                        value={formik.values.nkar_total}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={2.4}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 8%',
                                        }}
                                        align="left"
                                    >
                                        South Karnataka
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="skar_audited"
                                        name="skar_audited"
                                        value={formik.values.skar_audited}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="skar_onhold"
                                        name="skar_onhold"
                                        value={formik.values.skar_onhold}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="skar_rejected"
                                        name="skar_rejected"
                                        value={formik.values.skar_rejected}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="skar_total"
                                        name="skar_total"
                                        value={formik.values.skar_total}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={2.4}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 8%',
                                        }}
                                        align="left"
                                    >
                                        Maharastra
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="maha_audited"
                                        name="maha_audited"
                                        value={formik.values.maha_audited}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="maha_onhold"
                                        name="maha_onhold"
                                        value={formik.values.maha_onhold}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="maha_rejected"
                                        name="maha_rejected"
                                        value={formik.values.maha_rejected}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="maha_total"
                                        name="maha_total"
                                        value={formik.values.maha_total}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2} direction="row">
                                <Grid item xs={2.4}>
                                    <Typography
                                        sx={{
                                            color: '#000',
                                            fontSize: '1.1em',
                                            padding: '7% 0% 0% 8%',
                                        }}
                                        align="left"
                                    >
                                        Convox
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="convox_audited"
                                        name="convox_audited"
                                        value={formik.values.convox_audited}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="convox_onhold"
                                        name="convox_onhold"
                                        value={formik.values.convox_onhold}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="convox_rejected"
                                        name="convox_rejected"
                                        value={formik.values.convox_rejected}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={2.4} align="center">
                                    <TextField
                                        sx={{ width: '80%' }}
                                        variant="outlined"
                                        id="convox_total"
                                        name="convox_total"
                                        value={formik.values.convox_total}
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
                        marginTop: '3%',
                        flexWrap: 'wrap',
                        justifyContent: 'left',
                        gap: '20px',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                        <div style={{ paddingRight: '5%' }}>
                            <Typography
                                sx={{
                                    color: '#000',
                                    fontSize: '1.1em',
                                    padding: '0% 0% 0% 0%',
                                    fontWeight: 'bold',
                                }}
                            >
                                Total Dialed
                            </Typography>
                        </div>

                        <TextField
                            sx={{ width: '70%' }}
                            variant="outlined"
                            id="fed_totaldialed"
                            name="fed_totaldialed"
                            value={formik.values.fed_totaldialed}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                        <div style={{ paddingRight: '5%' }}>
                            <Typography
                                sx={{
                                    color: '#000',
                                    fontSize: '1.1em',
                                    padding: '0% 0% 0% 0%',
                                    fontWeight: 'bold',
                                }}
                            >
                                Onboarding Calls
                            </Typography>
                        </div>

                        <TextField
                            sx={{ width: '70%' }}
                            variant="outlined"
                            id="fed_onboardingcalls"
                            name="fed_onboardingcalls"
                            value={formik.values.fed_onboardingcalls}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
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
        </div>
    );
};

export default Federalaudit;
