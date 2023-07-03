import React, { useEffect, useRef } from 'react';
import {
    Card,
    CardActions,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography,
} from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import UserService from '../../Service/user.service';
import helperService from '../../Service/helper.service';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import downloadImage from '../../utils/downloadImage';
import shareImage from '../../utils/shareImage';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';

export default function CollectionCard() {
    const [monthData, setMonthData] = React.useState([]);

    const getOverallCollection = () => {
        UserService.getcollectionData(
            helperService.last35daysDateRange()[0],
            helperService.last35daysDateRange()[1],
            'federal'
        )
            .then((res) => {
                res.data[0].data.sort((a, b) => {
                    const dateA = new Date(a.date.split('/').reverse().join('-'));
                    const dateB = new Date(b.date.split('/').reverse().join('-'));
                    return dateA - dateB;
                });
                setMonthData(res?.data[0]?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getOverallCollection();
    }, []);

    let lk = monthData.length;

    let mfinal = monthData[lk - 1];
    let mfinal1 = monthData[lk - 2];

    let trend = helperService.calculatePastTrend(
        mfinal1?.collections?.amount,
        mfinal?.collections?.amount
    );
    let trendIcon;
    let trendColor;

    if (trend.substring(0, 1) === '-') {
        trendIcon = <TrendingDownIcon sx={{ color: 'red' }} />;
        trendColor = 'red';
    } else {
        trendIcon = <TrendingUpIcon sx={{ color: 'green' }} />;
        trendColor = 'green';
    }

    const domEl = useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? Math.random() : undefined;

    const downloadOnClick = (cardName) => {
        downloadImage(domEl.current);
    };
    const shareOnClick = (cardName) => {
        shareImage(domEl.current);
    };

    return (
        <>
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
                    <Card
                        elevation={5}
                        sx={{
                            borderRadius: '0.3rem',
                            borderLeft: '0.3rem solid #B31B1B',
                            borderRight: '0.3rem solid #B31B1B',
                            flex: 4,
                        }}
                        ref={domEl}
                    >
                        <CardActions>
                            <Grid container align="center" sx={{ flex: 12 }}>
                                <Grid item align="left" sx={{ mt: 1 }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            color: '#2E2C2D',
                                            fontSize: '1em',
                                            ml: 1,
                                            fontWeight: 700,
                                        }}
                                    >
                                        (as on {mfinal?.date.substring(0, 5)})
                                    </Typography>
                                </Grid>
                            </Grid>
                            {/* {trendIcon} */}
                            {/* <span style={{ color: trendColor }}>
                {trend.replaceAll("-", "")}
              </span> */}
                            <Tooltip title="More Options">
                                <MoreVertIcon
                                    aria-describedby={id}
                                    onClick={handleClick}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Tooltip>
                        </CardActions>
                        <Divider />
                        <CardActions>
                            <Grid container gap={1}>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                    direction="row"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#dcdcdc',
                                        borderRadius: 1,
                                        p: 1,
                                    }}
                                >
                                    <Grid item xs={6}>
                                        <Typography
                                            sx={{
                                                color: '#909090',
                                                fontSize: '0.8em',
                                            }}
                                        >
                                            Demand
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'right',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                color: '#000',
                                                fontSize: '0.8em',
                                            }}
                                        >
                                            {mfinal?.collections?.demandamount !=
                                            null ? (
                                                <>
                                                    ₹
                                                    {
                                                        mfinal?.collections
                                                            ?.demandamount
                                                    }
                                                </>
                                            ) : (
                                                <>N/A</>
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    xs={12}
                                    direction="row"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#dcdcdc',
                                        borderRadius: 1,
                                        p: 1,
                                    }}
                                >
                                    <Grid item xs={6}>
                                        <Typography
                                            sx={{
                                                color: '#909090',
                                                fontSize: '0.8em',
                                            }}
                                        >
                                            Collected
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'right',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                color: '#000',
                                                fontSize: '0.8em',
                                            }}
                                        >
                                            {mfinal?.collections?.amount != null ? (
                                                <>₹{mfinal?.collections?.amount}</>
                                            ) : (
                                                <>N/A</>
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <List>
                    <ListItem disablePadding onClick={shareOnClick}>
                        <ListItemButton>
                            <ListItemText primary="Share" />
                            <ListItemIcon sx={{ minWidth: 'max-content' }}>
                                <ShareIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={downloadOnClick}>
                        <ListItemButton>
                            <ListItemText primary="Download" />
                            <ListItemIcon sx={{ minWidth: 'max-content' }}>
                                <DownloadIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </>
    );
}
