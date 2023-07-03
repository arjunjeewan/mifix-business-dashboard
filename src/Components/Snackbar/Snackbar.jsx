import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Action = ({ open, setOpen, graphDate, type }) => {
    let day = new Date(graphDate).getDate();
    let month = new Date(graphDate).getMonth() + 1;
    let year = new Date(graphDate).getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    const formattedToday = day + '/' + month + '/' + year;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <div>
            {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%', marginTop: '64px' }}
                >
                    {type === 'audit' ? (
                        <>No data available on {formattedToday}</>
                    ) : (
                        <>No data available for the selected date</>
                    )}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Action;
