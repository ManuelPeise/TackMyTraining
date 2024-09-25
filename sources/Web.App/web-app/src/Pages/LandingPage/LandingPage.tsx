import React from 'react';
import { useAuthentication } from 'src/Hooks/useAuthentication';
import { Navigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuthentication();

  return !isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard" />;
};

export default LandingPage;
