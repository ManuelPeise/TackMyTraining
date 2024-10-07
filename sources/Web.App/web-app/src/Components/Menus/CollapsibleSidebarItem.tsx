import React from 'react';
import { SubMenu } from 'react-pro-sidebar';
import SidebarItem, { IMenuItemProps } from './SidebarItem';
import { Box, Divider, useTheme } from '@mui/material';
import { tokens } from 'src/Lib/theme';

interface IProps {
  icon: JSX.Element;
  title: string;

  hasDivider?: boolean;
  setSelected: (selected: string) => void;
  subMenuItemProps: IMenuItemProps[];
}

const CollapsibleSidebarItem: React.FC<IProps> = (props) => {
  const { icon, title, hasDivider, subMenuItemProps } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%">
      {hasDivider && (
        <Box p={1}>
          <Divider color={colors.gray[100]} variant="fullWidth" />
        </Box>
      )}
      <SubMenu
        icon={icon}
        // disabled={selected === title}
        label={title}
        style={{ color: colors.gray[100], backgroundColor: colors.gray[800] }}
      >
        {subMenuItemProps.map((props, index) => {
          return <SidebarItem key={index} {...props} />;
        })}
      </SubMenu>
    </Box>
  );
};

export default CollapsibleSidebarItem;
