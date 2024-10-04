import React from 'react';

export const useLocation = () => {
  const [location, setLocation] = React.useState(window.location.pathname);

  React.useEffect(() => {
    setLocation(window.location.pathname);
  }, []);

  return { location };
};
