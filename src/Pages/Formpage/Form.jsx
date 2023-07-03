import React, { useState, useEffect } from 'react';
import { Alert, Button, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from '../../Components/Header';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Disbursement from '../../Components/Disbursement/Disbursementform';
import Collections from '../../Components/Collections/Collectionsform';
import Audit from '../../Components/Audit/Auditform';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DisbursementTemplate from '../../Assets/TemplateFiles/disbursement.xlsx';
import CollectionTemplate from '../../Assets/TemplateFiles/collection.xlsx';
import AuditTemplate from '../../Assets/TemplateFiles/audit.xlsx';

const Form = () => {
    const [formdate, setFormdate] = useState(null);
    const [bank, setbank] = useState('');
    const [radio, setradio] = useState('Disbursement');
    const [openUpload, setOpenUpload] = useState(false);
    const [excel, setExcel] = useState(null);
    const [type, setType] = useState('disbursement');

    const isUploadDisabled = !type || !excel;

    const handleClickOpenUploadDialog = () => {
        setOpenUpload(true);
    };

    const handleClickCloseUploadDialog = () => {
        setOpenUpload(false);
        setType('');
        setExcel(null);
    };

    const handleUploadChange = (e) => {
        setExcel(e.target.files[0]);
    };

    const handleDateChange = (date) => {
        setFormdate(date);
    };

    const handleChange = (event) => {
        setbank(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleradioChange = (event) => {
        setradio(event.target.value);
    };

    async function handleUpload() {
        const file = new FormData();
        file.append('file', excel);
        file.append('type', type);
        try {
            const response = await fetch(
                `https://alpha-api.mifix.io/v1/dashboard/excelupload`,
                {
                    method: 'POST',
                    body: file,
                    headers: {
                        Authorization: `Bearer ${window.sessionStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const res = await response.json();
            if (res) {
                if (res.message) {
                    alert(res.message);
                } else alert(res.error);
            } else {
                alert('Error in Upload');
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        window.addEventListener('popstate', (e) => {
            window.history.go(1);
        });
    }, []);

    return (
        <>
            <Header />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                    backgroundColor: '#F3F3F3',
                    marginTop: '3.5rem',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flex: 'contain',
                        flexDirection: 'column',
                        width: '100%',
                        backgroundColor: '#fff',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            margin: '2% 2% 0% 2%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 'lighter' }}>
                            Records Entry
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleClickOpenUploadDialog();
                            }}
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
                                minHeight: '45px',
                                maxHeight: '55px',
                                marginBottom: '1%',
                            }}
                        >
                            Upload
                        </Button>
                    </div>
                    <hr style={{ margin: '0% 2% 0% 2%' }} />
                    <Grid container spacing={2} sx={{ padding: '4% 2% 2% 2%' }}>
                        <Grid item xs={12} md={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    slotProps={{
                                        textField: {
                                            required: true,
                                        },
                                    }}
                                    sx={{ width: '100%' }}
                                    label="Select Date"
                                    value={formdate}
                                    disabled
                                    onChange={handleDateChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Select a date"
                                            inputFormat="dd-MM-yyyy"
                                            InputProps={{
                                                ...params.InputProps,
                                                disableUnderline: true,
                                            }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Bank
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={bank}
                                    label="Bank"
                                    onChange={handleChange}
                                    disabled={!formdate}
                                >
                                    <MenuItem value="1">Federal</MenuItem>
                                    <MenuItem value="2">Dhanlakshmi</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '2%',
                            width: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <FormControl sx={{ width: '100%' }}>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={radio}
                                onChange={handleradioChange}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                }}
                            >
                                <div style={{ margin: '0% 2% 0% 2%' }}>
                                    <FormControlLabel
                                        value="Disbursement"
                                        control={<Radio />}
                                        label={
                                            <span
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1.7rem',
                                                }}
                                            >
                                                Disbursement
                                            </span>
                                        }
                                        labelPlacement="end"
                                        // disabled
                                    />
                                </div>
                                <div style={{ margin: '0% 2% 0% 2%' }}>
                                    <FormControlLabel
                                        value="Collections"
                                        control={<Radio />}
                                        label={
                                            <span
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1.7rem',
                                                }}
                                            >
                                                Collections
                                            </span>
                                        }
                                        labelPlacement="end"
                                        // disabled
                                    />
                                </div>
                                <div style={{ margin: '0% 2% 0% 2%' }}>
                                    <FormControlLabel
                                        value="Audit"
                                        control={<Radio />}
                                        label={
                                            <span
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1.7rem',
                                                }}
                                            >
                                                Audit
                                            </span>
                                        }
                                        labelPlacement="end"
                                        // disabled
                                    />
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <hr style={{ margin: '0% 2% 0% 2%' }} />
                    <div style={{ margin: '3% 0% 0% 3%' }}></div>
                    <div>
                        {radio === 'Disbursement' && bank !== '' && (
                            <Disbursement bank={bank} formdate={formdate} />
                        )}
                        {radio === 'Collections' && bank !== '' && (
                            <Collections bank={bank} formdate={formdate} />
                        )}
                        {radio === 'Audit' && bank !== '' && (
                            <Audit bank={bank} formdate={formdate} />
                        )}
                    </div>
                    <Dialog
                        open={openUpload}
                        maxWidth="xs"
                        onClose={handleClickCloseUploadDialog}
                        fullWidth
                        aria-describedby="File Upload Dialog"
                        className="upload-excel"
                    >
                        <DialogTitle>Upload Excel</DialogTitle>
                        <DialogContent>
                            <FormControl
                                sx={{ margin: '10px 0px 20px', width: '50%' }}
                            >
                                <InputLabel id="demo-simple-select-label">
                                    Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Type"
                                    onChange={handleTypeChange}
                                    required
                                >
                                    <MenuItem value="disbursement">
                                        Disbursement
                                    </MenuItem>
                                    <MenuItem value="collection">
                                        Collection
                                    </MenuItem>
                                    <MenuItem value="audit">Audit</MenuItem>
                                </Select>
                            </FormControl>
                            <input
                                accept=".xls,.xlsx"
                                type="file"
                                required
                                onChange={handleUploadChange}
                            />
                            <div className="template-download">
                                <a
                                    href={
                                        type == 'disbursement'
                                            ? DisbursementTemplate
                                            : type == 'collection'
                                            ? CollectionTemplate
                                            : type == 'audit'
                                            ? AuditTemplate
                                            : ''
                                    }
                                >
                                    Download the template
                                </a>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                disabled={isUploadDisabled}
                                onClick={() => {
                                    handleUpload();
                                }}
                            >
                                Upload
                            </Button>
                            <Button onClick={handleClickCloseUploadDialog}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default Form;
