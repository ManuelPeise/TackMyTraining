import { styled, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(() => ({
  fontSize: '1rem',
  '& .MuiFormLabel-root': {
    color: '#858585',
    padding: 0,
    margin: 0,
  },
  '& .MuiInputBase-root': {
    color: '#858585',
    underline: '#858585',
  },
  '.MuiInput-underline:hover:before': {
    borderBottom: '1px solid #c2c2c2',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '1px solid #858585',
  },
  '& .Mui-disabled': {
    color: '#a3a3a3',
    backgroundColor: 'transparent',
    cursor: 'not-allowed',
  },
}));
