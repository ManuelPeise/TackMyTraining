import { Box, useTheme } from '@mui/material';
import React from 'react';
import FitnessCenterToolbar from './Components/FitnessCenterToolbar';
// import { useI18n } from 'src/Hooks/useI18n';
import { tokens } from 'src/Lib/theme';

const FitnessCenterDashboard: React.FC = () => {
  //   const { getResource } = useI18n();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="10px">
        <Box gridColumn="span 12" width="100%">
          <FitnessCenterToolbar
            resourceKey="captionFitnessCenter"
            // toolTip={getResource('common:labelConfigureDashboard')}
            // onAction={() => setDialogOpen(true)}
          />
        </Box>
        <Box gridColumn="span 12">
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="10px">
            <Box
              gridColumn={{ md: '1 / span 6', xl: '1 / span 6' }}
              gridRow="span 1"
              sx={{ backgroundColor: colors.primary[400] }}
            >
              Test
            </Box>
            <Box
              gridColumn={{ md: '7 / span 6', xl: '7 / span 6' }}
              gridRow="span 1"
              sx={{ backgroundColor: colors.primary[400] }}
            >
              Test
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FitnessCenterDashboard;
