import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

interface IProps {
  ringColor: string;
  color: string;
  label: string;
  subLabel?: string;
}

const RingWithLabel: React.FC<IProps> = (props) => {
  const { ringColor, color, label, subLabel } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80px',
        width: '80px',
        borderRadius: '50%',
        backgroundColor: ringColor,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '70px',
          width: '70px',
          borderRadius: '50%',
          padding: 0,
          margin: 0,
        }}
      >
        <Typography sx={{ position: 'absolute', top: 6, fontSize: '1.3rem', fontWeight: 'bold', color: color }}>
          {label}
        </Typography>
        <Typography sx={{ position: 'absolute', top: 36, fontSize: '.8rem', fontWeight: 'bold', color: color }}>
          {subLabel}
        </Typography>
      </Paper>
    </Box>
  );
};

export default RingWithLabel;
