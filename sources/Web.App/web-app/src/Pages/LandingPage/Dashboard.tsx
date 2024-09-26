import { Grid2 } from '@mui/material';
import React from 'react';
import DashboardToolbar from 'src/Components/Dashboard/DashboardToolBar';

const Dashboard: React.FC = () => {
  return (
    <Grid2
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        backgroundColor: '#f2f2f2',
        padding: 10,
      }}
      gap={3}
      justifyContent="flex-start"
      alignItems="flex-start"
      alignContent="flex-start"
      direction="column"
      container
    >
      <Grid2 container sx={{ width: '100%' }}>
        <DashboardToolbar />
      </Grid2>
      <Grid2 container direction="row" spacing={0} wrap="wrap" sx={{ width: '100%' }}>
        <Grid2 container spacing={0} rowSpacing={2} columnSpacing={1} sx={{ width: '100%' }}></Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;
