import * as React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Tooltip } from '@mui/material';

export default function VerticalToggleButtons({ view, toggleOnChange }) {
    const toggleOnClick = (val) => {
        toggleOnChange(val);
    };

    return (
        <ToggleButtonGroup
            value={view}
            exclusive
            sx={{ height: 40, paddingLeft: '20px', margin: '15px 0 0 0' }}
        >
            <Tooltip title="Past trends">
                <ToggleButton
                    value="trend"
                    aria-label="trend"
                    onClick={() => toggleOnClick('trend')}
                >
                    <TrendingUpIcon />
                </ToggleButton>
            </Tooltip>
            <Tooltip title="Chart">
                <ToggleButton
                    value="chart"
                    aria-label="chart"
                    onClick={() => toggleOnClick('chart')}
                >
                    <BarChartIcon />
                </ToggleButton>
            </Tooltip>
        </ToggleButtonGroup>
    );
}
