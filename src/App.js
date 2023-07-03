import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './Pages/Login';
import Form from './Pages/Formpage/Form';
import BusinessDashboard from './Pages/BusinessDashboard';
import PrivateRoutes from './Routes/privateRoute';
import { setAuthToken } from './Service/auth.header';

import './Assets/Styles/App.css';

function App() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LogIn />} />
                    <Route exact path="/login" element={<LogIn />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/form" element={<Form />} />
                        <Route
                            path="/businessdashboard"
                            element={<BusinessDashboard />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
