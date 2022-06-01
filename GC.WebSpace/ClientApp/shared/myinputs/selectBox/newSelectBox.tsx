import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Option } from './option';

interface IProps<T> {
    value: Option<T> | null,
    options: Option<T>[],
    label: string,
    required?: boolean,
    disabled?: boolean,
    onChange: (objectId: Option<T> | null) => void
}

export default function NewSelectBox<T>(props: IProps<T>) {
    const [inputValue, setInputValue] = React.useState('');

    return (
        <Autocomplete
            disabled={props.disabled}
            value={props.value}
            onChange={(event: any, newValue: Option<T> | null) => {
                props.onChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            noOptionsText="Нет вариантов для выбора"
            options={props.options}
            sx={{ my: '5px' }}
            renderInput={(params) => <TextField required={props.required} {...params} variant='filled' label={props.label} />}
        />
    );
}