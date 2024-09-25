import React, { PropsWithChildren } from 'react';
import { Grid2 } from '@mui/material';
import AppToolBar from 'src/Components/AppBar/ToolBar';

interface IProps extends PropsWithChildren {}

const PageLayout: React.FC<IProps> = (props) => {
  return (
    <Grid2>
      <Grid2 bgcolor="ButtonFace" size={12}>
        <AppToolBar />
      </Grid2>
      <Grid2 container>{props.children}</Grid2>
    </Grid2>
  );
};

export default PageLayout;
