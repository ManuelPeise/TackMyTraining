import React, { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';
import FormContextProvider from 'src/_contextProviders/FormContextProvider';
import { useAppContext } from 'src/_hooks/useAppContext';
import { UserData } from 'src/_lib/_types/userTypes';

interface IProps extends PropsWithChildren {
  headerTitle: string;
  padding?: number;
  buttonPosition: 'flex-end' | 'center';
  data: UserData;
  onSubmit: () => Promise<boolean>;
}

const FormChildWithTitle: React.FC<IProps> = (props) => {
  const { headerTitle, padding, data, buttonPosition, children, onSubmit } = props;
  const { styles } = useAppContext();

  return (
    <View style={[styles.containerStyles.formStyle, { padding: padding }]}>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        <Text style={[styles.labelStyles.formHeader, { textAlign: 'center' }]}>{headerTitle}</Text>
      </View>
      <FormContextProvider defaultValues={data} buttonPosition={buttonPosition} onSubmit={onSubmit}>
        {children}
      </FormContextProvider>
    </View>
  );
};

export default FormChildWithTitle;
