import { Slider, styled } from '@mui/material';

export const StyledSlider = styled(Slider)(() => ({
  color: '#3a8589',
  height: 0.5,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: '#525252',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 4px rgba(58, 133, 137, 0.16)',
    },
  },
  '& .Mui-disabled': {
    color: '#141414',
    backgroundColor: '#141414',
  },
  '& .MuiSlider-track': {
    height: 3,
    color: '#858585',
  },
  '& .MuiSlider-rail': {
    color: '#292929',
    opacity: 1,
    height: 3,
  },
}));
