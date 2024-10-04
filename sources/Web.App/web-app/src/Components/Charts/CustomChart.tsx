import 'chart.js/auto';
import React from 'react';
import { ChartProps } from 'src/Hooks/useChart';
import { Chart } from 'react-chartjs-2';

interface IProps extends ChartProps {}

const CustomChart: React.FC<IProps> = (props) => {
  const { type, options, data } = props;

  return <Chart height="600px" width="inherit" type={type} options={options} data={data} />;
};

export default CustomChart;
