import React, { useState } from 'react';
import Header from '../Components/Header';
import NavBar from '../Components/Sidebar/NavBar';

const BusinessDashboard = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        window.scrollTo(0, 0);
        setValue(newValue);
    };
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
            <Header value={value} handleChange={handleChange} />
            <div
                style={{
                    marginTop: '3.5rem',
                    marginBottom: '4.5rem',
                }}
            >
                <NavBar value={value} handleChange={handleChange} />
            </div>
        </div>
    );
};

export default BusinessDashboard;
