import React from 'react';
import { SafeAreaView } from 'react-native';
import FormContextProvider from 'src/_contextProviders/FormContextProvider';

export type DevModel = {
  name: string;
  firstName: string;
  birthDay: string;
  age: number;
  isActive: boolean;
};

const devModel: DevModel = {
  name: 'Peise',
  firstName: 'Manuel',
  birthDay: '20.04.1980',
  age: 44,
  isActive: true,
};

const SandboxScreen: React.FC = () => {
  const ref = React.useRef<any>(null);

  ref.current;
  console.log('ref', ref);

  const onSubmit = React.useCallback(async (): Promise<boolean> => {
    console.log('test');

    return true;
  }, []);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <FormContextProvider
        defaultValues={devModel}
        padding={20}
        marginTop={15}
        buttonPosition="flex-end"
        onSubmit={onSubmit}
      ></FormContextProvider>
    </SafeAreaView>
  );
};

export default SandboxScreen;
