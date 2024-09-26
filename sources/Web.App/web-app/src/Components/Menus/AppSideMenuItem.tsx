import { Grid2, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useI18n } from 'src/Hooks/useI18n';

interface IProps {
  titleResourceKey: string;
  subTitleResourceKey?: string;
  selected: boolean;
  disabled?: boolean;
  icon: JSX.Element;
  onClickCallback: () => void;
}

const AppSideMenuItem: React.FC<IProps> = (props) => {
  const { titleResourceKey, subTitleResourceKey, disabled, icon, selected, onClickCallback } = props;
  const { getResource } = useI18n();

  return (
    <ListItemButton
      sx={{
        width: '100%',
        '&:hover': { backgroundColor: '#fff', cursor: 'pointer' },
        '&.MuiListItemButton-divider': { borderBottom: '1px solid #bfbfbf' },
      }}
      disabled={disabled || selected}
      divider
      onClick={onClickCallback}
    >
      <Grid2 container>
        <Grid2 size={3} alignContent="center">
          <ListItemIcon>{icon}</ListItemIcon>
        </Grid2>
        <Grid2 size={9}>
          <ListItemText>
            <Typography variant="body1">{getResource(`menu:${titleResourceKey}`)}</Typography>
          </ListItemText>
          <ListItemText>
            {subTitleResourceKey ? (
              <Typography height={16} color="#bfbfbf" variant="body2">
                {getResource(`menu:${subTitleResourceKey}`)}
              </Typography>
            ) : (
              <Typography height={16} variant="body2"></Typography>
            )}
          </ListItemText>
        </Grid2>
      </Grid2>
    </ListItemButton>
  );
};

export default AppSideMenuItem;
