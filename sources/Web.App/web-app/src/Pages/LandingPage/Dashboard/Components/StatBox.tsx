import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../../Lib/theme';
import React from 'react';
import ProgressCircle from './ProgressCircle';

interface IProps {
  title: string;
  subTitle: string;
  icon: JSX.Element;
  progress: number;
  increase: string;
}

const StatBox: React.FC<IProps> = (props) => {
  const { title, subTitle, icon, progress, increase } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: colors.gray[100] }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} size="40" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" sx={{ color: colors.greenAccent[100] }}>
          {subTitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: colors.greenAccent[600] }}>
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
