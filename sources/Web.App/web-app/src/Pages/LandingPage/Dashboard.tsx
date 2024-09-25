import { Grid2 } from '@mui/material';
import React from 'react';
import { serviceUrls, useApi } from 'src/Hooks/useApi';

interface ITestResult {
  value: string;
}
const Dashboard: React.FC = () => {
  const { result, error, get } = useApi<ITestResult>({ serviceUrl: serviceUrls.test });

  const handleGet = React.useCallback(async () => {
    await get(true, { serviceUrl: serviceUrls.test });
  }, [get]);

  console.log('Result: ', result?.value);
  return (
    <Grid2
      sx={{ width: '100%', height: '100vh', display: 'flex' }}
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <div>Dashboard</div>
      <button onClick={handleGet}>Get Data</button>
      <p></p>
      <p>{`Result: ${result?.value ?? error}`}</p>
    </Grid2>
  );
};

export default Dashboard;
