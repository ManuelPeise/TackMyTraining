import { Box, IconButton, Paper, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { useI18n } from 'src/Hooks/useI18n';
import { MoreVert } from '@mui/icons-material';
import { toCaption } from 'src/Lib/utils';
import { colors } from 'src/Lib/colors';

interface IProps extends PropsWithChildren {
  resourceKey: string;
  toolTip?: string;
  onAction?: () => void;
}

const PageToolbar: React.FC<IProps> = (props) => {
  const { resourceKey, toolTip, children, onAction } = props;
  const { getResource } = useI18n();

  return (
    <Paper elevation={4} sx={{ width: '100%', padding: 2 }}>
      <Toolbar>
        <Typography
          component="div"
          variant="h5"
          sx={{ color: colors.text.captionBlue, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
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
