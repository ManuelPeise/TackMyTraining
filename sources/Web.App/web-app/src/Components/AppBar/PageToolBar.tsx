import { Box, IconButton, Paper, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { useI18n } from 'src/Hooks/useI18n';
import { MoreVert } from '@mui/icons-material';
import { toCaption } from 'src/Lib/utils';
import { tokens } from 'src/Lib/theme';

interface IProps extends PropsWithChildren {
  resourceKey: string;
  toolTip?: string;
  onAction?: () => void;
}

const PageToolbar: React.FC<IProps> = (props) => {
  const { resourceKey, toolTip, children, onAction } = props;
  const { getResource } = useI18n();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper elevation={4} sx={{ width: '100%', padding: 2 }}>
      <Toolbar>
        <Typography
          component="div"
          variant="h2"
          sx={{ color: colors.gray[100], flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          {toCaption(getResource(`common:${resourceKey}`))}
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: { xl: 10 } }}>{children}</Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {toolTip && (
            <IconButton onClick={onAction}>
              <Tooltip title={toolTip}>
                <MoreVert sx={{ height: 32, width: 32 }} />
              </Tooltip>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </Paper>
  );
};

export default PageToolbar;
