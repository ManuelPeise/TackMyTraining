import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';

interface IProps {
  error: string;
  onClose: (state: boolean) => void;
}

const ErrorBanner: React.FC<IProps> = (props) => {
  const { error, onClose } = props;
  const { styles } = useAppContext();
  return (
    <TouchableHighlight
      style={{
        position: 'absolute',
        top: 15,
        left: 10,
        width: '100%',
        padding: 6,
        borderRadius: 8,
        opacity: 0.9,
        backgroundColor: styles.colors.redAccent[500],
      }}
      onPress={() => onClose(false)}
    >
      <Text style={{ fontSize: 16, fontStyle: 'italic', color: '#ffffff', textAlign: 'center' }}>{error}</Text>
    </TouchableHighlight>
  );
};

export default ErrorBanner;
