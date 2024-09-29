import moment from 'moment';
import React from 'react';
import { HealthData } from 'src/dataTypes';
import { colors, fontsStyles } from 'src/Lib/colors';
import { dateFormats } from 'src/Lib/constants';

type ChartInputProps<T = ChartDataTypes> = {
  labelKey: keyof T;
  keys: Array<keyof T>;
  model: T[];
  chartConfiguration: { [key: string]: ChartConfigurationProps };
  bottomLabelLength: number;
  scales: ChartScales;
};

type Font = {
  family: string;
  size: number;
  weight: 'bold';
  lineHeight: number;
};

type ChartTitle = {
  display: boolean;
  text: string;
  color: string;
  font: Font;
};

type ChartPlugin = {
  title: {
    display: boolean;
    text: string;
    color: string;
    font: Font;
    padding?: {};
  };
};

type ChartScaleOption = {
  display: boolean;
  title: ChartTitle;
};

type ChartScales = {
  x: ChartScaleOption;
  y: ChartScaleOption;
};

type ChartOptions = {
  responsive: boolean;
  maintainAspectRatio: boolean;
  scales: ChartScales;
  plugins: ChartPlugin;
};

type ChartDataSet = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string;
  borderWidth: number;
};

type ChartData = {
  labels: string[];
  datasets: ChartDataSet[];
};

export type ChartProps = {
  type: 'line' | 'pie' | 'bubble' | 'doughnut' | 'bar';
  data: ChartData;
  options: ChartOptions;
};

export type ChartConfigurationProps = {
  label: string;
  color: string;
};
export type ChartDataTypes = HealthData;

export const useChart = <ChartDataTypes>(props: ChartInputProps<ChartDataTypes>, chartTitle: string): ChartProps => {
  const getFormattedLabel = React.useCallback((value: any) => {
    const data = moment(value);

    return data.format(dateFormats.DayMonthYear);
  }, []);

  const chartProps = React.useMemo((): ChartProps => {
    const model: ChartProps = {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: props.scales,
        plugins: {
          title: {
            display: true,
            text: chartTitle,
            color: colors.text.dialogCaption,
            padding: { top: 50, left: 5, right: 5, bottom: 50 },
            font: {
              family: fontsStyles.family.primary,
              size: 24,
              weight: 'bold',
              lineHeight: 1,
            },
          },
        },
      },
      data: {
        // bottom labels TODO format to DD.MM.YYYY
        labels: props.model.map((m) => getFormattedLabel(m[props.labelKey])),
        datasets: props.keys.map((key) => {
          return {
            label: props.chartConfiguration[key as string].label,
            data: props.model.map((x) => {
              return x[key] as number;
            }),
            backgroundColor: [props.chartConfiguration[key as string].color],
            borderColor: props.chartConfiguration[key as string].color,
            borderWidth: 1,
          };
        }),
      },
    };

    return model;
  }, [props, chartTitle, getFormattedLabel]);

  return {
    type: chartProps.type,
    options: chartProps.options,
    data: chartProps.data,
  };
};
