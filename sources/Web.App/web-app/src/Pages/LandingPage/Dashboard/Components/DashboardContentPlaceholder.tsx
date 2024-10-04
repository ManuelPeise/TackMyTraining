import { Box, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ErrorOutlineOutlined } from '@mui/icons-material';
import { useI18n } from 'src/Hooks/useI18n';
import { tokens } from 'src/Lib/theme';

const DashboardContentPlaceholder: React.FC = () => {
  const { getResource } = useI18n();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ backgroundColor: colors.primary[400] }}>
      <Paper
        elevation={4}
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 0, padding: 4 }}
      >
        <Box display="flex" justifyContent="center" alignItems="baseline" padding={5}>
          <ErrorOutlineOutlined sx={{ width: 60, height: 60, color: colors.red[600] }} />
          <Typography variant="h4" color={colors.red[400]}>
            {getResource('common:captionNoActiveDashboardTiles')}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography variant="h5" color={colors.gray[200]}>
            {getResource('common:subTitleNoActiveDashboardTiles')}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardContentPlaceholder;
