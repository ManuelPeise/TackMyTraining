import React from 'react';
import { TrainingCategoryModel, TrainingTrackingPageProps } from './Types/types';
import { StatelessApiService } from 'src/Lib/Api/StatelessApi';
import { serviceUrls } from 'src/Hooks/useApi';
import { IJwtData } from 'src/Lib/Interfaces/IUserData';
import { LocalStorageKeyEnum } from 'src/Lib/LocalStorage';
import { useLocalStorage } from 'src/Hooks/useLocalStorage';
import { useComponentInitialization } from 'src/Hooks/useComponentInitialization';
import GridPageBodyBase from '../GridPageBodyBase';
import { Box, useTheme } from '@mui/material';
import { tokens } from 'src/Lib/theme';
import ActivityTracker from './Components/ActivityTracker';
import { useActivityTracking } from './Hooks/useActivityTracking';
import ActivityDetailsDialog from './Components/ActivityDetailsDialog';
import ActivityInfo from './Components/ActivityInfo';
import TrainingImageContainer from './Components/TrainingImageContainer';

const initializeAsync = async (token: string): Promise<TrainingTrackingPageProps> => {
  const trainingServiceApi = StatelessApiService.create<TrainingCategoryModel[]>(
    { serviceUrl: serviceUrls.training.getTrainingAvailableCategorizedConfigurations },
    token
  );

  const [categorizedTrainings] = await Promise.all([trainingServiceApi.get()]);

  return {
    categorizedTrainings: categorizedTrainings,
  };
};

const TrackingPageContainer: React.FC = () => {
  const tokenStorage = useLocalStorage<IJwtData>(LocalStorageKeyEnum.JwtData);

  const initializationProps = useComponentInitialization<TrainingTrackingPageProps>(
    initializeAsync.bind(null, tokenStorage.item.jwtToken)
  );

  if (!initializationProps.isInitialized) {
    return null;
  }

  return <TrainingTackingPage {...initializationProps.props} />;
};

const TrainingTackingPage: React.FC<TrainingTrackingPageProps> = (props) => {
  const { categorizedTrainings } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    activity,
    availableActivities,
    detailsDialogOpen,
    categoryDropdownItems,
    trainingDropdownItems,
    trainingDetailsFormConfiguration,
    handleToggleDialog,
    handleCategoryChanged,
    handleTrainingChanged,
    handleDurationChanged,
    handleStartTimeChanged,
    handleBurnedCaloriesChanged,
    handleResetActivity,
    handleAddActivity,
    handleActivityDetailsChanged,
    resetActivityDetails,
    handleResetActivities,
  } = useActivityTracking(categorizedTrainings);

  console.log(availableActivities);
  return (
    <GridPageBodyBase toolbarCaptionResourceKey="training:captionTrainingTracking">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="100px" gap="10px">
        <Box
          gridColumn={{ md: '1 / span 8', xl: '1 / span 8' }}
          gridRow="1 / span 1"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <ActivityInfo activities={availableActivities} onCancel={handleResetActivities} />
        </Box>
        <Box
          gridColumn={{ md: '1 / span 8', xl: '1 / span 8' }}
          gridRow="2 / span 7"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <TrainingImageContainer delay={10000} />
        </Box>
        <Box
          gridColumn={{ md: '9 / span 4', xl: '9 / span 4' }}
          gridRow="1 / span 8"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <ActivityTracker
            activity={activity}
            categoryItems={categoryDropdownItems}
            trainingItems={trainingDropdownItems}
            handleOpenDetailsDialog={handleToggleDialog}
            onCategoryChanged={handleCategoryChanged}
            onTrainingChanged={handleTrainingChanged}
            onDurationChanged={handleDurationChanged}
            onStartTimeChanged={handleStartTimeChanged}
            onBurnedCaloriesChanged={handleBurnedCaloriesChanged}
            handleResetActivity={handleResetActivity}
            handleAddActivity={handleAddActivity}
          />
        </Box>
        {trainingDetailsFormConfiguration && (
          <ActivityDetailsDialog
            open={detailsDialogOpen}
            sets={3}
            formConfiguration={trainingDetailsFormConfiguration}
            handleCloseDialog={handleToggleDialog}
            handleChange={handleActivityDetailsChanged}
            handleResetDetails={resetActivityDetails}
          />
        )}
      </Box>
    </GridPageBodyBase>
  );
};

export default TrackingPageContainer;
