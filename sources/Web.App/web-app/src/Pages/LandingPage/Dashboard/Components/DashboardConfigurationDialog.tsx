import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import React from 'react';
import SaveCancelButtons from 'src/Components/Input/Form/SaveCancelButtons';
import { useI18n } from 'src/Hooks/useI18n';
import { colors, fontsStyles } from 'src/Lib/colors';
import { isNotEqualToPrev, toCaption } from 'src/Lib/utils';
import { DashboardTile, DashboardTileConfiguration, DashboardTileData } from '../types';
import { DashboardTileEnum } from '../Enums/DashboardTileEnum';
import DashboardConfigurationItem from './DashboardConfigurationItem';

interface IProps {
  open: boolean;
  availableTiles: DashboardTile[];
  configuration: DashboardTileData[];
  setDialogOpen: (open: boolean) => void;
  onAction: (state: DashboardTileConfiguration[]) => Promise<void>;
}

const DashboardConfigurationDialog: React.FC<IProps> = (props) => {
  const { open, availableTiles, configuration, onAction, setDialogOpen } = props;
  const { getResource } = useI18n();
  const originalState = React.useRef(configuration);

  const [state, setState] = React.useState<DashboardTileData[]>(configuration);

  const intermediateConfiguration = React.useMemo(() => {
    const tiles: DashboardTileConfiguration[] = availableTiles.map((tile) => {
      const config = state.find((x) => x.dashboardTileConfiguration.key === tile.key) ?? null;

      if (config != null) {
        return config.dashboardTileConfiguration;
      }

      return tile.configuration;
    });

    return tiles;
  }, [availableTiles, state]);

  const onTileConfigurationChanged = React.useCallback(
    (key: DashboardTileEnum, checked: boolean) => {
      const config = [...state];
      if (!config.length || !config.some((x) => x.dashboardTileConfiguration.key === key)) {
        config.push({
          dashboardTileConfiguration: {
            key: key,
            labelKey: availableTiles.find((x) => x.key === key).labelKey,
            isActive: checked,
            position: state.length,
          },
          data: {},
        });
      } else {
        config.find((x) => x.dashboardTileConfiguration.key === key).dashboardTileConfiguration.isActive = checked;
      }

      setState(config);
    },
    [availableTiles, state]
  );

  console.log(state);
  const handleCancelClicked = React.useCallback(() => {
    setState(originalState.current);
    setDialogOpen(false);
  }, [originalState, setDialogOpen]);

  const handleSaveClicked = React.useCallback(async () => {
    await onAction(
      state.map((x) => {
        return x.dashboardTileConfiguration;
      })
    );
    setDialogOpen(false);
  }, [state, setDialogOpen, onAction]);

  const isModified = React.useMemo(() => {
    return isNotEqualToPrev(originalState.current, state);
  }, [state]);

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Typography
          sx={{
            color: colors.text.dialogCaption,
            fontStyle: fontsStyles.normal,
            fontFamily: fontsStyles.family.primary,
            flexGrow: 1,
            textAlign: 'center',
          }}
        >
          {toCaption(getResource('common:labelConfigureDashboard'))}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {intermediateConfiguration.map((config, index) => {
          return (
            <DashboardConfigurationItem
              key={config.key}
              index={index}
              id={config.key.toString()}
              labelKey={config.labelKey}
              isChecked={config.isActive ?? false}
              hasDivider={index < intermediateConfiguration.length - 1}
              onTileConfigurationChanged={onTileConfigurationChanged}
            />
          );
        })}
      </DialogContent>
      <Divider />
      <DialogActions>
        <SaveCancelButtons
          actionLabel={getResource('common:labelSave')}
          onAction={handleSaveClicked}
          cancelLabel={getResource('common:labelCancel')}
          cancelAction={handleCancelClicked}
          cancelDisabled={!isModified}
          saveDisabled={!isModified}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DashboardConfigurationDialog;
