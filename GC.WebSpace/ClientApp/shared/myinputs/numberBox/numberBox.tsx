import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

interface IProps {
    label: string,
    value?: number | null,
    min?: number,
    required?: boolean,
    disabled?: boolean,
    variant?: 'standard' | 'filled' | 'outlined',
    onChange: (value: number | null) => void
}

export default function NumberBox(props: IProps) {
    const [value, setValue] = React.useState<number | null>(null);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const number = event.target.value == '' ? null : Number(event.target.value);
        if (props.onChange == undefined) return setValue(number);
        if (props.min != undefined && number != null && props.min > number) {
            if (props.value == undefined) setValue(0);
            return props.onChange(0);
        }

        if (props.value == undefined) setValue(number);
        props.onChange(number);
    }

    return (
        <TextField
            autoComplete='off'
            fullWidth
            type='number'
            variant={props.variant ?? 'filled'}
            value={props.value ?? value}
            label={props.label}
            disabled={props.disabled ?? false}
            required={props.required ?? false}
            onChange={onChange}
            sx={{
                my: '5px',
            }}
        />
    );
}