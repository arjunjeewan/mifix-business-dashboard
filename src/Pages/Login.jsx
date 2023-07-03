import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PoweredByNST from '../Assets/PoweredByNST.svg';
import { Login } from '../Service/auth.service';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import LoginRectangle from '../Assets/LoginRectangle.svg';
import MifixLogo from '../Assets/MIFIX.png';
import packageJson from '../../package.json';

const theme = createTheme();

export default function LogIn() {
    if (window.sessionStorage.getItem('token')) {
        window.sessionStorage.clear();
    }
    const version = packageJson.version;
    const [error, setError] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [loginError, setLoginError] = React.useState({
        errorState: false,
        errorMessage: '',
    });

    const [formData, setFormData] = React.useState({
        Email: '',
        Password: '',
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);
        if (formData.Email === '' || formData.Password === '') {
            setError(true);
        } else {
            event.preventDefault();
            setLoading(true);
            Login(data.get('Email'), data.get('Password')).then((res) => {
                setLoading(false);
                if (res?.status === 1) {
                    const role = res.data.userType;
                    if (role === 'operational') {
                        navigate('/form');
                    } else if (role === 'business') {
                        navigate('/businessdashboard');
                    } else if (role === 'dataadmin') {
                        navigate('/businessdashboard');
                    }
                } else {
                    setLoginError({
                        ...loginError,
                        errorState: true,
                        errorMessage: res?.message,
                    });
                }
            });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '100vh', backgroundColor: '#f3f3f3' }}
            >
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper
                        elevation={10}
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            padding: '2rem',
                            backgroundColor: '#FFF',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12} align="center">
                                <img
                                    src={MifixLogo}
                                    alt="logo"
                                    style={{ height: '70px', width: '200px' }}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    sx={{ color: '#000000' }}
                                >
                                    Business Dashboard
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ color: '#000000' }}
                                >
                                    Alpha <b>v{version}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <img src={LoginRectangle} alt="main rect" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    color="error"
                                    fullWidth
                                    variant="outlined"
                                    id="Email"
                                    error={error && formData.Email === ''}
                                    helperText={
                                        error && formData.Email === ''
                                            ? 'Email Required'
                                            : ''
                                    }
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        if (
                                            !newValue.match(
                                                /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu
                                            )
                                        ) {
                                            setFormData({
                                                ...formData,
                                                Email: e.target.value,
                                            });
                                        }
                                    }}
                                    placeholder="Enter your Email"
                                    name="Email"
                                    autoComplete="off"
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon
                                                    style={{ color: '#C4C4C4' }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    color="error"
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            Password: e.target.value,
                                        });
                                    }}
                                    error={error && formData.Password === ''}
                                    helperText={
                                        error && formData.Password === ''
                                            ? 'Password Required'
                                            : ''
                                    }
                                    name="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="Password"
                                    placeholder="Enter your Password"
                                    autoComplete="off"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon
                                                    style={{ color: '#C4C4C4' }}
                                                />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#B31B1B',
                                        color: '#FFF',
                                        borderRadius: '0.5rem',
                                        '&:hover': {
                                            backgroundColor: '#CA0123',
                                        },
                                    }}
                                    disabled={
                                        formData.Email === '' ||
                                        formData.Password === ''
                                    }
                                >
                                    {loading ? (
                                        <CircularProgress
                                            size={20}
                                            sx={{ color: '#FFF' }} // Set the color to white (#FFF)
                                        />
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            </Grid>
                            {loginError.errorState && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        {loginError.errorMessage}
                                    </Alert>
                                </Grid>
                            )}
                            <Grid item xs={12} align="center">
                                <img
                                    width="50%"
                                    src={PoweredByNST}
                                    alt="powered by NST"
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
