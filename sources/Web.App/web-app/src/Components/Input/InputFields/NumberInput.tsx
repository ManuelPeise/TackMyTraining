import React from 'react';
import { StyledTextField } from 'src/Components/Styled/StyledInput';

interface IProps {
  value: number | null;
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<IProps> = (props) => {
  const { fullWidth, value, required, disabled, label, onChange } = props;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const stringValue = e.currentTarget.value.replace(/[^0-9]/g, '');

      if (stringValue.length === 0) {
        if (value != null) {
          onChange(value);
        }
        onChange(null);
      } else if (stringValue.match(/[0-9]/g)) {
        onChange(parseFloat(stringValue));
      }
    },
    [value, onChange]
  );

  return (
    <StyledTextField
      required={required}
      fullWidth={fullWidth}
      label={label}
      type="text"
      variant="standard"
      disabled={disabled}
      value={value == null ? '' : value}
      slotProps={{
        input: {
          slotProps: {
            input: {
              style: {
                textAlign: 'right',
                MozAppearance: 'textfield',
              },
            },
          },
        },
      }}
      onChange={handleChange}
    />
  );
};

export default NumberInput;
