import { ListItem, TextField } from '@mui/material';
import React from 'react';
import { TValue } from 'src/customTypes';
import { DataTypeEnum } from 'src/Lib/Enums/DataTypeEnum';

interface IProps {
  dataType: DataTypeEnum;
  value: string | number | boolean;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  propertyName: string;
  onChange: (value: TValue) => void;
}

const FormTextFieldItem: React.FC<IProps> = (props) => {
  const { dataType, disabled, fullWidth, value, label, propertyName, helperText, onChange } = props;

  console.log('value:', value);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value as string;
      onChange(value);
    },
    [onChange]
  );

  const getDataType = React.useCallback((dataType: DataTypeEnum): 'text' | 'password' | 'number' => {
    switch (dataType) {
      case DataTypeEnum.Text:
        return 'text';
      case DataTypeEnum.Password:
        return 'password';
      case DataTypeEnum.Boolean:
      case DataTypeEnum.Number:
        return 'number';
    }
  }, []);

  return (
    <ListItem key={propertyName}>
      <TextField
        id={`field-${propertyName}`}
        type={getDataType(dataType)}
        autoComplete="off"
        variant="outlined"
        disabled={disabled}
        fullWidth={fullWidth}
        label={label}
        value={value ?? ''}
        helperText={helperText && helperText}
        onChange={handleChange}
      />
    </ListItem>
  );
};

export default FormTextFieldItem;
