import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import {
  Dashboard,
  HealthAndSafety,
  Science,
  MenuOutlined,
  Menu as MenuIcon,
  AccountCircleOutlined,
} from '@mui/icons-material';
import { tokens } from 'src/Lib/theme';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { useI18n } from 'src/Hooks/useI18n';
import { Link } from 'react-router-dom';

interface IMenuItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (selected: string) => void;
}

const Item: React.FC<IMenuItemProps> = (props) => {
  const { title, to, icon, selected, setSelected } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%">
      <Box p={1}>
        <Divider color={colors.gray[100]} variant="fullWidth" />
      </Box>
      <MenuItem
        // active={selected === title}
        style={{ color: colors.gray[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
        disabled={selected === title}
      >
        <Link to={to} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" color={selected === title ? colors.gray[200] : colors.gray[100]}>
            {title}
          </Typography>
        </Link>
      </MenuItem>
    </Box>
  );
};

interface ISideBarProps {
  currentRoute: string;
  handleRouteChanged: (route: string) => void;
}

const AppSideBar: React.FC<ISideBarProps> = (props) => {
  const { currentRoute, handleRouteChanged } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userData } = useAuthentication();
  const { getResource } = useI18n();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <Box
      sx={{
        '& .ps-sidebar-root': {
          borderRight: `0px solid ${colors.primary[900]} !important`,
        },
        height: '100%',
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={colors.primary[600]}
        style={{
          padding: 0,
          height: '100%',
        }}
      >
        <Menu>
          {/* header */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              padding: 0,
              margin: '0 0 0 0',
              color: colors.gray[100],
              backgroundColor: colors.gray[800],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="0px">
                <Typography variant="h3" color={colors.gray[100]}>
                  Training Center
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px" p={2}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                color={colors.gray[100]}
              >
                <Box width="100%" display="flex" justifyContent="center">
                  <AccountCircleOutlined sx={{ height: '100px', width: '100px' }} />
                </Box>
                <Box p={1}>
                  <Divider color={colors.gray[100]} variant="inset" />
                </Box>
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color={colors.gray[100]}>
                  {userData.displayName}
                </Typography>
              </Box>
              <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                <Item
                  title={getResource('common:captionDashboard')}
                  to="/dashboard"
                  icon={<Dashboard />}
                  selected={currentRoute}
                  setSelected={handleRouteChanged}
                />
                <Item
                  title={getResource('common:captionHealthMonitoring')}
                  to="/health"
                  icon={<HealthAndSafety />}
                  selected={currentRoute}
                  setSelected={handleRouteChanged}
                />
                <Item
                  title={getResource('common:captionSandbox')}
                  to="/sandbox"
                  icon={<Science />}
                  selected={currentRoute}
                  setSelected={handleRouteChanged}
                />
              </Box>
            </Box>
          )}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AppSideBar;
