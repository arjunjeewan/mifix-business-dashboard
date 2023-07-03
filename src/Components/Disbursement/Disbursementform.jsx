import React, { useState } from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Jlgform from '../Disbursement/DisbursementAccordion/jlgform';
import Agriform from '../Disbursement/DisbursementAccordion/agriform';
import Dxb from '../Disbursement/DisbursementAccordion/dxbform';

const Disbursementform = ({ bank, formdate }) => {
    const [product, setProduct] = useState('JLG');
    const handleproductChange = (event) => {
        setProduct(event.target.value);
    };
    return (
        <div style={{ margin: '0% 2% 2% 2%' }}>
            {bank === '1' && (
                <FormControl sx={{ width: '20%', marginBottom: '2%' }}>
                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product}
                        label="Product"
                        onChange={handleproductChange}
                    >
                        <MenuItem value="JLG">JLG</MenuItem>
                        <MenuItem value="AGRI">AGRI</MenuItem>
                    </Select>
                </FormControl>
            )}
            {product === 'JLG' && bank === '1' ? (
                <Jlgform />
            ) : bank === '1' ? (
                <Agriform />
            ) : (
                <Dxb />
            )}
        </div>
    );
};

export default Disbursementform;
