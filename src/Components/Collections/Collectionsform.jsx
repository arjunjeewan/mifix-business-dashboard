import React from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Federalcollections from '../Collections/collectionsAccordion/federalcollections';
import Dxbcollections from '../Collections/collectionsAccordion/dxbcollections';

const Collectionsform = ({ bank }) => {
    return <>{bank === '1' ? <Federalcollections /> : <Dxbcollections />}</>;
};

export default Collectionsform;
