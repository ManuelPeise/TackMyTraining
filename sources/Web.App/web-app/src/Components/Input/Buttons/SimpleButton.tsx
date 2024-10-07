import { SxProps, Theme } from '@mui/material';
import React from 'react';
import { StyledButton } from 'src/Components/Styled/StyledButton';

interface IProps {
  sx?: SxProps<Theme>;
  label: string;
  disabled?: boolean;
  onAction: () => void | Promise<void>;
}

const SimpleButton: React.FC<IProps> = (props) => {
  const { label, disabled, sx, onAction } = props;
  //   const theme = useTheme();
  return (
    <StyledButton disabled={disabled} sx={sx} onClick={onAction}>
      {label}
    </StyledButton>
  );
};

export default SimpleButton;
