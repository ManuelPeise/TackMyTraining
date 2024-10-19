import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';
import { useI18n } from 'src/_hooks/useI18n';

export type SaveCancelButtonProps = {
  position: 'flex-end' | 'center';
  saveLabel?: string;
  cancelLabel?: string;
  canSave?: boolean;
  canCancel?: boolean;
  onSave?: () => Promise<void>;
  onCancel?: () => void;
};

const SaveCancelButtons: React.FC<SaveCancelButtonProps> = (props) => {
  const { position, saveLabel, cancelLabel, canCancel, canSave, onSave, onCancel } = props;
  const { styles } = useAppContext();
  const { getResource } = useI18n();

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: position,
        padding: 10,
        paddingRight: position === 'flex-end' ? 20 : 0,
      }}
    >
      <View style={{ display: 'flex', alignItems: 'center', minWidth: 60 }}>
        <TouchableOpacity
          style={[styles.inputStyles.saveCancelButton, { display: !canCancel || !onCancel ? 'none' : 'flex' }]}
          disabled={!canCancel}
          onPress={onCancel}
        >
          <Text style={styles.inputStyles.saveCancelButtonLabel}>
            {cancelLabel ?? getResource('common:labelCancel')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', alignItems: 'center', minWidth: 60 }}>
        <TouchableOpacity
          style={[styles.inputStyles.saveCancelButton, { display: !canCancel || !canSave ? 'none' : 'flex' }]}
          disabled={!canSave}
          onPress={onSave}
        >
          <Text style={styles.inputStyles.saveCancelButtonLabel}>{saveLabel ?? getResource('common:labelSave')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SaveCancelButtons;
