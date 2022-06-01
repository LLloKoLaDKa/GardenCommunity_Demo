import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

interface IProps {
    fullWidth?: boolean,
    icon?: React.ReactNode,
    disabled?: boolean,
    text: string,
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info',
    variant?: 'contained' | 'outlined' | 'text'
    onClick: () => void
}

const style = {
    // border: '1px solid transparent',
    my: '5px',

    '&:hover': {
        // background: 'transparent',
        // color: 'var(--main_color)',
        // borderColor: 'var(--main_color)'
    },

    '&:active, &:focus': {
        outline: 'none',
    }
};

export class MyMainButton extends React.Component<IProps> {
    render() {
        const { children, fullWidth, color, icon, text, disabled, variant, onClick } = this.props;

        return <>
            <Button
                variant={variant ?? 'contained'}
                sx={style}
                onClick={onClick}
                fullWidth={fullWidth}
                color={color}
                startIcon={icon}
                inputMode='text'
                type='button'
                disabled={disabled}
            >
                <Typography>{text}</Typography>
            </Button>
        </>
    }
}