import { useTheme } from '@mui/material';
import React from 'react';
import { ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { HealthData } from 'src/dataTypes';
import { tokens } from 'src/Lib/theme';

interface IProps {
  data: HealthData[];
}

const enum HealthChartKeyEnum {
  Weight = 'weight',
  BMI = 'bmi',
  HeartRate = 'heartBeat',
  BodyFat = 'bodyFat',
  MuscleMass = 'muscleMass',
}
const HealthLineChart: React.FC<IProps> = (props) => {
  const { data } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataKeys = ['weight', 'bmi', 'heartBeat', 'bodyFat', 'muscleMass'];

  const getColor = React.useCallback(
    (key: HealthChartKeyEnum) => {
      switch (key) {
        case HealthChartKeyEnum.Weight:
          return colors.chartColors.blue;
        case HealthChartKeyEnum.BMI:
          return colors.chartColors.orange;
        case HealthChartKeyEnum.HeartRate:
          return colors.chartColors.red;
        case HealthChartKeyEnum.BodyFat:
          return colors.chartColors.purple;
        case HealthChartKeyEnum.MuscleMass:
          return colors.chartColors.green;
      }
    },
    [colors]
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        {dataKeys.map((key) => {
          return <Line dataKey={key} type="monotone" stroke={getColor(key as HealthChartKeyEnum)} strokeWidth={2} />;
        })}
        <CartesianGrid stroke={colors.chartColors.light} strokeDasharray="4 4" style={{ opacity: 0.1 }} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip filterNull />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HealthLineChart;
