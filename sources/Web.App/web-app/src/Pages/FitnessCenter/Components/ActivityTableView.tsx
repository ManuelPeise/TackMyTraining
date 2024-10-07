import React from 'react';
import { ActivityTracking, TrainingCategoryModel } from '../Types/types';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useI18n } from 'src/Hooks/useI18n';
import moment from 'moment';

interface IProps {
  activities: ActivityTracking[];
  categorizedTrainings: TrainingCategoryModel[];
}

const ActivityTableView: React.FC<IProps> = (props) => {
  const { activities, categorizedTrainings } = props;
  const { getResource } = useI18n();
  return (
    <Box sx={{ height: '100%', maxHeight: '100%' }}>
      <Box sx={{ height: '100%' }}>
        <TableContainer
          sx={{
            display: 'flex',
            alignContent: 'space-between',
            borderRadius: 0,
            maxHeight: '100%',
            height: '100%',
            overflow: 'scroll',
          }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="left">Training</TableCell>
                <TableCell align="right">Start</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Calories (kcal)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity, index) => {
                const model = categorizedTrainings.find((x) => x.trainings.find((y) => y.type === activity.training));

                const trainingKey = model.trainings.find((x) => x.type === activity.training).resourceKey;
                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left">{getResource(`training:${model.resourceKey}`)}</TableCell>
                    <TableCell align="left">{getResource(`training:${trainingKey}`)}</TableCell>
                    <TableCell align="right">{moment(activity.startTime).format('DD.MM.YYYY HH:mm')}</TableCell>
                    <TableCell align="right">
                      {getResource(`training:labelDurationInMinutes`).replace('{value}', activity.duration.toFixed())}
                    </TableCell>
                    <TableCell align="right">{activity.burnedCalories ?? 'n/a'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <caption>A basic table example with a caption</caption>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ width: '100%' }}></Box>
    </Box>
  );
};

export default ActivityTableView;
