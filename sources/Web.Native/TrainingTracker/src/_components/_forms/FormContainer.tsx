import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import SaveCancelButtons, { SaveCancelButtonProps } from '../_buttons/SaveCancelButtons';
import { useAppContext } from 'src/_hooks/useAppContext';

interface IProps extends PropsWithChildren {
  id: string;
  saveCancelButtonProps: SaveCancelButtonProps;
  padding?: number;
  backgroundColor?: string;
}

/**
 *
 * @param props provides a form wrapper to wrap form containers
 * @returns
 */
const FormContainer: React.FC<IProps> = (props) => {
  const { saveCancelButtonProps, padding, backgroundColor, children } = props;
  const { styles } = useAppContext();

  return (
    <View
      style={[
        styles.containerStyles.formStyle,
        { width: '100%', height: '100%', padding: padding, backgroundColor: backgroundColor },
      ]}
    >
      <View>{children}</View>
      <SaveCancelButtons {...saveCancelButtonProps} />
    </View>
  );
};

export default FormContainer;
