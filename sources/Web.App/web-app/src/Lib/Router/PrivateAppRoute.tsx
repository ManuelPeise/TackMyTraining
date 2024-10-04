import { Grid2 } from '@mui/material';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AppSideBar from 'src/Components/Menus/AppSideBar';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import 'src/index.css';

interface IPops {
  currentRoute: string;
  handleRouteChanged: (route: string) => void;
}

const PrivateAppRoute: React.FC<IPops> = (props) => {
  const { currentRoute, handleRouteChanged } = props;
  const { isAuthenticated } = useAuthentication();

  return isAuthenticated ? (
    <Grid2 container spacing={2} padding="0 0 0 15px">
      <Grid2 height="90vh">
        <AppSideBar currentRoute={currentRoute} handleRouteChanged={handleRouteChanged} />
      </Grid2>
      <Grid2 size="grow" display="flex" justifyContent="center" padding="0 24px 0px 0" height="90vh">
        <Outlet />
      </Grid2>
    </Grid2>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateAppRoute;
