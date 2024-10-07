import { Box, Grid2 } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import FitnessCenterToolbar from './FitnessCenter/Components/FitnessCenterToolbar';

interface IGridPageBodyProps extends PropsWithChildren {
  toolbarCaptionResourceKey: string;
}

const GridPageBodyBase: React.FC<IGridPageBodyProps> = (props) => {
  const { toolbarCaptionResourceKey, children } = props;
  return (
    // <Box height="100%" width="100%">
    <Grid2 display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="10px">
      <Box gridColumn="span 12">
        <FitnessCenterToolbar
          resourceKey={toolbarCaptionResourceKey}
          // toolTip={getResource('common:labelConfigureDashboard')}
          // onAction={() => setDialogOpen(true)}
        />
      </Box>
      <Box gridColumn="span 12">{children}</Box>
    </Grid2>
    // </Box>
  );
};

export default GridPageBodyBase;
