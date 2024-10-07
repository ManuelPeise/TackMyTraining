import React from 'react';
import { FormControl, MenuItem, SelectChangeEvent, Typography } from '@mui/material';

import { useI18n } from 'src/Hooks/useI18n';
import { StyledSelect } from 'src/Components/Styled/StyledDropdown';

export type DropdownItemProps = {
  value: number;
  resourceKey: string;
  disabled: boolean;
};

interface IProps {
  id: string;
  fullWidth?: boolean;
  value: number;
  items: DropdownItemProps[];
  disabled?: boolean;
  handleChange: (value: number) => void;
}

export const Dropdown: React.FC<IProps> = (props) => {
  const { id, fullWidth, items, value, disabled, handleChange } = props;
  const { getResource } = useI18n();

  const onChange = React.useCallback(
    (e: SelectChangeEvent<number>) => {
      if (e.target != null) handleChange(e.target.value as number);
    },
    [handleChange]
  );

  return (
    <FormControl fullWidth={fullWidth} disabled={disabled}>
      <StyledSelect id={id} variant="standard" value={value} onChange={onChange}>
        {items.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value} selected={item.value === value} disabled={item.disabled}>
              <Typography variant="h6">{getResource(item.resourceKey)}</Typography>
            </MenuItem>
          );
        })}
      </StyledSelect>
    </FormControl>
  );
};

export default Dropdown;
