import { Visibility, VisibilityOff } from "@mui/icons-material";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import React from "react";

interface IProps {
    value: string,
    label: string,
    onChange: (password: string) => void,
}

export default function PasswordBox(props: IProps) {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(event.target.value);
    }

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    };

    function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    };

    return <>
        <FormControl fullWidth variant="filled" sx={{ my: '5px' }}>
            <InputLabel htmlFor="filled-adornment-password">{props.label}</InputLabel>
            <FilledInput
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                value={props.value}
                onChange={handlePassword}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    </>
}