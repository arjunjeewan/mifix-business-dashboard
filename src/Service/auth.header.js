import axios from 'axios';

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else delete axios.defaults.headers.common['Authorization'];

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401 || 500) {
                window.sessionStorage.clear();
                window.location.href = '/login';
            }
        }
    );
};
