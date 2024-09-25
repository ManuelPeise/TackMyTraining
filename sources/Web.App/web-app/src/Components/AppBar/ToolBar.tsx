import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';
import { useCustomHooks } from 'src/Hooks/useCustomHooks';
import { useI18n } from 'src/Hooks/useI18n';

const AppToolBar: React.FC = () => {
  const { isAuthenticated, userData, onLogout } = useAuthentication();
  const l = useCustomHooks.useLocation();
  const { getResource } = useI18n();
  const navigate = useNavigate();

  return (
    <AppBar color="default">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: '#3236a8', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <Button onClick={() => navigate('/')}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: '#3236a8', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {process.env.REACT_APP_TITLE}
            </Typography>
          </Button>
        </Typography>
        {!isAuthenticated && (
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {(l.pathname as string) !== '/login' && (
              <Button key="login-nav-button" sx={{ color: '#329ea8' }} onClick={() => navigate('/login')}>
                {getResource('common:labelLogin')}
              </Button>
            )}
            {!isAuthenticated && (l.pathname as string) !== '/register' && (
              <Button key="register-nav-button" sx={{ color: '#329ea8' }} onClick={() => navigate('/register')}>
                {getResource('common:labelRegister')}
              </Button>
            )}
          </Box>
        )}
        {isAuthenticated && (
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#329ea8' }} disabled>
              <Typography
                variant="button"
                component="div"
                sx={{ color: '#05b0fa', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Logged in as {userData?.displayName}
              </Typography>
            </Button>
            <Button sx={{ color: '#329ea8' }} onClick={onLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;
