import { Grid2 } from '@mui/material';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { colors } from '../colors';

const PrivateAppRoute: React.FC = () => {
  const { isAuthenticated } = useAuthentication();

  return isAuthenticated ? (
    <Grid2 container size={12}>
      <Grid2 bgcolor={colors.buttons.BackgroundDisabled} height={200} size={2}>
        Menu
      </Grid2>
      <Grid2 size={10}>
        <Outlet />
      </Grid2>
    </Grid2>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateAppRoute;
