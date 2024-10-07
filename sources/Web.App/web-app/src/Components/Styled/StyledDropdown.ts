import styled from '@emotion/styled';
import { Select } from '@mui/material';

export const StyledSelect = styled(Select)(() => ({
  fontSize: '1rem',
  '&.MuiInput-underline:before': {
    borderBottom: `1px solid #858585`,
  },
  /* hover */
  '&.MuiInput-underline:hover:before': {
    borderBottom: `1px solid #666666`,
  },
  /* focused */
  '&.MuiInput-underline:after': {
    borderBottom: `1px solid #858585`,
  },
}));
