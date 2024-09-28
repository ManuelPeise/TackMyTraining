import { Checkbox, FormControlLabel, ListItem, TextField } from '@mui/material';
import React from 'react';
import { TValue } from 'src/customTypes';
import { DataTypeEnum } from 'src/Lib/Enums/DataTypeEnum';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment, { Moment } from 'moment';

interface IProps {
  property: string;
  value: TValue;
  dataType: DataTypeEnum;
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  error: string;
  required: boolean;
  position?: 'start' | 'end' | 'center';
  maxDate?: moment.Moment;
  updateFunction: (value: TValue) => void;
  validationFunction?: (value: TValue) => boolean;
}

const getDataType = (dataType: DataTypeEnum) => {
  switch (dataType) {
    case DataTypeEnum.Text:
      return 'text';
    case DataTypeEnum.Password:
      return 'password';
    case DataTypeEnum.Number:
      return 'text';
    case DataTypeEnum.Boolean:
      return 'boolean';
    case DataTypeEnum.Date:
      return null;
  }
};

const FormTextInput: React.FC<IProps> = (props) => {
  const { property, fullWidth, value, dataType, required, disabled, error, label, updateFunction, validationFunction } =
    props;

  const [isValid, setIsValid] = React.useState<boolean>(true);

  React.useEffect(() => {
    if ((value as string).length === 0) setIsValid(true);
  }, [value]);

  const onBlur = React.useCallback(() => {
    if (validationFunction !== undefined && (value as string).length) {
      const result = validationFunction(value as string);

      setIsValid(result);
    } else {
      setIsValid(true);
    }
  }, [value, validationFunction]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value as string;
      updateFunction(value);
    },
    [updateFunction]
  );

  return (
    <ListItem key={property}>
      <TextField
        id={property}
        required={required}
        fullWidth={fullWidth}
        label={label}
        type={getDataType(dataType)}
        variant="standard"
        disabled={disabled}
        value={value}
        error={!isValid}
        helperText={!isValid ? error : ''}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </ListItem>
  );
};

const FormCheckBox: React.FC<IProps> = (props) => {
  const { property, value, required, disabled, label, updateFunction } = props;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.checked as boolean;
      updateFunction(value);
    },
    [updateFunction]
  );

  return (
    <ListItem>
      <FormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            id={property}
            required={required}
            disabled={disabled}
            checked={value as boolean}
            onChange={handleChange}
          />
        }
        label={label}
        labelPlacement="end"
      />
    </ListItem>
  );
};

const FormDatePicker: React.FC<IProps> = (props) => {
  const { property, value, disabled, label, position, maxDate, updateFunction } = props;

  const handleChange = React.useCallback(
    (newValue: Moment | null) => {
      updateFunction(newValue);
    },
    [updateFunction]
  );

  return (
    <ListItem
      key={property}
      sx={{
        display: 'flex',
        justifyContent: position ?? 'end',
        justifyItems: 'center',
        paddingTop: '1.5rem',
        paddingBottom: '0',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label={label}
          format="DD.MM.YYYY"
          value={moment(value as string)}
          disabled={disabled}
          onChange={handleChange}
          maxDate={maxDate}
          slotProps={{ textField: { variant: 'standard' } }}
        />
      </LocalizationProvider>
    </ListItem>
  );
};

const FormNumberInput: React.FC<IProps> = (props) => {
  const { property, fullWidth, value, dataType, required, disabled, error, label, updateFunction, validationFunction } =
    props;

  const [isValid, setIsValid] = React.useState<boolean>(true);

  React.useEffect(() => {
    if ((value as string).length === 0) setIsValid(true);
  }, [value]);

  const onBlur = React.useCallback(() => {
    if (validationFunction !== undefined && (value as string).length) {
      const result = validationFunction(value as string);
      setIsValid(result);
    } else {
      setIsValid(true);
    }
  }, [value, validationFunction]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentValue = e.currentTarget.value;

      updateFunction(currentValue);
    },
    [updateFunction]
  );

  return (
    <ListItem key={property}>
      <TextField
        id={property}
        required={required}
        fullWidth={fullWidth}
        label={label}
        type={getDataType(dataType)}
        variant="standard"
        disabled={disabled}
        value={value}
        error={!isValid}
        helperText={!isValid ? error : ''}
        slotProps={{
          input: {
            slotProps: {
              input: {
                style: { textAlign: 'right', MozAppearance: 'textfield' },
              },
            },
          },
        }}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </ListItem>
  );
};

const FormInput: React.FC<IProps> = (props) => {
  const { dataType } = props;

  switch (dataType) {
    case DataTypeEnum.Text:
    case DataTypeEnum.Password:
      return <FormTextInput {...props} />;
    case DataTypeEnum.Number:
      return <FormNumberInput {...props} />;
    case DataTypeEnum.Boolean:
      return <FormCheckBox {...props} />;
    case DataTypeEnum.Date:
      return <FormDatePicker {...props} />;
    default:
      throw new Error(`${dataType} is not supported`);
  }
};

export default FormInput;
