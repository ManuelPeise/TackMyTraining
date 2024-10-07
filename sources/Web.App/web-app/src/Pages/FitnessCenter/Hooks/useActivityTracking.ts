import React from 'react';
import { ActivityDetails, ActivityTracking, TrainingCategoryModel } from '../Types/types';
import { DropdownItemProps } from 'src/Components/Input/Dropdowns/DropDown';
import { TrainingCategoryTypeEnum } from '../Enums/TrainingCategoryTypeEnum';
import { TrainingTypeEnum } from '../Enums/TrainingTypeEnum';
import { sortByKey } from 'src/Lib/utils';
import moment from 'moment';
import { getTrainingDetailsFormConfiguration } from '../Utils/FormConfiguration';

const initialActivity: ActivityTracking = {
  category: TrainingCategoryTypeEnum.Unknown,
  training: TrainingTypeEnum.Unknown,
  duration: 0,
  startTime: moment().toDate().toString(),
  endTime: '',
  burnedCalories: null,
  details: {} as ActivityDetails,
};

export const useActivityTracking = (trainingCategories: TrainingCategoryModel[]) => {
  const [activities, setActivities] = React.useState<ActivityTracking[]>([]);
  const [activity, setActivity] = React.useState<ActivityTracking>(initialActivity);
  const [detailsDialogOpen, setDetailsDialogOpen] = React.useState<boolean>(false);

  const categoryDropdownItems = React.useMemo((): DropdownItemProps[] => {
    const props: DropdownItemProps[] = [
      { disabled: true, value: TrainingCategoryTypeEnum.Unknown, resourceKey: 'training:labelSelect' },
    ];
    const categoryProps: DropdownItemProps[] = [];

    trainingCategories.forEach((cat) => {
      categoryProps.push({
        disabled: activity.category === cat.category,
        value: cat.category,
        resourceKey: `training:${cat.resourceKey}`,
      });
    });

    return [...props, ...categoryProps.sort((x, y) => sortByKey(x.resourceKey, y.resourceKey, 'string'))];
  }, [activity, trainingCategories]);

  const trainingDropdownItems = React.useMemo((): DropdownItemProps[] => {
    const props: DropdownItemProps[] = [
      { disabled: true, value: TrainingTypeEnum.Unknown, resourceKey: 'training:labelSelect' },
    ];
    const trainingProps: DropdownItemProps[] = [];

    const trainings: TrainingCategoryModel =
      trainingCategories.find((cat) => cat.category === activity.category) ?? null;

    if (trainings == null) {
      return props;
    }

    trainings.trainings.forEach((training) => {
      trainingProps.push({
        disabled: activity.training === training.type,
        value: training.type,
        resourceKey: `training:${training.resourceKey}`,
      });
    });

    return [...props, ...trainingProps.sort((x, y) => sortByKey(x.resourceKey, y.resourceKey, 'string'))];
  }, [activity, trainingCategories]);

  const formConfiguration = React.useMemo(() => {
    const configuration = getTrainingDetailsFormConfiguration(activity.category);

    if (configuration == null) {
      return null;
    }

    return configuration;
  }, [activity.category]);

  const handleCategoryChanged = React.useCallback(
    (value: number) => {
      setActivity({ ...activity, category: value as TrainingCategoryTypeEnum });
    },
    [activity]
  );

  const handleTrainingChanged = React.useCallback(
    (value: number) => {
      setActivity({ ...activity, training: value as TrainingTypeEnum });
    },
    [activity]
  );

  const handleDurationChanged = React.useCallback(
    (value: number) => {
      setActivity({ ...activity, duration: value });
    },
    [activity]
  );

  const handleStartTimeChanged = React.useCallback(
    (value: moment.Moment) => {
      setActivity({ ...activity, startTime: value.toLocaleString() });
    },
    [activity]
  );

  const handleBurnedCaloriesChanged = React.useCallback(
    (value: number) => {
      setActivity({ ...activity, burnedCalories: value });
    },
    [activity]
  );

  const handleResetActivity = React.useCallback(() => {
    setActivity(initialActivity);
  }, []);

  const handleAddActivity = React.useCallback(
    (activity: ActivityTracking) => {
      const copy = [...activities];

      activity.endTime = moment(activity.startTime).add(activity.duration, 'minutes').toDate().toString();
      copy.push(activity);

      setActivities(copy);
      setActivity(initialActivity);
    },
    [activities]
  );

  const handleActivityDetailsChanged = React.useCallback(
    (key: keyof ActivityDetails, value: number) => {
      setActivity({ ...activity, details: { ...activity.details, [key]: value } });
    },
    [activity]
  );

  const resetActivityDetails = React.useCallback(() => {
    setActivity({ ...activity, details: initialActivity.details });
    setDetailsDialogOpen(false);
  }, [activity]);

  const handleResetActivities = React.useCallback(() => {
    setActivities([]);
  }, []);

  return {
    activity: activity,
    categoryDropdownItems: categoryDropdownItems,
    trainingDropdownItems: trainingDropdownItems,
    trainingDetailsFormConfiguration: formConfiguration,
    availableActivities: activities,
    detailsDialogOpen: detailsDialogOpen,
    handleToggleDialog: setDetailsDialogOpen,
    handleCategoryChanged: handleCategoryChanged,
    handleTrainingChanged: handleTrainingChanged,
    handleDurationChanged: handleDurationChanged,
    handleStartTimeChanged: handleStartTimeChanged,
    handleBurnedCaloriesChanged: handleBurnedCaloriesChanged,
    handleResetActivity: handleResetActivity,
    handleAddActivity: handleAddActivity,
    handleActivityDetailsChanged: handleActivityDetailsChanged,
    resetActivityDetails: resetActivityDetails,
    handleResetActivities,
  };
};
