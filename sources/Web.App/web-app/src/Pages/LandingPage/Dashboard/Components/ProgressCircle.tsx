import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../../Lib/theme';
import React from 'react';

interface IProps {
  progress: number;
  size: '40';
}

const ProgressCircle: React.FC<IProps> = (props) => {
  const { progress, size } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%), conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg), ${colors.greenAccent[500]}`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></Box>
  );
};

export default ProgressCircle;
