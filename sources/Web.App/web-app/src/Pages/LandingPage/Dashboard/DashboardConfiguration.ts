import { DashboardTileEnum } from './Enums/DashboardTileEnum';
import { DashboardTileConfiguration } from './types';

export const dashboardConfiguration: DashboardTileConfiguration[] = [
  {
    position: 0,
    isActive: true,
    key: DashboardTileEnum.Health,
    labelKey: 'labelDashboardTileHealth',
  },
];
