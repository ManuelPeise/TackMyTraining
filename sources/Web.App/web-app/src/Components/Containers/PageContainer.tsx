import React, { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

const PageContainer: React.FC<IProps> = (props) => {
  const { children } = props;

  return <div className="page-container">{children}</div>;
};

export default PageContainer;
