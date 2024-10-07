import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)(() => ({
  color: '#858585',
  border: '1px solid #c2c2c2',
  fontSize: '1rem',
  maxHeight: '3rem',
  '&.MuiButtonBase-root:hover': {
    color: '#c2c2c2',
    border: '1px solid #a3a3a3',
  },
}));
