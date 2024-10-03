import React from 'react';
import { DashboardConfiguration, DashboardTileData } from '../types';
import { Box, Divider, Grid2, Paper, Typography } from '@mui/material';
import { useI18n } from 'src/Hooks/useI18n';
import { StatelessApi } from 'src/Lib/Api/StatelessApi';
import { DashboardTileEnum } from '../Enums/DashboardTileEnum';
import HealthTile from './HealthTile';

interface IProps {
  tileData: DashboardTileData;
  size: number;
  api: StatelessApi<DashboardConfiguration>;
}

export const DashboardTileBase: React.FC<IProps> = (props) => {
  const { tileData, size } = props;
  const { getResource } = useI18n();

  const lastUpdate = tileData?.data?.date ?? undefined;

  const component = React.useMemo(() => {
    switch (tileData.dashboardTileConfiguration.key) {
      case DashboardTileEnum.Health:
        return <HealthTile tileData={tileData.data} size={12} />;
    }
  }, [tileData]);

  return (
    <Grid2 size={size}>
      <Paper elevation={4}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">{getResource(`common:${tileData.dashboardTileConfiguration.labelKey}`)}</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2, paddingBottom: 2 }}>{component}</Box>
        {lastUpdate && <Divider />}
        {lastUpdate && (
          <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
            {/* {getResource('common:labelLastUpdateAt').replaceAll('{TimeStamp}', lastUpdate?.format('LL'))} */}
          </Box>
        )}
      </Paper>
    </Grid2>
  );
};

export default DashboardTileBase;
