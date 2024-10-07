import { Box, Divider, Typography, useTheme } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { StyledSectionTitle } from 'src/Components/Styled/StyledTypography';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from 'src/Components/Styled/StyledDialog';
import { useI18n } from 'src/Hooks/useI18n';
import NumberInput from 'src/Components/Input/InputFields/NumberInput';
import SimpleButton from 'src/Components/Input/Buttons/SimpleButton';
import { ActivityDetails } from '../Types/types';
import { TrainingFormConfiguration } from '../Utils/FormConfiguration';

interface IProps {
  open: boolean;
  sets?: number;
  formConfiguration: TrainingFormConfiguration;
  handleCloseDialog: (open: boolean) => void;
  handleResetDetails: () => void;
  handleChange: (key: keyof ActivityDetails, value: number) => void;
}

interface IActivityGridRowProps extends PropsWithChildren {
  title: string;
  padding?: number;
  paddingTop?: number;
}

const ActivityDialogGridRow: React.FC<IActivityGridRowProps> = (props) => {
  const { title, padding, paddingTop, children } = props;
  return (
    <Box p={padding} pt={paddingTop} display="grid" gridAutoColumns="repeat(12, 1fr)" columnGap="10px">
      <Box>
        <StyledSectionTitle variant="h5">{title}</StyledSectionTitle>
        <Divider variant="fullWidth" />
      </Box>
      {children}
    </Box>
  );
};

const ActivityDetailsDialog: React.FC<IProps> = (props) => {
  const { open, sets, formConfiguration, handleChange, handleResetDetails, handleCloseDialog } = props;
  const { getResource } = useI18n();
  const theme = useTheme();

  const setRows = React.useMemo(() => {
    const rows: JSX.Element[] = [];
    if (!sets) {
      return rows;
    }

    for (let set = 0; set < sets; set++) {
      rows.push(
        <ActivityDialogGridRow
          padding={1}
          paddingTop={2}
          title={getResource('training:labelActivitySet').replace('{value}', (set + 1).toString())}
        >
          <Box paddingTop={2} key={set} p={2} display="grid" gridAutoColumns="repeat(12, 1fr)" columnGap="10px">
            <Box gridColumn={{ md: '1 / span 6' }}>
              <NumberInput
                fullWidth
                label={getResource('training:labelWeight')}
                value={0}
                onChange={(x) => handleChange('weight', x)}
              />
            </Box>
            <Box gridColumn={{ md: '7 / span 6' }}>
              <NumberInput
                fullWidth
                label={getResource('training:labelReplications')}
                value={0}
                onChange={(x) => handleChange('repetitions', x)}
              />
            </Box>
          </Box>
        </ActivityDialogGridRow>
      );
    }

    return rows;
  }, [sets, getResource, handleChange]);

  return (
    <StyledDialog open={open} fullWidth {...theme}>
      <StyledDialogTitle>
        <Typography variant="h4">{getResource('training:labelAddActivityDetails')}</Typography>
      </StyledDialogTitle>
      <StyledDialogContent {...theme}>
        {formConfiguration.settings.hasHeartRateSection && (
          <Box p={2} display="grid" gridAutoColumns="repeat(12, 1fr)" columnGap="10px">
            <ActivityDialogGridRow title="Heart">
              <Box p={2} display="grid" gridAutoColumns="repeat(12, 1fr)" columnGap="10px">
                <Box gridColumn={{ md: '1 / span 4' }}>
                  <NumberInput
                    fullWidth
                    label={getResource('training:labelMinPulse')}
                    value={0}
                    onChange={(x) => handleChange('minPulse', x)}
                  />
                </Box>
                <Box gridColumn={{ md: '5 / span 4' }}>
                  <NumberInput
                    fullWidth
                    label={getResource('training:labelMaxPulse')}
                    value={0}
                    onChange={(x) => handleChange('maxPuls', x)}
                  />
                </Box>
                <Box gridColumn={{ md: '9 / span 4' }}>
                  <NumberInput
                    fullWidth
                    label={getResource('training:labelAverageHeartRate')}
                    value={0}
                    onChange={(x) => handleChange('averageHeartRate', x)}
                  />
                </Box>
              </Box>
            </ActivityDialogGridRow>
          </Box>
        )}
        {formConfiguration.settings.hasDistanceSection && (
          <Box p={2} display="grid" gridAutoColumns="repeat(12, 1fr)" columnGap="10px">
            <ActivityDialogGridRow title="Distance">
              <Box p={2} display="grid" gridAutoColumns="repeat(12, 1fr)" columnGap="10px">
                <Box gridColumn={{ md: '1 / span 3' }}>
                  <NumberInput
                    fullWidth
                    label={getResource('training:labelDistance')}
                    value={0}
                    onChange={(x) => handleChange('distance', x)}
                  />
                </Box>
                <Box gridColumn={{ md: '4 / span 3' }}>
                  <NumberInput
                    fullWidth
                    label={getResource('training:labelStepCount')}
                    value={0}
                    onChange={(x) => handleChange('stepCount', x)}
                  />
                </Box>
                <Box gridColumn={{ md: '7 / span 3' }}>
                  <NumberInput
                    fullWidth
                    label={getResource('training:labelStepInterval')}
                    value={0}
                    onChange={(x) => handleChange('stepInterval', x)}
                  />
                </Box>
                <Box gridColumn={{ md: '10 / span 3' }}>
                  <NumberInput
                    fullWidth
                    label={getResource('training:labelAverageSpeed')}
                    value={0}
                    onChange={(x) => handleChange('averageSpeed', x)}
                  />
                </Box>
              </Box>
            </ActivityDialogGridRow>
          </Box>
        )}
        {formConfiguration.settings.hasSetsSection && (
          <Box p={2} display="grid" gridAutoColumns="repeat(12, 1fr)" columnGap="10px">
            <ActivityDialogGridRow padding={0} title="Strength">
              {setRows.map((row) => row)}
            </ActivityDialogGridRow>
          </Box>
        )}
      </StyledDialogContent>
      <StyledDialogActions {...theme}>
        <Box p={2} display="grid" gridAutoColumns="repeat(12, 1fr)" columnGap="10px">
          <Box gridColumn={{ md: '7 / span 3' }}>
            <SimpleButton label={getResource('common:labelCancel')} onAction={handleResetDetails} />
          </Box>
          <Box gridColumn={{ md: '10 / span 3' }}>
            <SimpleButton label={getResource('common:labelOk')} onAction={() => handleCloseDialog(false)} />
          </Box>
        </Box>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ActivityDetailsDialog;
