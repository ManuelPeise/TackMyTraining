import React from 'react';
import { DashboardTile } from './types';
import { StatelessApi } from 'src/Lib/Api/StatelessApi';
import { serviceUrls } from 'src/Hooks/useApi';

export const useDashBoardConfiguration = (dashboardTiles: DashboardTile[], api: StatelessApi<DashboardTile[]>) => {
  const [configurationDialogOpen, setConfigurationDialogOpen] = React.useState<boolean>(false);

  const onAction = React.useCallback(
    async (state: DashboardTile[]) => {
      await api.post({ serviceUrl: serviceUrls.dashBoard.updateDashboardConfiguration }, JSON.stringify(state));
      await api.get();
      // setConfigurationDialogOpen(false);
    },
    [api]
  );

  const activeTiles = React.useMemo(() => {
    return dashboardTiles.filter((x) => x.isActive);
  }, [dashboardTiles]);
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
    activeTiles: activeTiles,
    allTiles: dashboardTiles,
    setDialogOpen: setConfigurationDialogOpen,
    onAction: onAction,
  };
};
