import { FormControlLabel } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import React from "react";

interface IProps {
    checked: boolean,
    label: string,
    disabled?: boolean,
    onChange: (value: boolean) => void
}

export function CheckBox(props: IProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.checked);
    };

    return (
        <FormControlLabel
            sx={{ margin: '0px' }}
            control={<Checkbox checked={props.checked} disabled={props.disabled} onChange={handleChange} />}
            label={props.label}
        />
    );
}