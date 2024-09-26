import { Grid2 } from '@mui/material';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import AppSideMenu from 'src/Components/Menus/AppSideMenu';

const PrivateAppRoute: React.FC = () => {
  const { isAuthenticated } = useAuthentication();

  return isAuthenticated ? (
    <Grid2 id="page-container" size={12}>
      <Grid2 container size={12}>
        <Grid2 container size={{ xs: 5, sm: 4, md: 3, xl: 2 }}>
          <AppSideMenu />
        </Grid2>
        <Grid2 container size={{ xs: 7, sm: 8, md: 9, xl: 10 }}>
          <Outlet />
        </Grid2>
      </Grid2>
    </Grid2>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateAppRoute;
