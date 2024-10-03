import React from 'react';
import { DashboardConfiguration, DashboardTileConfiguration, DashboardTileData } from './types';
import { StatelessApi } from 'src/Lib/Api/StatelessApi';
import { serviceUrls } from 'src/Hooks/useApi';

export const useDashBoardConfiguration = (
  configuration: DashboardTileData[],
  api: StatelessApi<DashboardConfiguration>
) => {
  const [configurationDialogOpen, setConfigurationDialogOpen] = React.useState<boolean>(false);

  const handleSortDashboardTiles = React.useCallback((a: DashboardTileData, b: DashboardTileData) => {
    return a.dashboardTileConfiguration.position > b.dashboardTileConfiguration.position ? -1 : 1;
  }, []);

  const onAction = React.useCallback(
    async (state: DashboardTileConfiguration[]) => {
      await api.post({ serviceUrl: serviceUrls.dashBoard.updateDashboardConfiguration }, JSON.stringify(state));
      await api.get();
      setConfigurationDialogOpen(false);
    },
    [api]
  );

  //#region  drag and drop

  // const onDragOver = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  // }, []);

  // const onDragStart = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
  //   setCurrentElement({ id: event.currentTarget.id, element: event.currentTarget });
  // }, []);

  // const onDrop = React.useCallback(
  //   (event: React.DragEvent<HTMLDivElement>) => {
  //     event.preventDefault();
  //     event.currentTarget.appendChild(currentElement.element);
  //     setCurrentElement(null);
  //   },
  //   [currentElement]
  // );

  //#endregion

  return {
    configurationDialogOpen: configurationDialogOpen,
    dashboardConfiguration: configuration
      .filter((x) => x.dashboardTileConfiguration.isActive)
      .sort(handleSortDashboardTiles),
    setDialogOpen: setConfigurationDialogOpen,
    onAction: onAction,
  };
};
