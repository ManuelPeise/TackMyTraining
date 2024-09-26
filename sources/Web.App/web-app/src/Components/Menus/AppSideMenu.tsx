import React from 'react';
import { List } from '@mui/material';
import AppSideMenuItem from './AppSideMenuItem';
import { Dashboard, Science } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AppSideMenu: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState<string>(window.location.pathname);
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log(window.location.pathname);
    setSelectedItem(window.location.pathname);
  }, []);

  const onClick = React.useCallback(
    (path: string) => {
      setSelectedItem(path);
      navigate(path);
    },
    [navigate]
  );

  return (
    <List disablePadding sx={{ width: '100%', backgroundColor: '#f2f2f2', borderRight: '1px solid #bfbfbf' }}>
      <AppSideMenuItem
        titleResourceKey="titleDashboard"
        subTitleResourceKey="subTitleDashboard"
        icon={<Dashboard sx={{ height: 32, width: 32 }} />}
        selected={selectedItem === '/training/dashboard'}
        onClickCallback={onClick.bind(null, 'dashboard')}
      />
      <AppSideMenuItem
        titleResourceKey="titleSandbox"
        subTitleResourceKey="subTitleSandbox"
        icon={<Science sx={{ height: 32, width: 32 }} />}
        selected={selectedItem === '/training/sandbox'}
        onClickCallback={onClick.bind(null, 'sandbox')}
      />
    </List>
  );
};

export default AppSideMenu;
