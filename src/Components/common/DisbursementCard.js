import React, { useRef, useState, useEffect } from 'react';
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
import downloadImage from '../../utils/downloadImage';
import shareImage from '../../utils/shareImage';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';

const DisbursementCard = ({ cardValue, cardType }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 850);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 850);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    let onOrTill;
    if (cardValue.type === 'day') {
        onOrTill = 'on';
    } else if (cardValue.type === 'month') {
        onOrTill = 'till';
    } else if (cardValue.type === 'overall') {
        onOrTill = 'till';
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
                                {cardValue.month} ({onOrTill} {cardValue.date})
                            </Typography>
                        </Grid>
                    </Grid>
                    {cardValue.trend && (
                        <>
                            {cardValue.icon}
                            <span style={{ color: cardValue.color }}>
                                {cardValue.trend.replaceAll('-', '')}
                            </span>
                        </>
                    )}
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
                                    sx={{ color: '#909090', fontSize: '0.8em' }}
                                >
                                    Prospects Sourced
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{ display: 'flex', justifyContent: 'right' }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        color: '#000',
                                        fontSize: '0.8em',
                                    }}
                                >
                                    {cardValue.prospectsourced != null ? (
                                        <>
                                            {Number(
                                                cardValue.prospectsourced
                                            )?.toLocaleString('en-IN')}
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
                                    sx={{ color: '#909090', fontSize: '0.8em' }}
                                >
                                    Credit Accepted
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{ display: 'flex', justifyContent: 'right' }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        color: '#000',
                                        fontSize: '0.8em',
                                    }}
                                >
                                    {cardValue.creditAccepted != null ? (
                                        <>
                                            {Number(
                                                cardValue.creditAccepted
                                            )?.toLocaleString('en-IN')}
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
                                    sx={{ color: '#909090', fontSize: '0.8em' }}
                                >
                                    Disbursed
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{ display: 'flex', justifyContent: 'right' }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        color: '#000',
                                        fontSize: '0.8em',
                                    }}
                                >
                                    {cardValue.disbursed != null ? (
                                        <>
                                            {Number(
                                                cardValue.disbursed
                                            )?.toLocaleString('en-IN')}
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
                                    sx={{ color: '#909090', fontSize: '0.8em' }}
                                >
                                    Disbursed Amount
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{ display: 'flex', justifyContent: 'right' }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        color: '#000',
                                        fontSize: '0.8em',
                                    }}
                                >
                                    {cardValue.disbursedamount != null ? (
                                        <>
                                            ₹
                                            {Number(cardValue.disbursedamount) >=
                                            10000
                                                ? (
                                                      Number(
                                                          cardValue.disbursedamount
                                                      ) / 10000000
                                                  ).toFixed(2) + ' Cr'
                                                : Number(
                                                      cardValue.disbursedamount
                                                  ) === 0
                                                ? Number(cardValue.disbursedamount)
                                                : (
                                                      Number(
                                                          cardValue.disbursedamount
                                                      ) / 100000
                                                  ).toFixed(4) + ' Lakh'}
                                        </>
                                    ) : (
                                        <>N/A</>
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        {cardValue.type === 'day' &&
                            cardValue.jlg === 'overall' &&
                            cardValue.dbPipeline !== null && (
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
                                            DB Pipeline
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
                                            {cardValue.dbPipeline === null ||
                                            cardValue.dbPipeline === 0 ? (
                                                <>N/A</>
                                            ) : (
                                                <>
                                                    {Number(
                                                        cardValue.dbPipeline
                                                    )?.toLocaleString('en-IN')}
                                                </>
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                        {cardValue.type === 'month' &&
                            cardValue.jlg === 'overall' &&
                            cardType !== null &&
                            !isSmallScreen && (
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
                                        visibility: 'hidden',
                                    }}
                                >
                                    <Grid item xs={6}>
                                        <Typography
                                            sx={{
                                                color: '#909090',
                                                fontSize: '0.8em',
                                            }}
                                        >
                                            DB Pipeline
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
                                            {cardValue.dbPipeline === null ||
                                            cardValue.dbPipeline === 0 ? (
                                                <>N/A</>
                                            ) : (
                                                <>{cardValue.dbPipeline}</>
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )}
                    </Grid>
                </CardActions>
            </Card>
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
};

export default DisbursementCard;
