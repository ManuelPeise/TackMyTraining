import { Box, Button, IconButton, InputBase, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { ColorModeContext, tokens } from 'src/Lib/theme';
import { DarkModeOutlined, LightModeOutlined, Search, AccountCircle, Delete } from '@mui/icons-material';
import { useI18n } from 'src/Hooks/useI18n';

interface IToolbarBarProps {
  hasSearchBar?: boolean;
  filterText?: string;
  onSearch?: (filter: string) => void;
}

const AppToolBar: React.FC<IToolbarBarProps> = (props) => {
  const { hasSearchBar, filterText, onSearch } = props;
  const { isAuthenticated, userData, onLogout } = useAuthentication();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { getResource } = useI18n();
  const onFilter = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.currentTarget.value);
    },
    [onSearch]
  );

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" sx={{ backgroundColor: colors.primary[400], borderRadius: '3px' }}>
        {hasSearchBar && (
          <Box>
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" value={filterText} onChange={onFilter} />
            <IconButton type="button" sx={{ p: 1 }}>
              {filterText === '' ? <Search /> : <Delete />}
            </IconButton>
          </Box>
        )}
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
        </IconButton>
        {isAuthenticated && (
          <Box display="flex">
            <IconButton>
              <AccountCircle />
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#329ea8' }} disabled>
                <Typography
                  variant="button"
                  component="div"
                  sx={{ color: '#05b0fa', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  {getResource('common:labelLoggedInAs').replace('{user}', userData?.displayName)}
                </Typography>
              </Button>
              <Button sx={{ color: '#329ea8' }} onClick={onLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AppToolBar;
