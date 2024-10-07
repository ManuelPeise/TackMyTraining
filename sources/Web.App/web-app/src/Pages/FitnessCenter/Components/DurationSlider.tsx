import { Box, Typography } from '@mui/material';
import React from 'react';
import { StyledSlider } from 'src/Components/Styled/StyledSlider';

interface IProps {
  value: number;
  label: string;
  maxValue?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

const DurationSlider: React.FC<IProps> = (props) => {
  const { label, value, maxValue, disabled, onChange } = props;

  const handleChange = React.useCallback(
    (e: Event, value: number | number[], activeThumb: number) => {
      onChange(value as number);
    },
    [onChange]
  );

  return (
    <Box>
      <Typography variant="h6">{label.replace('{value}', value.toString())}</Typography>
      <StyledSlider value={value} step={1} disabled={disabled} max={maxValue ?? 100} onChange={handleChange} />
    </Box>
  );
};

export default DurationSlider;
