import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';
import { MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { tokens } from 'src/Lib/theme';

export interface IMenuItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  hasDivider?: boolean;
  setSelected: (selected: string) => void;
}

const SidebarItem: React.FC<IMenuItemProps> = (props) => {
  const { title, to, icon, selected, hasDivider, setSelected } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box p={0} m={0} bgcolor={colors.primary[600]}>
      {hasDivider && (
        <Box p={1}>
          <Divider color={colors.gray[100]} variant="fullWidth" />
        </Box>
      )}
      <MenuItem
        style={{ backgroundColor: colors.primary[600], color: colors.gray[100] }}
        onClick={() => setSelected(title)}
        icon={icon}
        disabled={selected === title}
      >
        <Typography variant="h6">
          <Link
            to={to}
            style={{ textDecoration: 'none', color: selected === title ? colors.gray[200] : colors.gray[100] }}
          >
            {title}
          </Link>
        </Typography>
      </MenuItem>
    </Box>
  );
};

export default SidebarItem;
