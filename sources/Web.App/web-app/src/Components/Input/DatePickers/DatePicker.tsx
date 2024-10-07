import React from 'react';
import moment, { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/material';

interface IProps {
  value: string;
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  format?: 'DD.MM.YYYY' | 'DD.MM.YYYY HH:mm';
  position?: 'start' | 'end' | 'center';
  maxDate?: moment.Moment;
  includeTime?: boolean;
  handleChange: (value: moment.Moment) => void;
}

const DatePicker: React.FC<IProps> = (props) => {
  const { value, disabled, label, fullWidth, maxDate, includeTime, format, handleChange } = props;

  const onChange = React.useCallback(
    (newValue: Moment | null) => {
      handleChange(newValue);
    },
    [handleChange]
  );

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {!includeTime ? (
          <DesktopDatePicker
            label={label}
            sx={fullWidth ? { width: '100%' } : {}}
            format={format}
            value={moment(value)}
            disabled={disabled}
            onChange={onChange}
            maxDate={maxDate}
            slotProps={{ textField: { variant: 'standard' } }}
          />
        ) : (
          <DateTimePicker
            orientation="portrait"
            label={label}
            sx={fullWidth ? { width: '100%' } : {}}
            format={format}
            value={moment(value as string)}
            disabled={disabled}
            onChange={onChange}
            maxDate={maxDate}
            ampmInClock={false}
            ampm={false}
            minutesStep={5}
            slotProps={{ textField: { variant: 'standard' } }}
          />
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default DatePicker;
