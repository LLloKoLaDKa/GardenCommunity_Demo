import TextField from "@mui/material/TextField";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ruLocale from 'date-fns/locale/ru';
import React from "react";
import styles from './customDatePicker.module.scss';

interface IProps {
    label: string,
    value: Date | null,
    onChange: (date: Date | null) => void
}

export default function CustomDatePicker(props: IProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <DatePicker
                clearable
                label={props.label}
                value={props.value}
                clearText='ОЧИСТИТЬ'
                onChange={(newValue) => props.onChange(newValue)}
                className={styles.date_picker}
                renderInput={(params) => <TextField autoComplete="off" variant='filled' {...params} />}
            />
        </LocalizationProvider>
    );
}