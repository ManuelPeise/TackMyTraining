import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useI18n } from 'src/Hooks/useI18n';
import { tokens } from 'src/Lib/theme';
import { DashboardTile } from '../types';
import {
  MonitorHeartOutlined,
  MonitorWeightOutlined,
  TrackChangesOutlined,
  HealthAndSafety,
  AttributionOutlined,
} from '@mui/icons-material';
import HealthLineChart from './charts/HealthLineChart';

interface IProps {
  title: string;
  model: DashboardTile;
}

const HealthDataDashboardTile: React.FC<IProps> = (props) => {
  const { title, model } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { getResource } = useI18n();
  return (
    <Box m="0 30px" p={2} sx={{ backgroundColor: colors.primary[400] }}>
      <Box display="flex" alignItems="baseline" pl={2} width="100%">
        <HealthAndSafety sx={{ height: 50, width: 50, color: colors.redAccent[300] }} />
        <Typography variant="h4" fontWeight="bold" ml={1} sx={{ color: colors.gray[100] }}>
          {title}
        </Typography>
      </Box>
      <Box pt={1} pb={1}>
        <Divider variant="fullWidth" />
      </Box>
      <Box display="flex" flexDirection="row" pl={2}>
        <Box width="35%" pt={2}>
          <Box p={1} display="flex" alignItems="baseline">
            <MonitorHeartOutlined sx={{ width: 30, height: 30, color: colors.red[300] }} />
            <Typography
              variant="h4"
              ml={1}
              sx={{
                color: colors.yellow[100],
                '&:hover': { cursor: 'pointer' },
              }}
            >
              {model?.data?.heartBeat
                ? getResource('common:labelCurrentHeartBeat').replace('{value}', `${model?.data?.heartBeat}`)
                : getResource('common:labelCurrentHeartBeatNotAvailable')}
            </Typography>
          </Box>
          <Box p={1} display="flex" alignItems="baseline">
            <MonitorWeightOutlined sx={{ width: 30, height: 30, color: colors.chartColors.orange }} />
            <Typography
              variant="h4"
              ml={1}
              sx={{
                color: colors.yellow[100],
                '&:hover': { cursor: 'pointer' },
              }}
            >
              {model.data.weight
                ? getResource('common:labelCurrentWeight').replace('{value}', `${model?.data?.weight}`)
                : getResource('common:labelCurrentWeightNotAvailable')}
            </Typography>
          </Box>
          <Box p={1} display="flex" alignItems="baseline">
            <TrackChangesOutlined sx={{ width: 30, height: 30, color: colors.yellow[300] }} />
            <Typography
              variant="h4"
              ml={1}
              sx={{
                color: colors.yellow[100],
                '&:hover': { cursor: 'pointer' },
              }}
            >
              {model.data.bodyFat
                ? getResource('common:labelCurrentBodyFat').replace('{value}', `${model?.data?.bodyFat}`)
                : getResource('common:labelCurrentBodyFatNotAvailable')}
            </Typography>
          </Box>
          <Box p={1} display="flex" alignItems="baseline">
            <TrackChangesOutlined sx={{ width: 30, height: 30, color: colors.greenAccent[300] }} />
            <Typography
              variant="h4"
              ml={1}
              sx={{
                color: colors.yellow[100],
                '&:hover': { cursor: 'pointer' },
              }}
            >
              {model?.data?.muscleMass
                ? getResource('common:labelCurrentMuscleMass').replace('{value}', `${model?.data?.muscleMass}`)
                : getResource('common:labelCurrentMuscleMassNotAvailable')}
            </Typography>
          </Box>
          <Box p={1} display="flex" alignItems="baseline">
            <AttributionOutlined sx={{ width: 30, height: 30, color: colors.blueAccent[300] }} />
            <Typography
              variant="h4"
              ml={1}
              sx={{
                color: colors.yellow[100],
                '&:hover': { cursor: 'pointer' },
              }}
            >
              {model?.data?.bmi
                ? getResource('common:labelCurrentBmi').replace('{value}', `${model?.data?.bmi}`)
                : getResource('common:labelCurrentBmiNotAvailable')}
            </Typography>
          </Box>
        </Box>
        <Box width="65%" display="flex" justifyContent="center">
          <HealthLineChart data={model.statistics} />
        </Box>
      </Box>
      <Box pt={1} pb={1}>
        <Divider variant="fullWidth" />
      </Box>
      <Box display="flex">
        <Typography variant="h5" pt={1}>
          {getResource('common:labelLastUpdate').replace('{value}', `${model.data.date}`)}
        </Typography>
      </Box>
    </Box>
  );
};

export default HealthDataDashboardTile;
