import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PrivateAppRoute from './PrivateAppRoute';
import LandingPage from 'src/Pages/LandingPage/LandingPage';
import Dashboard from 'src/Pages/LandingPage/Dashboard';
import PageLayout from 'src/Components/Containers/PageLayout';
import { AuthContextProvider } from '../Context/AuthContext';
import LoginPage from 'src/Pages/Auth/LoginPage';
import RegisterPage from 'src/Pages/Auth/RegisterPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter basename="/trainingstracker">
      <AuthContextProvider>
        <PageLayout>
          <Routes>
            <Route path="" Component={LandingPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
            {/* private routes */}
            <Route path="/" element={<PrivateAppRoute />}>
              <Route path="/dashboard" Component={Dashboard} />
            </Route>
          </Routes>
        </PageLayout>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
