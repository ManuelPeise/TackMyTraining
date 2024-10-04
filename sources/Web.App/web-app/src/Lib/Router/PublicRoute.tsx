import { Grid2 } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
  return (
    <Grid2 container spacing={2} padding="0 0 0 15px">
      <Grid2 size="grow" display="flex" justifyContent="center" padding="0 24px 0px 0" height="90vh">
        <Outlet />
      </Grid2>
    </Grid2>
  );
};

export default PublicRoute;
