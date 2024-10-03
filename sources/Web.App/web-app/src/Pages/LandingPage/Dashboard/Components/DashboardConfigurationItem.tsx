import { Checkbox, Divider, FormControlLabel, Grid2, Typography } from '@mui/material';
import React from 'react';
import { useI18n } from 'src/Hooks/useI18n';
import { DashboardTileEnum } from '../Enums/DashboardTileEnum';

interface IProps {
  index: number;
  id: string;
  isChecked: boolean;
  labelKey: string;
  hasDivider: boolean;
  onTileConfigurationChanged: (key: DashboardTileEnum, checked: boolean) => void;
}

const DashboardConfigurationItem: React.FC<IProps> = (props) => {
  const { index, id, isChecked, labelKey, hasDivider, onTileConfigurationChanged } = props;

  const { getResource } = useI18n();

  const handleTileConfigurationChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const key: DashboardTileEnum = parseInt(e.currentTarget.id);

      onTileConfigurationChanged(key, checked);
    },
    [onTileConfigurationChanged]
  );

  return (
    <Grid2 key={index} size={12}>
      <Grid2 size={12} display="flex" flexDirection="row" justifyContent="space-around" alignItems="baseline">
        <Grid2 size={6}>
          <Typography variant="h6">{getResource(`common:${labelKey}`)}</Typography>
        </Grid2>
        <Grid2 size={4}>
          <FormControlLabel
            label={getResource('common:labelShow')}
            control={<Checkbox id={id} checked={isChecked} onChange={handleTileConfigurationChanged} />}
          />
        </Grid2>
      </Grid2>
      {hasDivider && <Divider variant="middle" />}
    </Grid2>
  );
};

export default DashboardConfigurationItem;
