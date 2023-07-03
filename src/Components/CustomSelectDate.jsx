import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, Select, MenuItem } from '@mui/material';
import helperService from '../Service/helper.service';
import dayjs from 'dayjs';

export default function CustomDatePicker({
    selectOnChange,
    selectValue,
    fromDateOnChange,
    toDateOnChange,
    dateValue,
    setDateValue,
    graphDate,
    setGraphDate,
}) {
    const handleSelectChange = (selectedValue) => {
        setDropdownDate(selectedValue.target.value);
        if (
            selectedValue.target.value === 10 ||
            selectedValue.target.value === 20 ||
            selectedValue.target.value === 70
        ) {
            selectOnChange({
                value: selectedValue.target.value,
                type: 'day',
            });
        } else
            selectOnChange({
                value: selectedValue.target.value,
                type: 'month',
            });
    };

    const handleFromDateOnChange = (value) => {
        console.log(value);
        fromDateOnChange(value);
    };

    const handleToDateOnChange = (value) => {
        toDateOnChange(value);
    };

    const selectArray = [
        {
            name: 'Last 30 days',
            value: 10,
        },
        {
            name: 'Last 7 days',
            value: 20,
        },
        {
            name: 'Last 3 months',
            value: 30,
        },
        {
            name: 'Last 6 months',
            value: 40,
        },
        {
            name: 'Last 9 months',
            value: 50,
        },
        {
            name: 'Last 13 months',
            value: 60,
        },
        {
            name: 'Last 2 years',
            value: 80,
        },
        {
            name: 'Custom',
            value: 70,
        },
    ];

    const setDropdownDate = (selectValue) => {
        if (selectValue === 10) {
            setGraphDate({
                ...graphDate,
                from: helperService.last30daysDateRange()[0],
                to: helperService.last30daysDateRange()[1],
            });
        } else if (selectValue === 20) {
            setGraphDate({
                ...graphDate,
                from: helperService.last7daysDateRange()[0],
                to: helperService.last7daysDateRange()[1],
            });
        } else if (selectValue === 30) {
            setGraphDate({
                ...graphDate,
                from: helperService.getDate3MonthsAgoTodayYYYYMMDD(),
                to: helperService.getTodayYYYYMMDD(),
            });
        } else if (selectValue === 40) {
            setGraphDate({
                ...graphDate,
                from: helperService.getDate6MonthsAgoTodayYYYYMMDD(),
                to: helperService.getTodayYYYYMMDD(),
            });
        } else if (selectValue === 50) {
            setGraphDate({
                ...graphDate,
                from: helperService.getDate9MonthsAgoTodayYYYYMMDD(),
                to: helperService.getTodayYYYYMMDD(),
            });
        } else if (selectValue === 60) {
            setGraphDate({
                ...graphDate,
                from: helperService.getDate13MonthsAgoTodayYYYYMMDD(),
                to: helperService.getTodayYYYYMMDD(),
            });
        } else if (selectValue === 80) {
            setGraphDate({
                ...graphDate,
                from: helperService.getDate2YearsAgoTodayYYYYMMDD(),
                to: helperService.getTodayYYYYMMDD(),
            });
        } else if (selectValue === 70) {
            setDateValue({
                ...dateValue,
                from: dayjs(),
                to: dayjs(),
            });
        }
    };

    return (
        <>
            {' '}
            <FormControl size="small">
                {' '}
                <Select
                    onChange={handleSelectChange}
                    defaultValue={selectValue}
                    value={selectValue}
                    sx={{
                        backgroundColor: '#FFF',
                        borderRadius: '20px',
                        borderColor: 'none',
                        color: 'black',
                        margin: '15px 0 0 0',
                    }}
                >
                    {' '}
                    {Array.from(selectArray).map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {' '}
                            {option.name}{' '}
                        </MenuItem>
                    ))}{' '}
                </Select>{' '}
            </FormControl>{' '}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {' '}
                {selectValue === 70 && (
                    <>
                        {' '}
                        <DesktopDatePicker
                            label="From Date"
                            value={dateValue.from}
                            maxDate={dayjs()}
                            minDate={dayjs().subtract(63, 'day')}
                            onChange={handleFromDateOnChange}
                            slotProps={{
                                textField: {
                                    variant: 'outlined',
                                    size: 'small',
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 50,
                                            backgroundColor: '#FFF',
                                            '& fieldset': {
                                                borderColor: 'none',
                                            },
                                        },
                                        margin: '15px 0 0 0',
                                        width: '170px',
                                    },
                                },
                            }}
                        />{' '}
                        <DesktopDatePicker
                            label="To Date"
                            value={dateValue.to}
                            maxDate={dayjs()}
                            minDate={dateValue.from}
                            onChange={handleToDateOnChange}
                            slotProps={{
                                textField: {
                                    variant: 'outlined',
                                    size: 'small',
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 50,
                                            backgroundColor: '#FFF',
                                            '& fieldset': {
                                                borderColor: 'none',
                                            },
                                        },
                                        margin: '15px 0 0 0',
                                        width: '170px',
                                    },
                                },
                            }}
                        />{' '}
                    </>
                )}{' '}
            </LocalizationProvider>{' '}
        </>
    );
}
