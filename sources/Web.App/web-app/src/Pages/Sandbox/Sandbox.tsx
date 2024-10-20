import React from 'react';
import { useApi } from 'src/Hooks/useApi';

const SandBox: React.FC = () => {
  const { result } = useApi({ serviceUrl: 'ProfileService/GetProfile' }, true);

  console.log(result);
  return <div>SandBox</div>;
};

export default SandBox;
