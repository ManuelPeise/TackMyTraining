import { Box, Paper, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from 'src/Lib/theme';
import { StatelessApiService } from 'src/Lib/Api/StatelessApi';
import { DashboardPageProps, TrainingCategoryModel, TrainingTrackingPageProps } from './Types/types';
import { serviceUrls } from 'src/Hooks/useApi';
import { useLocalStorage } from 'src/Hooks/useLocalStorage';
import { IJwtData } from 'src/Lib/Interfaces/IUserData';
import { LocalStorageKeyEnum } from 'src/Lib/LocalStorage';
import { useComponentInitialization } from 'src/Hooks/useComponentInitialization';
import GridPageBodyBase from '../GridPageBodyBase';

const initializeAsync = async (token: string): Promise<DashboardPageProps> => {
  const trainingServiceApi = StatelessApiService.create<TrainingCategoryModel[]>(
    { serviceUrl: serviceUrls.training.getTrainingAvailableCategorizedConfigurations },
    token
  );

  const [categorizedTrainings] = await Promise.all([trainingServiceApi.get()]);

  return {
    categorizedTrainings: categorizedTrainings,
  };
};

const DashboardInitContainer: React.FC = () => {
  const tokenStorage = useLocalStorage<IJwtData>(LocalStorageKeyEnum.JwtData);

  const initializationProps = useComponentInitialization<TrainingTrackingPageProps>(
    initializeAsync.bind(null, tokenStorage.item.jwtToken)
  );

  if (!initializationProps.isInitialized) {
    return null;
  }

  return <FitnessCenterDashboard {...initializationProps.props} />;
};

const FitnessCenterDashboard: React.FC<DashboardPageProps> = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <GridPageBodyBase toolbarCaptionResourceKey="training:captionTrainingTracking">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="100px" gap="5px">
        <Box
          gridColumn={{ md: '1 / span 8', xl: '1 / span 8' }}
          gridRow="1 / span 1"
          sx={{ backgroundColor: colors.primary[400] }}
        >
          <Paper></Paper>
        </Box>
        <Box
          gridColumn={{ md: '1 / span 8', xl: '1 / span 8' }}
          gridRow="2 / span 7"
          sx={{ backgroundColor: colors.primary[400] }}
        ></Box>
        <Box
          gridColumn={{ md: '9 / span 4', xl: '9 / span 4' }}
          gridRow="1 / span 8"
          sx={{ backgroundColor: colors.primary[400] }}
        ></Box>
      </Box>
    </GridPageBodyBase>
  );
};

export default DashboardInitContainer;
