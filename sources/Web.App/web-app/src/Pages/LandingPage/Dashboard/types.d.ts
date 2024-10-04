import { HealthData } from 'src/dataTypes';
import { DashboardTileEnum } from './Enums/DashboardTileEnum';

export type DashboardTileData<T = HealthData> = {
  dashboardTileConfiguration: DashboardTileConfiguration;
  data: T;
};

export type DashboardTileConfiguration = {
  key: DashboardTileEnum;
  position: number;
  labelKey: string;
  isActive: boolean;
};

export type DashboardTile<T = HealthData> = {
  key: DashboardTileEnum;
  row: number;
  column: number;
  labelKey: string;
  isActive: boolean;
  data: T;
  statistics?: T[];
};

export type DashboardConfiguration = {
  availableTiles: DashboardTile[];
  dashboardTileData: DashboardTileData[];
};

export type DashboardState = {
  tileState: DashboardTileData[];
  committed: boolean;
};
