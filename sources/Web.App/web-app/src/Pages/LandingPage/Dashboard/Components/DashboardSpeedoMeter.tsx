import { Box, Grid2 } from '@mui/material';
import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

interface IProps {
  value: number;
  label: string;
  maxValue: number;
  minValue?: number;
  format: 'd' | '.0%' | '%';
  textColor?: string;
  ringWidth: number;
  segmentSteps?: number[];
  size: number;
}

export const speedoMeterColors = {
  red: '#ff0000',
  yellow: '#ffff00',
  green: '#00ff00',
};

const DashboardSpeedoMeter: React.FC<IProps> = (props) => {
  const { value, size, label, minValue, maxValue, format, textColor, ringWidth, segmentSteps } = props;
  return (
    <ReactSpeedometer
      startColor={speedoMeterColors.red}
      endColor={speedoMeterColors.green}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      valueFormat={format}
      customSegmentStops={segmentSteps}
      currentValueText={label}
      ringWidth={ringWidth}
      textColor={textColor}
    />
  );
};

export default DashboardSpeedoMeter;
