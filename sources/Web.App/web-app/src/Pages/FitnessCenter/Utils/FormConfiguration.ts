import { TrainingCategoryTypeEnum } from '../Enums/TrainingCategoryTypeEnum';

export type TrainingDetailsFormSettings = {
  hasHeartRateSection?: boolean;
  hasDistanceSection?: boolean;
  hasSetsSection?: boolean;
};
export type TrainingFormConfiguration = {
  category: TrainingCategoryTypeEnum;
  settings: TrainingDetailsFormSettings;
};

const trainingFormConfiguration: TrainingFormConfiguration[] = [
  {
    category: TrainingCategoryTypeEnum.Cardio,
    settings: {
      hasHeartRateSection: true,
      hasDistanceSection: false,
      hasSetsSection: false,
    },
  },
  {
    category: TrainingCategoryTypeEnum.Running,
    settings: {
      hasHeartRateSection: true,
      hasDistanceSection: true,
      hasSetsSection: false,
    },
  },
  {
    category: TrainingCategoryTypeEnum.StrengthTraining,
    settings: {
      hasHeartRateSection: true,
      hasDistanceSection: false,
      hasSetsSection: true,
    },
  },
];

export const getTrainingDetailsFormConfiguration = (category: TrainingCategoryTypeEnum): TrainingFormConfiguration => {
  const formConfiguration = trainingFormConfiguration?.find((config) => config.category === category) ?? null;

  if (formConfiguration == null) {
    return null;
  }

  return formConfiguration;
};
