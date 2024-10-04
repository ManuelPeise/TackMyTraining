import React, { PropsWithChildren } from 'react';
import { Grid2 } from '@mui/material';

interface IProps extends PropsWithChildren {}

const PageLayout: React.FC<IProps> = (props) => {
  return (
    <Grid2 size={12} container>
      {props.children}
    </Grid2>
  );
};

export default PageLayout;
