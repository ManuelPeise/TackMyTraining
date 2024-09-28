import { Grid2 } from '@mui/material';
import moment from 'moment';
import React from 'react';
import PageToolbar from 'src/Components/AppBar/PageToolBar';
import FormInput from 'src/Components/Input/Form/FormInput';
import { TValue } from 'src/customTypes';
import { useFormModel } from 'src/Hooks/useFormModel';
import { useI18n } from 'src/Hooks/useI18n';
import { DataTypeEnum } from 'src/Lib/Enums/DataTypeEnum';
import AddHealthDataDialog from './Components/AddHealthDataDialog';
import { serviceUrls } from 'src/Hooks/useApi';
import { HealthData, HealthStatisticData, TimeRange } from 'src/dataTypes';
import { useComponentInitialization } from 'src/Hooks/useComponentInitialization';
import { StatelessApi, StatelessApiService } from 'src/Lib/Api/StatelessApi';
import { useLocalStorage } from 'src/Hooks/useLocalStorage';
import { LocalStorageKeyEnum } from 'src/Lib/LocalStorage';
import { IJwtData } from 'src/Lib/Interfaces/IUserData';
import { dateFormats } from 'src/Lib/constants';

interface IHealthDataPageProps {
  healthData: HealthData;
  statisticData: HealthStatisticData[];
  healthDataSetApi: StatelessApi<HealthData>;
  saveHealthData: (dataset: HealthData) => Promise<boolean>;
}

type HealthPageData = {
  from: moment.Moment | null;
  to: moment.Moment | null;
};

const initialData: HealthPageData = {
  from: moment().subtract(6, 'days'),
  to: moment().add(1, 'days'),
};

const initializeAsync = async (range: TimeRange, token: string): Promise<IHealthDataPageProps> => {
  const statisticParameters: { [key: string]: string } = {};
  statisticParameters['from'] = `${range.from.format(dateFormats.YearMonthDay)}`;
  statisticParameters['to'] = `${range.to.format(dateFormats.YearMonthDay)}`;

  const healthDatasetApi = StatelessApiService.create<HealthData>(
    { serviceUrl: serviceUrls.health.getLastDataSet },
    token
  );
  const healthStatisticApi = StatelessApiService.create<HealthStatisticData[]>(
    {
      serviceUrl: serviceUrls.health.statisticData,
      parameters: statisticParameters,
    },
    token
  );

  const [healthDataset, statisticData] = await Promise.all([healthDatasetApi.get(), healthStatisticApi.get()]);

  const saveHealthDataCallback = async (dataset: HealthData): Promise<boolean> => {
    return await healthDatasetApi.post<boolean>({ serviceUrl: serviceUrls.health.dataImport }, dataset);
  };

  return {
    healthData: healthDataset,
    statisticData: statisticData,
    healthDataSetApi: healthDatasetApi,
    saveHealthData: saveHealthDataCallback,
  };
};

const HealthDataPage: React.FC = () => {
  const { getResource } = useI18n();
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const dialogRef = React.useRef<HTMLDivElement | null>();

  const tokenStorage = useLocalStorage<IJwtData>(LocalStorageKeyEnum.JwtData);

  const healthDataForm = useFormModel<HealthPageData, TValue>(initialData, [
    { key: 'from', required: true, type: DataTypeEnum.Date },
    { key: 'to', required: true, type: DataTypeEnum.Date },
  ]);

  const timeRange = React.useMemo((): TimeRange => {
    return { from: healthDataForm.state.from, to: healthDataForm.state.to };
  }, [healthDataForm]);

  const initializationProps = useComponentInitialization<IHealthDataPageProps>(
    initializeAsync.bind(null, timeRange, tokenStorage.item.jwtToken)
  );

  const [lastHealthDataSet, setLastHealthDataSet] = React.useState<HealthData>(initializationProps?.props?.healthData);

  const handleOpenDialog = React.useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setDialogOpen(false);
  }, []);

  const refreshLastHealthDataSet = React.useCallback(async () => {
    const result = await initializationProps.props.healthDataSetApi.get();
    setLastHealthDataSet(result);
  }, [initializationProps]);

  React.useEffect(() => {
    if (initializationProps?.props?.healthData !== undefined) {
      setLastHealthDataSet(initializationProps.props.healthData);
    }
  }, [initializationProps?.props?.healthData]);

  if (!initializationProps.isInitialized) {
    return null;
  }

  console.log(initializationProps.props.statisticData);
  return (
    <Grid2
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        backgroundColor: '#f2f2f2',
        padding: 2,
      }}
      gap={3}
      justifyContent="flex-start"
      alignItems="flex-start"
      alignContent="flex-start"
      direction="column"
      container
    >
      <Grid2 container sx={{ width: '100%' }}>
        <PageToolbar
          resourceKey="captionHealthMonitoring"
          toolTip={getResource('common:labelAddHealthData')}
          onAction={handleOpenDialog}
        >
          <Grid2 size={12} columnGap={6} sx={{ display: { xs: 'none', sm: 'none', xl: 'flex' }, width: '100%' }}>
            <Grid2 size={6}>
              <FormInput
                label={getResource('common:labelFromDate')}
                error={getResource('common:errorDateMustBeSet')}
                fullWidth
                {...healthDataForm.formMembers.from}
              />
            </Grid2>
            <Grid2 size={6}>
              <FormInput
                label={getResource('common:labelToDate')}
                error={getResource('common:errorDateMustBeSet')}
                fullWidth
                {...healthDataForm.formMembers.to}
              />
            </Grid2>
          </Grid2>
        </PageToolbar>
      </Grid2>
      <Grid2 container direction="row" spacing={0} wrap="wrap" sx={{ width: '100%' }}>
        <Grid2 container spacing={0} rowSpacing={2} columnSpacing={1} sx={{ width: '100%' }}></Grid2>
      </Grid2>
      {dialogOpen && (
        <AddHealthDataDialog
          dialogRef={dialogRef}
          data={lastHealthDataSet}
          open={dialogOpen}
          onSave={initializationProps?.props.saveHealthData}
          onClose={handleCloseDialog}
          refreshLastHealthDataSet={refreshLastHealthDataSet}
        />
      )}
    </Grid2>
  );
};

export default HealthDataPage;
