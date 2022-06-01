import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

interface IProps {
    value?: string,
    label: string,
    required?: boolean,
    variant?: 'standard' | 'filled' | 'outlined',
    multiline?: boolean,
    disabled?: boolean,
    onChange?: (inputValue: string) => void
}

interface IState {
    value: string
}

export class TextBox extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            value: this.props.value ?? ''
        }
    }

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const { onChange } = this.props;
        if (onChange == undefined) return this.setState({ value: value });

        this.setState({ value: value }, () => onChange(value));
    }

    render() {
        const { label, required, variant, multiline, disabled } = this.props;
        const rows: number = multiline ? 4 : 1;

        return <>
            <TextField
                disabled={disabled}
                multiline={multiline}
                autoComplete='off'
                type='text'
                minRows={rows}
                fullWidth
                required={required}
                value={this.state.value}
                label={label}
                variant={variant ?? 'filled'}
                onChange={this.onChange}
                sx={{
                    my: '5px',
                }}
            />
        </>
    }
}