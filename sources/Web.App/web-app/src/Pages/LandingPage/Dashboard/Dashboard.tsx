import { Box, Grid2, useTheme } from '@mui/material';
import React from 'react';
import PageToolbar from 'src/Components/AppBar/PageToolBar';
import { StatelessApi, StatelessApiService } from 'src/Lib/Api/StatelessApi';
import { serviceUrls } from 'src/Hooks/useApi';
import { DashboardConfiguration } from './types';
import { useComponentInitialization } from 'src/Hooks/useComponentInitialization';
import { useLocalStorage } from 'src/Hooks/useLocalStorage';
import { IJwtData } from 'src/Lib/Interfaces/IUserData';
import { LocalStorageKeyEnum } from 'src/Lib/LocalStorage';
import { useI18n } from 'src/Hooks/useI18n';
import { useDashBoardConfiguration } from './useDashBoardConfiguration';
import { tokens } from 'src/Lib/theme';

interface IDashboardProps {
  configuration: DashboardConfiguration;
  dashboardConfigurationApi: StatelessApi<DashboardConfiguration>;
}

const initializeAsync = async (token: string): Promise<IDashboardProps> => {
  const dashboardConfigurationApi = StatelessApiService.create<DashboardConfiguration>(
    {
      serviceUrl: serviceUrls.dashBoard.getDashboardConfiguration,
    },
    token
  );

  let [dashboardConfiguration] = await Promise.all([dashboardConfigurationApi.get()]);

  return {
    configuration: dashboardConfiguration,
    dashboardConfigurationApi: dashboardConfigurationApi,
  };
};

const DashboardInitializationContainer: React.FC = () => {
  const tokenStorage = useLocalStorage<IJwtData>(LocalStorageKeyEnum.JwtData);

  const initializationProps = useComponentInitialization<IDashboardProps>(
    initializeAsync.bind(null, tokenStorage.item.jwtToken)
  );

  if (!initializationProps.isInitialized) {
    return null;
  }
  return <Dashboard {...initializationProps.props} />;
};

const Dashboard: React.FC<IDashboardProps> = (props) => {
  const { configuration, dashboardConfigurationApi } = props;
  const { getResource } = useI18n();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { setDialogOpen } = useDashBoardConfiguration(configuration.dashboardTileData, dashboardConfigurationApi);

  return (
    <Grid2 display="flex" flexDirection="column" container spacing={1} width="100%">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageToolbar
          resourceKey="captionDashboard"
          toolTip={getResource('common:labelConfigureDashboard')}
          onAction={() => setDialogOpen(true)}
        />
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="10px">
        {/* row 1 */}
        <Box
          gridColumn="span 3"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <StatBox
            title="12,361"
            subTitle="Emails sent"
            progress={0.33}
            increase="+33%"
            icon={<EmailOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          /> */}
        </Box>
        <Box
          gridColumn="span 3"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <StatBox
            title="22,361"
            subTitle="Emails sent"
            progress={0.75}
            increase="+14%"
            icon={<EmailOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          /> */}
        </Box>
        <Box
          gridColumn="span 3"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <StatBox
            title="32,361"
            subTitle="Emails sent"
            progress={0.75}
            increase="+14%"
            icon={<EmailOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          /> */}
        </Box>
        <Box
          gridColumn="span 3"
          sx={{ backgroundColor: colors.primary[400] }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={5}
        >
          {/* <StatBox
            title="44,361"
            subTitle="Emails sent"
            progress={0.75}
            increase="+14%"
            icon={<EmailOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          /> */}
        </Box>
        {/* row 2 */}
        <Box gridColumn="span 8" gridRow="span 2" sx={{ backgroundColor: colors.primary[400] }}></Box>
        <Box gridColumn="span 4" gridRow="span 1" sx={{ backgroundColor: colors.primary[400] }}></Box>
        <Box gridColumn="span 4" gridRow="span 1" sx={{ backgroundColor: colors.primary[400] }}></Box>

        <Box gridColumn="span 6" gridRow="span 2" sx={{ backgroundColor: colors.primary[400] }}></Box>
        <Box gridColumn="span 6" gridRow="span 2" sx={{ backgroundColor: colors.primary[400] }}></Box>
      </Box>
    </Grid2>

    //   gridColumn="span 3"
    //   sx={{ backgroundColor: colors.primary[400] }}
    //   display="flex"
    //   alignItems="center"
    //   justifyContent="center"
    // >
    //   <StatBox
    //     title="12,361"
    //     subTitle="Emails"
    //     progress={0.75}
    //     increase="+14%"
    //     icon={<EmailOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
    //   />
    // </Box>
    // <Box
    //   gridColumn="span 3"
    //   sx={{ backgroundColor: colors.primary[400] }}
    //   display="flex"
    //   alignItems="center"
    //   justifyContent="center"
    // >
    //   <StatBox
    //     title="12,361"
    //     subTitle="Emails"
    //     progress={0.75}
    //     increase="+14%"
    //     icon={<EmailOutlined sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
    //   />
    // </Box> */}
    //* </Box> */}

    //* </Box> */}
    // <Grid2
    //   sx={{
    //     width: '100%',
    //     height: '100vh',
    //     display: 'flex',
    //     backgroundColor: '#f2f2f2',
    //     padding: 2,
    //   }}
    //   gap={3}
    //   justifyContent="flex-start"
    //   alignItems="flex-start"
    //   alignContent="flex-start"
    //   direction="column"
    //   container
    // >
    //   <Grid2 container sx={{ width: '100%' }}>
    //     <PageToolbar
    //       resourceKey="captionDashboard"
    //       toolTip={getResource('common:labelConfigureDashboard')}
    //       onAction={() => setDialogOpen(true)}
    //     />
    //   </Grid2>
    //   {/* <Grid2 container direction="row" spacing={0}>
    //     {dashboardConfiguration.map((item, index) => {
    //       return <DashboardTileBase key={index} tileData={item} size={12} api={dashboardConfigurationApi} />;
    //     })}
    //   </Grid2> */}

    //   <DashboardConfigurationDialog
    //     open={configurationDialogOpen}
    //     availableTiles={configuration.availableTiles}
    //     configuration={dashboardConfiguration}
    //     setDialogOpen={setDialogOpen}
    //     onAction={onAction}
    //   />
    // </Grid2>
  );
};

export default DashboardInitializationContainer;
