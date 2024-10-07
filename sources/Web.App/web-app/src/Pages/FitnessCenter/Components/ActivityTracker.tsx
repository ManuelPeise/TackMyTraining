import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { ActivityTracking } from '../Types/types';
import Dropdown, { DropdownItemProps } from 'src/Components/Input/Dropdowns/DropDown';
import { useI18n } from 'src/Hooks/useI18n';
import DurationSlider from './DurationSlider';
import DatePicker from 'src/Components/Input/DatePickers/DatePicker';
import moment from 'moment';
import { TrainingCategoryTypeEnum } from '../Enums/TrainingCategoryTypeEnum';
import { TrainingTypeEnum } from '../Enums/TrainingTypeEnum';
import NumberInput from 'src/Components/Input/InputFields/NumberInput';
import SimpleButton from 'src/Components/Input/Buttons/SimpleButton';

interface IProps {
  activity: ActivityTracking;
  categoryItems: DropdownItemProps[];
  trainingItems: DropdownItemProps[];
  handleOpenDetailsDialog: (open: boolean) => void;
  onCategoryChanged: (value: number) => void;
  onTrainingChanged: (value: number) => void;
  onDurationChanged: (value: number) => void;
  onBurnedCaloriesChanged: (value: number) => void;
  onStartTimeChanged: (value: moment.Moment) => void;
  handleResetActivity: () => void;
  handleAddActivity: (activity: ActivityTracking) => void;
}

const ActivityTracker: React.FC<IProps> = (props) => {
  const {
    activity,
    categoryItems,
    trainingItems,
    handleOpenDetailsDialog,
    onCategoryChanged,
    onTrainingChanged,
    onDurationChanged,
    onStartTimeChanged,
    onBurnedCaloriesChanged,
    handleResetActivity,
    handleAddActivity,
  } = props;

  const { getResource } = useI18n();
  return (
    <Paper elevation={2} sx={{ borderRadius: 0, padding: 5, height: '100%' }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="10px" height="100%">
        <Box gridColumn={{ md: '1 / span 12', xl: '1 / span 12' }} gridRow="span 2">
          <Typography pt={2} pb={2} variant="h4">
            {getResource('training:captionAddNewActivity')}
          </Typography>
        </Box>
        <Box p={1} gridColumn={{ md: '1 / span 12', xl: '1 / span 12' }} gridRow="span 1">
          <Dropdown
            id="training-category-dropdown"
            fullWidth
            value={activity.category}
            items={categoryItems}
            handleChange={onCategoryChanged}
          />
        </Box>
        <Box p={1} gridColumn={{ md: '1 / span 12', xl: '1 / span 12' }} gridRow="span 1">
          <Dropdown
            id="training-category-dropdown"
            fullWidth
            disabled={activity.category === TrainingCategoryTypeEnum.Unknown}
            value={activity.training}
            items={trainingItems}
            handleChange={onTrainingChanged}
          />
        </Box>
        <Box p={1} gridColumn={{ md: '1 / span 12', xl: '1 / span 12' }} gridRow="span 1">
          <DatePicker
            fullWidth
            format="DD.MM.YYYY HH:mm"
            includeTime
            disabled={activity.training === TrainingTypeEnum.Unknown}
            label={getResource('training:labelStartTime')}
            value={activity.startTime}
            handleChange={onStartTimeChanged}
          />
        </Box>
        <Box p={1} gridColumn={{ md: '1 / span 12', xl: '1 / span 12' }} gridRow="span 1">
          <DurationSlider
            label={getResource('training:labelDuration')}
            value={activity.duration}
            maxValue={240}
            disabled={activity.training === TrainingTypeEnum.Unknown}
            onChange={onDurationChanged}
          />
        </Box>
        <Box p={1} gridColumn={{ md: '1 / span 12', xl: '1 / span 12' }} gridRow="span 1">
          <NumberInput
            label={getResource('training:labelBurnedCalories')}
            fullWidth
            disabled={activity.duration === 0}
            value={activity.burnedCalories}
            onChange={onBurnedCaloriesChanged}
          />
        </Box>
        <Box
          p={1}
          display="flex"
          justifyContent="space-between"
          columnGap={2}
          gridColumn={{ md: '1 / span 12', xl: '1 / span 12' }}
          gridRow="span 1"
        >
          <SimpleButton
            sx={{ opacity: activity.duration === 0 || activity.burnedCalories === 0 ? 0 : 1 }}
            label={getResource('training:labelAddDetails')}
            disabled={activity.duration === 0 || activity.burnedCalories === 0}
            onAction={() => handleOpenDetailsDialog(true)}
          />
          <Box display="flex" flexDirection="row" columnGap={2}>
            <SimpleButton
              sx={{ opacity: activity.duration === 0 || activity.burnedCalories === 0 ? 0 : 1 }}
              label={getResource('common:labelCancel')}
              disabled={false}
              onAction={handleResetActivity}
            />
            <SimpleButton
              sx={{ opacity: activity.duration === 0 || activity.burnedCalories === 0 ? 0 : 1 }}
              label={getResource('common:labelOk')}
              disabled={activity.duration === 0 || activity.burnedCalories === 0}
              onAction={handleAddActivity.bind(null, activity)}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActivityTracker;
