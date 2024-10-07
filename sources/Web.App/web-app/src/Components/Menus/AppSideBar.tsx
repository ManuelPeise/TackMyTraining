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
  InsightsOutlined,
} from '@mui/icons-material';
import { tokens } from 'src/Lib/theme';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { useI18n } from 'src/Hooks/useI18n';
import SidebarItem from './SidebarItem';
import CollapsibleSidebarItem from './CollapsibleSidebarItem';
import { useNavigate } from 'react-router-dom';

interface ISideBarProps {}

const AppSideBar: React.FC<ISideBarProps> = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userData } = useAuthentication();
  const { getResource } = useI18n();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const onNavigate = React.useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <Box
      sx={{
        '& .ps-sidebar-root': {
          borderRight: `0px solid ${colors.gray[800]} !important`,
        },
        '& .ps-disabled': {
          cursor: `not-allowed !important`,
        },
        width: '100%',
        height: '100%',
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={colors.gray[800]}
        style={{
          padding: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Menu>
          {/* header */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined sx={{ width: 25, height: 25 }} /> : undefined}
            style={{
              display: 'flex',
              justifyItems: 'center',
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
                  selected="/dashboard"
                  onNavigate={onNavigate}
                />
                <CollapsibleSidebarItem
                  title={getResource('common:captionFitness')}
                  icon={<FitnessCenterOutlined />}
                  hasDivider
                  subMenuItemProps={[
                    {
                      title: getResource('common:captionDashboard'),
                      to: '/fitness-center',
                      hasDivider: true,
                      icon: <FitnessCenterOutlined />,
                      selected: '/fitness-center',
                      onNavigate: onNavigate,
                    },
                    {
                      title: getResource('training:labelTracking'),
                      to: '/fitness-center/tracking',
                      hasDivider: true,
                      icon: <InsightsOutlined />,
                      selected: '/fitness-center/tracking',
                      onNavigate: onNavigate,
                    },
                  ]}
                  setSelected={onNavigate}
                />
                <SidebarItem
                  title={getResource('common:captionHealthMonitoring')}
                  to="/health"
                  icon={<HealthAndSafety />}
                  hasDivider
                  selected="/health"
                  onNavigate={onNavigate}
                />
                {process.env.REACT_APP_ENVIRONMENT === 'dev' && (
                  <SidebarItem
                    title={getResource('common:captionSandbox')}
                    to="/sandbox"
                    icon={<Science />}
                    hasDivider
                    selected="/sandbox"
                    onNavigate={onNavigate}
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
