import React from 'react';
import { Grid2 } from '@mui/material';
import { HealthData } from 'src/dataTypes';
import DashboardSpeedoMeter from './DashboardSpeedoMeter';

interface IProps<T = HealthData> {
  tileData: T;
  size: number;
}

const HealthTileBody: React.FC<IProps> = (props) => {
  const { size } = props;

  return (
    <Grid2 size={size} display="flex">
      <DashboardSpeedoMeter
        value={40}
        size={1}
        label="Test"
        minValue={0}
        maxValue={100}
        format="d"
        ringWidth={10}
        segmentSteps={[0, 30, 60, 100]}
      />

      <DashboardSpeedoMeter
        value={70}
        size={1}
        label="Test"
        minValue={0}
        maxValue={100}
        format="d"
        ringWidth={10}
        segmentSteps={[0, 33.3, 66.4, 100]}
      />

      <DashboardSpeedoMeter
        value={20}
        size={1}
        label="Test"
        minValue={0}
        maxValue={100}
        format="d"
        ringWidth={10}
        segmentSteps={[0, 30, 60, 100]}
      />

      <DashboardSpeedoMeter
        value={30}
        size={1}
        label="Test"
        minValue={0}
        maxValue={100}
        format="d"
        ringWidth={10}
        segmentSteps={[0, 30, 60, 100]}
      />
    </Grid2>
  );
};

export default HealthTileBody;
