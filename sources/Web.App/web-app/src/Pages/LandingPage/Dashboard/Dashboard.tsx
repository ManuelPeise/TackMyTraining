import { Box, Grid2, useTheme } from '@mui/material';
import React from 'react';
import PageToolbar from 'src/Components/AppBar/PageToolBar';
import { StatelessApi, StatelessApiService } from 'src/Lib/Api/StatelessApi';
import { serviceUrls } from 'src/Hooks/useApi';
import { DashboardTile } from './types';
import { useComponentInitialization } from 'src/Hooks/useComponentInitialization';
import { useLocalStorage } from 'src/Hooks/useLocalStorage';
import { IJwtData } from 'src/Lib/Interfaces/IUserData';
import { LocalStorageKeyEnum } from 'src/Lib/LocalStorage';
import { useI18n } from 'src/Hooks/useI18n';
import { useDashBoardConfiguration } from './useDashBoardConfiguration';
import { tokens } from 'src/Lib/theme';

import DashboardConfigurationDialog from './Components/DashboardConfigurationDialog';
import HealthDataDashboardTile from './Components/HealthDataDashboardTile';
import DashboardContentPlaceholder from './Components/DashboardContentPlaceholder';

interface IDashboardProps {
  availableTiles: DashboardTile[];
  dashboardConfigurationApi: StatelessApi<DashboardTile[]>;
}

const initializeAsync = async (token: string): Promise<IDashboardProps> => {
  const dashboardConfigurationApi = StatelessApiService.create<DashboardTile[]>(
    {
      serviceUrl: serviceUrls.dashBoard.getDashboardTiles,
    },
    token
  );

  let [dashboardTiles] = await Promise.all([dashboardConfigurationApi.get()]);

  return {
    availableTiles: dashboardTiles,
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
  const { availableTiles, dashboardConfigurationApi } = props;
  const { getResource } = useI18n();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tiles, setTiles] = React.useState(availableTiles);

  const { activeTiles, configurationDialogOpen, setDialogOpen } = useDashBoardConfiguration(
    tiles,
    dashboardConfigurationApi
  );

  const onAction = React.useCallback(
    async (state: DashboardTile[]) => {
      await dashboardConfigurationApi.post(
        { serviceUrl: serviceUrls.dashBoard.updateDashboardConfiguration },
        JSON.stringify(state)
      );
      setTiles(await dashboardConfigurationApi.get());
      setDialogOpen(false);
    },
    [dashboardConfigurationApi, setDialogOpen]
  );

  return (
    <Box width="100%">
      <Grid2 display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="10px">
        <Box gridColumn="span 12" width="100%">
          <PageToolbar
            resourceKey="captionDashboard"
            toolTip={getResource('common:labelConfigureDashboard')}
            onAction={() => setDialogOpen(true)}
          />
        </Box>

        <Box gridColumn="span 12">
          {!activeTiles.length ? (
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="10px">
              <Box gridColumn={{ md: 'span 12', xl: 'span 12' }} sx={{ backgroundColor: colors.primary[400] }}>
                <DashboardContentPlaceholder />
              </Box>
            </Box>
          ) : (
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="10px">
              {activeTiles?.map((tile) => {
                return (
                  <Box
                    gridColumn={{ md: 'span 12', xl: 'span 6' }}
                    gridRow="span 2"
                    sx={{ backgroundColor: colors.primary[400] }}
                  >
                    <HealthDataDashboardTile title="Health" model={tile} />
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
        {configurationDialogOpen && (
          <DashboardConfigurationDialog
            open={configurationDialogOpen}
            availableTiles={tiles}
            setDialogOpen={setDialogOpen}
            onAction={onAction}
          />
        )}
      </Grid2>
    </Box>
  );
};

export default DashboardInitializationContainer;
