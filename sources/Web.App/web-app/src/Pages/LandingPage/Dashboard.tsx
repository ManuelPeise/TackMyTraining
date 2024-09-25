import { Grid2 } from '@mui/material';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <Grid2
      sx={{ width: '100%', height: '100vh', display: 'flex' }}
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <div>Dashboard</div>
    </Grid2>
  );
};

export default Dashboard;
