import { Grid2, Paper } from '@mui/material';
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
import CustomChart from 'src/Components/Charts/CustomChart';
import { ChartConfigurationProps, useChart } from 'src/Hooks/useChart';
import { colors } from 'src/Lib/colors';
import { useStatefulApi } from 'src/Hooks/useStateFulApi';

interface IHealthDataPageProps {
  healthData: HealthData;
  // statisticData: HealthStatisticData[];
  healthDataSetApi: StatelessApi<HealthData>;
  statisticApi: StatelessApi<HealthStatisticData[]>;
  saveHealthData: (dataset: HealthData) => Promise<boolean>;
}

type HealthPageData = {
  from: moment.Moment | null;
  to: moment.Moment | null;
};

const initialData: HealthPageData = {
  from: moment().subtract(7, 'days'),
  to: moment(),
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

  let [healthDataset] = await Promise.all([healthDatasetApi.get()]);

  const saveHealthDataCallback = async (dataset: HealthData): Promise<boolean> => {
    return await healthDatasetApi.post<boolean>({ serviceUrl: serviceUrls.health.dataImport }, dataset);
  };

  return {
    healthData: healthDataset,
    // statisticData: statisticData,
    healthDataSetApi: healthDatasetApi,
    statisticApi: healthStatisticApi,
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

  const initializationProps = useComponentInitialization<IHealthDataPageProps>(
    initializeAsync.bind(
      null,
      { from: healthDataForm.state.from, to: healthDataForm.state.to },
      tokenStorage.item.jwtToken
    )
  );

  const statisticApiService = useStatefulApi(initializationProps?.props?.statisticApi);

  const chartConfig = React.useMemo(() => {
    const config: { [key: string]: ChartConfigurationProps } = {
      heartBeat: {
        label: getResource('common:labelHeartBeat'),
        color: 'red',
      },
      weight: {
        label: getResource('common:labelWeight'),
        color: 'blue',
      },
      bmi: {
        label: getResource('common:labelBodyMassIndex'),
        color: 'yellow',
      },
      bodyFat: {
        label: getResource('common:labelBodyFat'),
        color: 'green',
      },
      muscleMass: {
        label: getResource('common:labelMuscleMass'),
        color: 'purple',
      },
    };

    return config;
  }, [getResource]);

  const healthStatistics = React.useMemo(() => {
    const array: HealthData[] = [];
    statisticApiService.data?.forEach((data) => {
      array.push(data.healthData);
    });

    return array;
  }, [statisticApiService]);

  const [lastHealthDataSet, setLastHealthDataSet] = React.useState<HealthData>(initializationProps?.props?.healthData);

  const { type, options, data } = useChart<HealthData>(
    {
      labelKey: 'date',
      keys: ['weight', 'bmi', 'bodyFat', 'muscleMass', 'heartBeat'],
      model: healthStatistics,
      chartConfiguration: chartConfig,
      bottomLabelLength: 10,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: getResource('common:labelChartBottom'),
            color: colors.text.dialogCaption,
            font: {
              family: 'Serif',
              size: 20,
              weight: 'bold',
              lineHeight: 1.5,
            },
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: getResource('common:labelChartValue'),
            color: colors.text.dialogCaption,
            font: {
              family: 'Sans-serif',
              size: 20,
              weight: 'bold',
              lineHeight: 1.5,
            },
          },
        },
      },
    },
    getResource('common:captionHealthDataMonitor')
  );

  const handleOpenDialog = React.useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setDialogOpen(false);
  }, []);

  const refreshLastHealthDataSet = React.useCallback(async () => {
    const result = await initializationProps.props.healthDataSetApi.get();
    await statisticApiService.get();
    setLastHealthDataSet(result);
  }, [initializationProps, statisticApiService]);

  React.useEffect(() => {
    if (initializationProps?.props?.healthData !== undefined) {
      setLastHealthDataSet(initializationProps.props.healthData);
    }
  }, [initializationProps?.props?.healthData]);

  React.useEffect(() => {
    const onLoad = async () => {
      const parameters: { [key: string]: string } = {};
      parameters['from'] = `${healthDataForm.state.from.format(dateFormats.YearMonthDay)}`;
      parameters['to'] = `${healthDataForm.state.to.format(dateFormats.YearMonthDay)}`;
      await statisticApiService.get({ parameters: parameters });
    };

    onLoad();

    // eslint-disable-next-line
  }, [healthDataForm.state]);

  if (!initializationProps.isInitialized) {
    return null;
  }

  return (
    <Grid2
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        backgroundColor: '#f2f2f2',
        padding: 2,
      }}
      rowSpacing={10}
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
      <Grid2 sx={{ width: '100%' }}>
        <Paper elevation={4}>
          <CustomChart type={type} options={options} data={data} />
        </Paper>
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
