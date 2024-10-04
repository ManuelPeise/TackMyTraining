import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid2,
  Typography,
} from '@mui/material';
import React from 'react';
import { useI18n } from 'src/Hooks/useI18n';
import { colors, fontsStyles } from 'src/Lib/colors';
import { toCaption } from 'src/Lib/utils';
import { DashboardTile } from '../types';
import SaveCancelButtons from 'src/Components/Input/Form/SaveCancelButtons';
import { DashboardTileEnum } from '../Enums/DashboardTileEnum';

interface IProps {
  open: boolean;
  availableTiles: DashboardTile[];
  setDialogOpen: (open: boolean) => void;
  onAction: (state: DashboardTile[]) => Promise<void>;
}

const DashboardConfigurationDialog: React.FC<IProps> = (props) => {
  const { open, availableTiles, setDialogOpen, onAction } = props;
  const { getResource } = useI18n();

  const [tiles, setTiles] = React.useState([...availableTiles]);

  const getCategoryLabel = React.useCallback(
    (key: DashboardTileEnum) => {
      const labelBase = getResource('common:labelShowCategory');
      switch (key) {
        case DashboardTileEnum.Health:
          return labelBase.replace('{category}', getResource('common:labelDashboardTileHealth'));
        default:
          return '';
      }
    },
    [getResource]
  );

  const handleCategoryStateChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const update = tiles.map((cnf) => {
        if (parseInt(cnf.key.toString()) === parseInt(e.currentTarget.id as string)) {
          return { ...cnf, isActive: checked };
        }

        return cnf;
      });

      setTiles(update);
    },
    [tiles]
  );

  const handleAction = React.useCallback(() => {
    onAction(tiles);
  }, [tiles, onAction]);

  const handleCancel = React.useCallback(() => {
    setTiles(availableTiles);
    setDialogOpen(false);
  }, [availableTiles, setDialogOpen]);

  const isModified = React.useMemo(() => {
    const modified = tiles.map((tile, index) => {
      return tile.isActive === availableTiles[index].isActive;
    });

    return modified.some((x) => !x);
  }, [tiles, availableTiles]);

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
        {tiles.map((tile) => {
          return (
            <Grid2
              key={tile.key}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              container
              size={12}
            >
              <Box width="50%">
                <FormControlLabel
                  label={getCategoryLabel(tile.key)}
                  control={
                    <Checkbox
                      id={tile.key.toString()}
                      color="secondary"
                      checked={tile.isActive}
                      onChange={handleCategoryStateChanged}
                    />
                  }
                />
              </Box>
              {}
              <Divider variant="fullWidth" />
            </Grid2>
          );
        })}
      </DialogContent>
      <Divider />
      <DialogActions>
        <SaveCancelButtons
          actionLabel={getResource('common:labelSave')}
          onAction={handleAction}
          cancelLabel={getResource('common:labelCancel')}
          cancelAction={handleCancel}
          cancelDisabled={false}
          saveDisabled={!isModified}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DashboardConfigurationDialog;
