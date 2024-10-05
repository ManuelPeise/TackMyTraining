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
  FitnessCenterOutlined,
} from '@mui/icons-material';
import { tokens } from 'src/Lib/theme';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { useI18n } from 'src/Hooks/useI18n';
import SidebarItem from './SidebarItem';
import CollapsibleSidebarItem from './CollapsibleSidebarItem';

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
        '& .ps-disabled': {
          cursor: `not-allowed !important`,
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
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="0px" padding="0 10px 0 10px">
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
                <SidebarItem
                  title={getResource('common:captionDashboard')}
                  to="/dashboard"
                  icon={<Dashboard />}
                  hasDivider
                  selected={currentRoute}
                  setSelected={handleRouteChanged}
                />
                <CollapsibleSidebarItem
                  title={getResource('common:captionFitness')}
                  icon={<FitnessCenterOutlined />}
                  selected={currentRoute}
                  hasDivider
                  subMenuItemProps={[
                    {
                      title: getResource('common:captionDashboard'),
                      to: '/fitness-center',
                      hasDivider: true,
                      icon: <FitnessCenterOutlined />,
                      selected: currentRoute,
                      setSelected: handleRouteChanged,
                    },
                  ]}
                  setSelected={handleRouteChanged}
                />
                <SidebarItem
                  title={getResource('common:captionHealthMonitoring')}
                  to="/health"
                  icon={<HealthAndSafety />}
                  hasDivider
                  selected={currentRoute}
                  setSelected={handleRouteChanged}
                />
                {process.env.REACT_APP_ENVIRONMENT === 'dev' && (
                  <SidebarItem
                    title={getResource('common:captionSandbox')}
                    to="/sandbox"
                    icon={<Science />}
                    hasDivider
                    selected={currentRoute}
                    setSelected={handleRouteChanged}
                  />
                )}
              </Box>
            </Box>
          )}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AppSideBar;
