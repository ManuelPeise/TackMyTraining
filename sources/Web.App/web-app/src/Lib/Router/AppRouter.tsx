import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateAppRoute from './PrivateAppRoute';
import LandingPage from 'src/Pages/LandingPage/LandingPage';
import { AuthContextProvider } from '../Context/AuthContext';
import LoginPage from 'src/Pages/Auth/LoginPage';
import RegisterPage from 'src/Pages/Auth/RegisterPage';
import AppToolBar from 'src/Components/AppBar/ToolBar';
import SandBox from 'src/Pages/Sandbox/Sandbox';
import HealthDataPage from 'src/Pages/HealthDataMonitor/HealthDataPage';
import DashboardInitializationContainer from 'src/Pages/LandingPage/Dashboard/Dashboard';
import { ColorModeContext, useMode } from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
// import 'src/index.css';

const AppRouter: React.FC = () => {
  const { theme, colorMode } = useMode();

  const [filterText, setFilterText] = React.useState<string>('');
  const [currentRoute, setCurrentRoute] = React.useState('dashboard');

  const handleChangeRoute = React.useCallback((route: string) => {
    setCurrentRoute(route);
  }, []);

  const onFilterTextChanged = React.useCallback((filter: string) => {
    setFilterText(filter);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <AppToolBar filterText={filterText} onSearch={onFilterTextChanged} />
            <main className="content">
              <Routes>
                <Route path="" Component={LandingPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/register" Component={RegisterPage} />
                {/* private routes */}
                <Route
                  path="/"
                  element={<PrivateAppRoute currentRoute={currentRoute} handleRouteChanged={handleChangeRoute} />}
                >
                  <Route path="/dashboard" Component={DashboardInitializationContainer} />
                  <Route path="/health" Component={HealthDataPage} />
                  <Route path="/sandbox" Component={SandBox} />
                </Route>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </AuthContextProvider>
    </ColorModeContext.Provider>
  );
};

export default AppRouter;
