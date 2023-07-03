import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FedMob from '../../Assets/FederalIcon.png';
import DhanMob from '../../Assets/DhanIcon.png';
import { Divider, Paper, useMediaQuery, useTheme } from '@mui/material';
import FederalDash from '../Dashboard/Federal';
import DhanDash from '../Dashboard/Dhanlakshmi';
import UserService from '../../Service/user.service';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function NavBar({ value, handleChange }) {
    const [updatedBy, setUpdatedBy] = useState({});
    // const isMobile = window.innerWidth <= 600; // Define the breakpoint for mobile devices
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const formatDate = (date) => {
        if (date) {
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            let formattedDate = year + '-' + month + '-' + day;
            return formattedDate;
        } else return null;
    };

    const apiCall = async function (fromDate, toDate, bank, state, product) {
        if (product == 'jlg' || product == 'agri') {
            const lastDateData = await UserService.getdisbursementData(
                fromDate,
                toDate,
                bank,
                state,
                product
            )
                .then((res) => {
                    let updatedBy =
                        res?.data[0].data[res?.data[0].data.length - 1].disbursment
                            .updatedBy;
                    let updatedAt =
                        res?.data[0].data[res?.data[0].data.length - 1].disbursment
                            .updatedAt;
                    return { updatedBy: updatedBy, updatedAt: updatedAt };
                })
                .catch((err) => console.log(err));

            return lastDateData;
        } else if (product == 'collection') {
            const lastDateData = await UserService.getcollectionData(
                fromDate,
                toDate,
                bank
            )
                .then((res) => {
                    let updatedBy =
                        res?.data[0].data[res?.data[0].data.length - 1].collections
                            .updatedBy;
                    let updatedAt =
                        res?.data[0].data[res?.data[0].data.length - 1].collections
                            .updatedAt;
                    return { updatedBy: updatedBy, updatedAt: updatedAt };
                })
                .catch((err) => console.log(err));

            return lastDateData;
        } else if (product == 'audit') {
            const lastDateData = await UserService.getauditData(
                fromDate,
                toDate,
                bank,
                state
            )
                .then((res) => {
                    let updatedBy =
                        res?.data[0].data[res?.data[0].data.length - 1].audit
                            .updatedBy;
                    let updatedAt =
                        res?.data[0].data[res?.data[0].data.length - 1].audit
                            .updatedAt;
                    return { updatedBy: updatedBy, updatedAt: updatedAt };
                })
                .catch((err) => console.log(err));

            return lastDateData;
        }
    };

    useEffect(() => {
        (async () => {
            const currDate = new Date();

            const dateBefore20Days = new Date(
                currDate.setDate(currDate.getDate() - 20)
            );
            const fromDate = formatDate(dateBefore20Days);
            const toDate = formatDate(new Date());

            const fedJlgKar = await apiCall(
                fromDate,
                toDate,
                'federal',
                'karnataka',
                'jlg'
            );
            const fedAgriKar = await apiCall(
                fromDate,
                toDate,
                'federal',
                'tamil nadu',
                'agri'
            );
            const fedAuditKar = await apiCall(
                fromDate,
                toDate,
                'federal',
                'maharashtra',
                'audit'
            );
            const fedCollKar = await apiCall(
                fromDate,
                toDate,
                'federal',
                'karnataka',
                'collection'
            );
            const dhanJlgTN = await apiCall(
                fromDate,
                toDate,
                'dhanlaxmi',
                'tamil nadu',
                'jlg'
            );
            const dhanaAuditTN = await apiCall(
                fromDate,
                toDate,
                'dhanlaxmi',
                'tamil nadu',
                'audit'
            );

            const reusableData = {
                banks: {
                    federal: {
                        disbursment: {
                            jlg: {
                                updatedDetails: fedJlgKar,
                            },
                            agri: {
                                updatedDetails: fedAgriKar,
                            },
                        },
                        collection: {
                            updatedDetails: fedCollKar,
                        },
                        audit: {
                            updatedDetails: fedAuditKar,
                        },
                    },
                    dhanlaxmi: {
                        disbursment: {
                            jlg: {
                                tamilnadu: {},
                                updatedDetails: dhanJlgTN,
                            },
                        },
                        collection: {
                            updatedDetails: { user: '', date: '' },
                        },
                        audit: {
                            updatedDetails: dhanaAuditTN,
                        },
                    },
                },
            };

            setUpdatedBy(reusableData);
        })();
    }, []);

    return (
        <>
            <TabPanel value={value} index={0}>
                <FederalDash bankData={updatedBy} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DhanDash bankData={updatedBy} />
            </TabPanel>

            {isMobile && (
                <Box
                    style={{
                        position: 'fixed',
                        bottom: 0,
                    }}
                    sx={{ bgcolor: 'white', width: '100%' }}
                >
                    {/* <footer style={{ position: "sticky", bottom: 0, width: "100%" }}> */}
                    <Divider />
                    <Tabs
                        orientation="horizontal"
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        indicatorColor="#DCDCDC"
                        aria-label="Vertical tabs example"
                        // sx={{ borderRight: 1, borderColor: "divider" }}
                        TabIndicatorProps={{
                            style: {
                                top: 0,
                                bottom: 'auto',
                                borderTop: '3px solid #b4b4b4',
                            },
                        }}
                    >
                        <Tab
                            sx={{
                                borderRight: '2px solid rgba(220, 220, 220, .8)',
                                '&.Mui-selected': {
                                    backgroundColor: '#DCDCDC',
                                },
                            }}
                            icon={
                                <div
                                    style={{
                                        padding: '5px 5px 5px 5px',
                                    }}
                                >
                                    <img
                                        src={FedMob}
                                        alt="bank Logo"
                                        style={{
                                            width: '6vw',
                                        }}
                                    />
                                </div>
                            }
                            iconPosition="end"
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{
                                borderRight: '2px solid rgba(220, 220, 220, .8)',
                                '&.Mui-selected': {
                                    backgroundColor: '#DCDCDC',
                                },
                            }}
                            icon={
                                <div
                                    style={{
                                        padding: '5px 5px 5px 5px',
                                        backgroundColor: '#51024D',
                                    }}
                                >
                                    <img
                                        src={DhanMob}
                                        alt="bank Logo"
                                        style={{
                                            width: '6vw',
                                        }}
                                    />
                                </div>
                            }
                            iconPosition="end"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>
            )}
        </>
    );
}
