import { Box } from '@mui/material';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AppSideBar from 'src/Components/Menus/AppSideBar';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import 'src/index.css';

interface IPops {}

const PrivateAppRoute: React.FC<IPops> = (props) => {
  const { isAuthenticated } = useAuthentication();

  return isAuthenticated ? (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="15px" padding="0 15px 0 15px">
      <Box gridColumn="1 / span 2">
        <AppSideBar />
      </Box>
      <Box gridColumn="3 / span 10">
        <Outlet />
      </Box>
    </Box>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateAppRoute;
