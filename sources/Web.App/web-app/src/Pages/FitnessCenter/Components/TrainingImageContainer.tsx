import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useI18n } from 'src/Hooks/useI18n';
import muscles from 'src/Lib/Img/muscles.jpg';
import pushups from 'src/Lib/Img/pushups.jpg';
import running from 'src/Lib/Img/running.jpg';

interface IProps {
  delay: number;
}

const TrainingImageContainer: React.FC<IProps> = (props) => {
  const { delay } = props;
  const { getResource } = useI18n();

  const [index, setIndex] = React.useState(0);

  const images = React.useMemo(() => {
    return [muscles, pushups, running];
  }, []);

  const callback = React.useCallback(() => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }, [images, index]);

  React.useEffect(() => {
    let id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [delay, callback]);

  return (
    <Paper elevation={4} sx={{ position: 'relative', height: '100%', width: '100%', borderRadius: 0, padding: 2 }}>
      <Box
        component="img"
        alt=""
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: '#000000',
        }}
        src={images[index]}
      />
      <Box position="absolute" display="flex" justifyContent="center" bottom={30} width="100%">
        <Typography sx={{ fontSize: '2.5rem', fontStyle: 'italic', opacity: 0.5 }}>
          {getResource('training:sloganTargets')}
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '100%',
          width: '100%',
          opacity: 0.5,
          backgroundColor: '#000000',
        }}
      ></Box>
    </Paper>
  );
};

export default TrainingImageContainer;
