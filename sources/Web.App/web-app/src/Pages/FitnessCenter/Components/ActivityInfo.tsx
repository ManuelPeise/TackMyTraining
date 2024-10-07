import { Box, Paper, useTheme } from '@mui/material';
import React from 'react';
import { ActivityTracking } from '../Types/types';
import { tokens } from 'src/Lib/theme';
import RingWithLabel from 'src/Components/Tools/RingWithLabel';
import { TrainingCategoryTypeEnum } from '../Enums/TrainingCategoryTypeEnum';
import { useI18n } from 'src/Hooks/useI18n';
import SimpleButton from 'src/Components/Input/Buttons/SimpleButton';

interface IProps {
  activities: ActivityTracking[];
  onCancel: () => void;
}

const ActivityInfo: React.FC<IProps> = (props) => {
  const { activities, onCancel } = props;
  const { getResource } = useI18n();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = React.useMemo(() => {
    let minutes = 0;
    let calories = 0;
    activities.forEach((x) => {
      minutes += x.duration;
    });
    activities.forEach((x) => {
      calories += x.burnedCalories;
    });
    const cardio = (activities.filter((x) => x.category === TrainingCategoryTypeEnum.Cardio)?.length ?? 0).toString();
    const running = (activities.filter((x) => x.category === TrainingCategoryTypeEnum.Running)?.length ?? 0).toString();
    const strength = (
      activities.filter((x) => x.category === TrainingCategoryTypeEnum.StrengthTraining)?.length ?? 0
    ).toString();

    const time = minutes.toString();
    const burnedCalories = calories;
    return { time, cardio, running, strength, burnedCalories };
  }, [activities]);

  return (
    <Paper
      elevation={2}
      sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', borderRadius: 0, padding: 2 }}
    >
      <Box pl={4} pr={4} height="100%" width="100%" display="flex" alignItems="center" flexDirection="row" gap={3}>
        <RingWithLabel
          ringColor={colors.chartColors.purple}
          color={colors.greenAccent[200]}
          label={data.cardio}
          subLabel={getResource('training:labelCardio')}
        />
        <RingWithLabel
          ringColor={colors.chartColors.red}
          color={colors.greenAccent[200]}
          label={data.strength}
          subLabel={getResource('training:labelStrength')}
        />
        <RingWithLabel
          ringColor={colors.chartColors.orange}
          color={colors.greenAccent[200]}
          label={data.running}
          subLabel={getResource('training:labelRunning')}
        />
        <RingWithLabel
          ringColor={colors.chartColors.yellow}
          color={colors.greenAccent[200]}
          label={data.time}
          subLabel={getResource('training:labelCalories')}
        />
        <RingWithLabel
          ringColor={colors.chartColors.green}
          color={colors.greenAccent[200]}
          label={data.time}
          subLabel={getResource('training:labelMinutes')}
        />
      </Box>
      <Box pr={4} display="flex" flexDirection="row" gap={2}>
        <SimpleButton
          sx={{ display: activities.length === 0 ? 'none' : '' }}
          disabled={activities.length === 0}
          label={getResource('common:labelCancel')}
          onAction={onCancel}
        />
        <SimpleButton
          sx={{ display: activities.length === 0 ? 'none' : '' }}
          disabled={activities.length === 0}
          label={getResource('common:labelSave')}
          onAction={() => {}}
        />
      </Box>
    </Paper>
  );
};

export default ActivityInfo;
