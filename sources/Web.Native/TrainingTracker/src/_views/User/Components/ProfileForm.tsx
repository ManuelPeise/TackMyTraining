import React from 'react';
import { View, Text } from 'react-native';
import FormTextField from 'src/_components/_forms/Fields/FormTextField';
import { useAppContext } from 'src/_hooks/useAppContext';
import { useCustomFormContext } from 'src/_hooks/useCustomFormContext';
import { useI18n } from 'src/_hooks/useI18n';
import { UserData } from 'src/_lib/_types/userTypes';
import { isValidDate, isValidEmail } from 'src/_lib/validation';

interface IProps {
  userData: UserData;
}

const ProfileForm: React.FC<IProps> = (props) => {
  const { userData } = props;
  const { styles } = useAppContext();
  const { getResource } = useI18n();

  const { control, registerField } = useCustomFormContext();

  const isValidStringLength = (value: string, length: number) => {
    return value.length > 3;
  };

  return (
    <View style={{ padding: 16 }}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Text style={[styles.labelStyles.formHeader, { display: 'flex', textAlign: 'center' }]}>
          {getResource('common:labelYourProfileData')}
        </Text>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            required
            placeholder={getResource('common:labelFirstName')}
            defaultValue={userData.firstName}
            {...registerField('firstName', { required: true, validate: isValidStringLength })}
          />
        </View>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            required
            placeholder={getResource('common:labelLastName')}
            defaultValue={userData.lastName}
            {...registerField('lastName', { required: true, validate: isValidStringLength })}
          />
        </View>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            disabled
            placeholder={getResource('common:labelUserName')}
            defaultValue={userData.userName}
            {...registerField('userName')}
          />
        </View>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            disabled
            placeholder={getResource('common:labelDateOfBirth')}
            defaultValue={userData.dateOfBirth}
            {...registerField('dateOfBirth', { required: true, validate: isValidDate })}
          />
        </View>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            required
            placeholder={getResource('common:labelEmail')}
            defaultValue={userData.email}
            {...registerField('email', { required: true, validate: isValidEmail })}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileForm;
