import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useI18n } from 'src/Hooks/useI18n';

interface IProps {}

const DashboardToolbar: React.FC<IProps> = (props) => {
  const { getResource } = useI18n();

  return (
    <Paper elevation={4} sx={{ width: '100%', padding: 2 }}>
      <Box>
        <Typography variant="h5">{getResource('common:captionDashboard')}</Typography>
      </Box>
    </Paper>
  );
};

export default DashboardToolbar;
