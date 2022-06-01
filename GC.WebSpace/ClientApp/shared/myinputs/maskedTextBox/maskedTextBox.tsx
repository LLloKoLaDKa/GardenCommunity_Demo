import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import ReactInputMask from "react-input-mask";

interface IProps {
    mask: string,
    value: string | null,
    label: string,
    required?: boolean,
    variant?: 'standard' | 'filled' | 'outlined',
    onChange: (phone: string) => void,
}

export class MaskedTextBox extends React.Component<IProps> {

    render() {
        const { value, label, required, variant, mask, onChange } = this.props;

        return <>
            <ReactInputMask
                alwaysShowMask
                mask={mask}
                value={value ?? undefined}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}>
                {() => <TextField
                    autoComplete='off'
                    fullWidth
                    required={required}
                    label={label}
                    variant={variant ?? 'filled'}
                    sx={{
                        my: '5px',
                    }}
                />}
            </ReactInputMask>
        </>
    }
}