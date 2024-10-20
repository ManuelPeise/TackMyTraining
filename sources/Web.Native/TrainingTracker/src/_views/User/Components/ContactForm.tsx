import React from 'react';
import { View, Text } from 'react-native';
import FormTextField from 'src/_components/_forms/Fields/FormTextField';
import { useAppContext } from 'src/_hooks/useAppContext';
import { useCustomFormContext } from 'src/_hooks/useCustomFormContext';
import { useI18n } from 'src/_hooks/useI18n';
import { UserData } from 'src/_lib/_types/userTypes';
import { houseNumberValidation, postalCodeValidation } from 'src/_lib/validation';

interface IProps {
  userData: UserData;
}

const ContactForm: React.FC<IProps> = (props) => {
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
          {getResource('common:labelYourContactData')}
        </Text>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            required
            placeholder={getResource('common:labelStreet')}
            defaultValue={userData.contactData.street}
            {...registerField('street', { required: true, validate: isValidStringLength })}
          />
        </View>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            required
            placeholder={getResource('common:labelHouseNumber')}
            defaultValue={userData.contactData.houseNumber}
            {...registerField('houseNumber', { required: true, validate: houseNumberValidation })}
          />
        </View>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            required
            placeholder={getResource('common:labelPostalCode')}
            defaultValue={userData.contactData.postalCode}
            {...registerField('postalCode', { required: true, validate: postalCodeValidation })}
          />
        </View>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            required
            placeholder={getResource('common:labelCity')}
            defaultValue={userData.contactData.city}
            {...registerField('city', { required: true, validate: isValidStringLength })}
          />
        </View>
      </View>
      <View style={[styles.containerStyles.gridRow]}>
        <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
          <FormTextField
            control={control}
            required
            placeholder={getResource('common:labelCountry')}
            defaultValue={userData.contactData.country}
            {...registerField('country', { required: true, validate: isValidStringLength })}
          />
        </View>
      </View>
    </View>
  );
};

export default ContactForm;
