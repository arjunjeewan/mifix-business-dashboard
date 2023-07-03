import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../Service/auth.service';

const PrivateRoutes = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
