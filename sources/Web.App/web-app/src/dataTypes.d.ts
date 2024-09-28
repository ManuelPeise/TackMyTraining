import moment from 'moment';
import { DashboardTileTypeEnum } from './Lib/Enums/DashboardTileTypeEnum';

export interface IDimensionSize {
  xs: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'grow';
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'grow';
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'grow';
}

export type DashboardTileConfiguration = {
  size: IDimensionSize;
  type: DashboardTileTypeEnum;
};

export type HealthData = {
  date: moment.Moment;
  height: number;
  weight: number;
  heartBeat: number;
  bodyFat: number;
  muscleMass: number;
  bmi: number;
};

export type HealthStatisticData = {
  date: moment.Moment;
  healthData: HealthData[];
};

export type TimeRange = {
  from: moment.Moment;
  to: moment.Moment;
};
