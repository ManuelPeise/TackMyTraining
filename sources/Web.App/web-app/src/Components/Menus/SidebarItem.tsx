import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { tokens } from 'src/Lib/theme';

export interface IMenuItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  hasDivider?: boolean;
  onNavigate: (path: string) => void;
}

const SidebarItem: React.FC<IMenuItemProps> = (props) => {
  const { title, to, icon, selected, hasDivider, onNavigate } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box p={0} m={0} bgcolor={colors.gray[800]}>
      {hasDivider && (
        <Box p={1}>
          <Divider color={colors.gray[100]} variant="fullWidth" />
        </Box>
      )}
      <MenuItem
        style={{ backgroundColor: colors.gray[800], color: colors.gray[100] }}
        onClick={onNavigate.bind(null, to)}
        icon={icon}
        disabled={selected === title}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>
          {title}
        </Typography>
      </MenuItem>
    </Box>
  );
};

export default SidebarItem;
