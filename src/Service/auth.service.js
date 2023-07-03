import { environment } from '../Environment/environment';
import { setAuthToken } from './auth.header';

export const Login = (Email, Password) => {
    return fetch(`${environment.apiUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Email,
            Password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.data?.token) {
                window.sessionStorage.setItem('user', JSON.stringify(data.data));
                window.sessionStorage.setItem('token', data.data.token);
                window.sessionStorage.setItem('role', data.data.userType);
                const token = data.data.token;
                setAuthToken(token);
            }
            return data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};

export const logout = () => {
    window.sessionStorage.clear();
};

export const getToken = () => {
    return sessionStorage.getItem('token') || null;
};
