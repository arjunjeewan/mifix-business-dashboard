import React, { useState } from 'react';

import Dxbaudit from '../Audit/auditAccordion/dxbaudit';
import Federalaudit from '../Audit/auditAccordion/federalaudit';

const Auditform = ({ bank }) => {
    return <>{bank === '1' ? <Federalaudit /> : <Dxbaudit />}</>;
};

export default Auditform;
