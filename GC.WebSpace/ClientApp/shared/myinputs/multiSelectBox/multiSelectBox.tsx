import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { id } from "../../../tools/id/id";
import { Option } from '../selectBox/option';

interface IProps {
    options: Option<string>[],
    values: string[],
    label: string,
    onChange: (ids: string[]) => void
}

export function MultiSelectBox(props: IProps) {
    const handleChange = (event: SelectChangeEvent<typeof props.values>) => {
        const { target: { value } } = event;
        const values = typeof value == 'string' ? value.split(',') : value;

        props.onChange(values);
    }

    function renderChip(id: string) {
        const option = props.options.find(o => o.value == id)
        if (option == undefined) return;

        return <Chip key={option.value} label={option.label} />
    }

    const labelId = id();

    return (
        <FormControl variant="filled" fullWidth sx={{ my: '5px' }}>
            <InputLabel id={labelId}>{props.label}</InputLabel>
            <Select
                labelId={labelId}
                multiple
                value={props.values}
                onChange={handleChange}
                renderValue={(selectedId) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedId.map((value) => renderChip(value))}
                    </Box>
                )}
            >
                {props.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        <Checkbox checked={props.values.indexOf(option.value) > -1} />
                        <ListItemText primary={option.label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}