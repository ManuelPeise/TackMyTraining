import { TrainingCategoryTypeEnum } from '../Enums/TrainingCategoryTypeEnum';
import { TrainingTypeEnum } from '../Enums/TrainingTypeEnum';

export type TrainingTrackingPageProps = {
  categorizedTrainings: TrainingCategoryModel[];
};

export type TrainingModel = {
  type: TrainingTypeEnum;
  resourceKey: string;
};

export type TrainingCategoryModel = {
  category: TrainingCategoryTypeEnum;
  resourceKey: string;
  trainings: TrainingModel[];
};

export type DashboardPageProps = {
  categorizedTrainings: TrainingCategoryModel[];
};

export type ActivityTracking = {
  category: TrainingCategoryTypeEnum;
  training: TrainingTypeEnum;
  startTime: string;
  endTime: string;
  duration: number;
  burnedCalories: number | null;
  details: ActivityDetails;
};

export type ActivityDetails = {
  distance?: number;
  stepInterval?: number;
  stepCount?: number;
  averageSpeed?: number;
  repetitions?: number;
  weight?: number;
  minPulse?: number;
  maxPuls?: number;
  averageHeartRate?: number;
};
