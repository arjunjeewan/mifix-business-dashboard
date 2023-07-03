import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Grid,
    Typography,
    Box,
    Tab,
    useTheme,
    useMediaQuery,
    Tabs,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    FormControlLabel,
    Select,
    Radio,
    DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NSTlogo from '../Assets/NST-logo.png';
import MifixLogo from '../Assets/MIFIX.png';
import { AccountCircle } from '@mui/icons-material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { logout } from '../Service/auth.service';
import FedMob from '../Assets/FederalIcon.png';
import DhanMob from '../Assets/DhanIcon.png';
import Tooltip from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import BackupTwoToneIcon from '@mui/icons-material/BackupTwoTone';
import DisbursementTemplate from '../Assets/TemplateFiles/disbursement.xlsx';
import CollectionTemplate from '../Assets/TemplateFiles/collection.xlsx';
import AuditTemplate from '../Assets/TemplateFiles/audit.xlsx';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Header = ({ value, handleChange }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 500);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        logout();
        navigate('/login');
    };

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

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleUploadChange = (e) => {
        setExcel(e.target.files[0]);
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
                    window.location.reload();
                } else alert(res.error);
            } else {
                alert('Error in Upload');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const user = JSON.parse(window.sessionStorage.getItem('user'));
    const userId = user?.firstName + ' ' + user?.lastName;
    const userRole = user?.userType;
    console.log(userRole);

    return (
        <Box>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#dde0e2',
                    boxShadow: '#9CCBFC',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <img
                            src={MifixLogo}
                            alt="logo"
                            style={{
                                margin: '0.7em 0% 0.7em 0%',
                                width: '7rem',
                            }}
                        />
                        {isDesktop && (
                            <Box pl="40px">
                                {/* <footer style={{ position: "sticky", bottom: 0, width: "100%" }}> */}
                                <Tabs
                                    orientation="horizontal"
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="#b31b1b"
                                    aria-label="Vertical tabs example"
                                    // sx={{ borderRight: 1, borderColor: "divider" }}
                                    TabIndicatorProps={{
                                        style: {
                                            bottom: 0,
                                            borderBottom: '5px solid #b31b1b',
                                        },
                                    }}
                                >
                                    <Tab
                                        sx={{
                                            borderRight:
                                                '2px solid rgba(220, 220, 220, .8)',
                                            '&.Mui-selected': {
                                                backgroundColor: '#DCDCDC',
                                            },
                                            '&:hover::after': {
                                                content: "'Federal'",
                                                marginLeft: '10px',
                                            },
                                        }}
                                        icon={
                                            <div>
                                                <img
                                                    height={30}
                                                    src={FedMob}
                                                    alt="bank Logo"
                                                />
                                            </div>
                                        }
                                        iconPosition="end"
                                        {...a11yProps(0)}
                                    />

                                    <Tab
                                        sx={{
                                            borderRight:
                                                '2px solid rgba(220, 220, 220, .8)',
                                            '&.Mui-selected': {
                                                backgroundColor: '#DCDCDC',
                                            },
                                            '&:hover::after': {
                                                content: "'Dhanlaxmi'",
                                                marginLeft: '10px',
                                            },
                                        }}
                                        icon={
                                            <div
                                                style={{
                                                    backgroundColor: '#51024D',
                                                }}
                                            >
                                                <img
                                                    height={30}
                                                    src={DhanMob}
                                                    alt="bank Logo"
                                                />
                                            </div>
                                        }
                                        iconPosition="end"
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                            </Box>
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: 175,
                            height: '44px',
                            borderRadius: '10px',
                            gap: '0.4rem',
                        }}
                    >
                        {userRole === 'dataadmin' &&
                            (!isSmallScreen ? (
                                <Button
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
                                    variant="contained"
                                    onClick={() => {
                                        handleClickOpenUploadDialog();
                                    }}
                                >
                                    <UploadFileIcon />
                                    <Typography sx={{ ml: 1, mt: 0.5 }}>
                                        Upload
                                    </Typography>
                                </Button>
                            ) : (
                                <IconButton
                                    sx={{
                                        color: '#F3F3F3',
                                        // backgroundColor: "#B31B1B",
                                        borderRadius: 1,
                                        '&:hover': {
                                            color: '#F3F3F3',
                                        },
                                    }}
                                    onClick={() => {
                                        handleClickOpenUploadDialog();
                                    }}
                                >
                                    <UploadFileIcon
                                        sx={{
                                            color: '#B31B1B',
                                            width: '40px',
                                            height: '29px',
                                        }}
                                    />
                                    {/* <BackupTwoToneIcon
                    sx={{
                      color: "white",
                      width: "40px",
                      height: "29px",
                      marginTop: "0.3vh",
                      margin: "0",
                    }}
                  /> */}
                                </IconButton>
                            ))}

                        <Button
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
                                minHeight: '45px',
                                maxHeight: '55px',
                                marginBottom: '1%',
                            }}
                        >
                            <AccountCircle
                                sx={{
                                    color: 'white',
                                    width: '40px',
                                    height: '30px',
                                    marginTop: '0.3vh',
                                    margin: '0',
                                }}
                                onClick={handleClick}
                            />
                            <Grid
                                item
                                md={8.5}
                                sx={{
                                    cursor: 'pointer',
                                    height: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                align="left"
                                onClick={handleClick}
                            >
                                <>
                                    {/* <Tooltip title={userId?.toUpperCase()}> */}
                                    <Typography
                                        sx={{
                                            fontSize: '0.9em',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            maxWidth: 120,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {userId?.toUpperCase()}
                                    </Typography>
                                    {/* </Tooltip> */}
                                </>
                            </Grid>
                        </Button>

                        <Menu
                            sx={{ top: '10px' }}
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={logOut}>Logout</MenuItem>
                        </Menu>
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
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
