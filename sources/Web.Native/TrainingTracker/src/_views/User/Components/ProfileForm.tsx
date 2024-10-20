import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Contact, UserData } from 'src/_lib/_types/userTypes';
import { useI18n } from 'src/_hooks/useI18n';
import { useAppContext } from 'src/_hooks/useAppContext';
import { FormEntry, MergedDataType } from 'src/_lib/_types/customTypes';
import { useFormModel } from 'src/_hooks/useFormModel';
import { SaveCancelButtonProps } from 'src/_components/_buttons/SaveCancelButtons';
import FormContainer from 'src/_components/_forms/FormContainer';
import FormFieldFactory, { getFormTextFieldProps } from 'src/_components/_inputs/FormFieldFactory';
import { FormFieldTypeEnum } from 'src/_lib/_enums/FieldTypeEnum';
import { useStatefulApi } from 'src/_hooks/useStatefulApi';
import { serviceUrls } from 'src/_lib/_api/ServiceUrls';

const ProfileFormInitializationContainer: React.FC = () => {
  const { data, isLoading } = useStatefulApi<UserData>({ serviceUrl: serviceUrls.profile.getProfile });

  if (isLoading === true) {
    console.log('Is loading...');
    return null;
  }

  return <Form formId="profile-form" userData={data} />;
};

interface IFormProps {
  formId: string;
  userData: UserData;
}

const Form: React.FC<IFormProps> = (props) => {
  const { formId, userData } = props;
  const { getResource } = useI18n();
  const { styles } = useAppContext();

  const formInputModel = React.useMemo((): FormEntry<MergedDataType<UserData, Contact, Contact>, true> => {
    const data = userData as MergedDataType<UserData, Contact, Contact>;

    return {
      firstName: {
        key: 'firstName',
        value: data?.firstName,
        required: true,
        error: '',
        isValid: true,
      },
      lastName: {
        key: 'lastName',
        value: data?.lastName,
        required: true,
        error: '',
        isValid: true,
      },
      userName: {
        key: 'userName',
        value: data?.userName,
        required: false,
        error: '',
        isValid: true,
      },
      dateOfBirth: {
        key: 'dateOfBirth',
        value: data?.dateOfBirth,
        required: true,
        error: '',
        isValid: true,
      },
      email: {
        key: 'email',
        value: data?.email,
        required: false,
        error: '',
        isValid: true,
      },
      street: {
        key: 'street',
        value: data?.street,
        required: false,
        error: '',
        isValid: true,
      },
      houseNumber: {
        key: 'houseNumber',
        value: data?.houseNumber,
        required: false,
        error: '',
        isValid: true,
      },
      postalCode: {
        key: 'postalCode',
        value: data?.postalCode,
        required: false,
        error: '',
        isValid: true,
      },
      city: {
        key: 'city',
        value: data?.city,
        required: false,
        error: '',
        isValid: true,
      },
      country: {
        key: 'country',
        value: data?.country,
        required: false,
        error: '',
        isValid: true,
      },
    } as FormEntry<MergedDataType<UserData, Contact, Contact>, true>;
  }, [userData]);

  const { formModel, canSave, isModified, resetForm, handleChange } = useFormModel<FormEntry<UserData & Contact, true>>(
    formInputModel,
    true,
    () => {}
  );

  const saveCancelButtonProps = React.useMemo((): SaveCancelButtonProps => {
    return {
      position: 'flex-end',
      cancelLabel: getResource('common:labelCancel'),
      canCancel: isModified,
      onCancel: resetForm,
      saveLabel: getResource('common:labelSave'),
      canSave: isModified && canSave,
      onSave: async () => console.log('save...'),
    };
  }, [canSave, isModified, getResource, resetForm]);

  return (
    <FormContainer id={formId} saveCancelButtonProps={saveCancelButtonProps} padding={0}>
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 10}>
        <ScrollView style={{ flexGrow: 1, padding: 10 }}>
          <View id="form-header" style={styles.labelStyles.formHeaderContainer}>
            <Text style={styles.labelStyles.formHeader}>{getResource('common:labelProfile')}</Text>
          </View>
          <View id="form-profile">
            <View style={[styles.containerStyles.gridRow]}>
              <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.firstName.key,
                    formModel.firstName.value,
                    false,
                    handleChange,
                    true,
                    false,
                    getResource('common:labelFirstName')
                  )
                )}
              </View>
            </View>
            <View style={[styles.containerStyles.gridRow]}>
              <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.lastName.key,
                    formModel.lastName.value,
                    false,
                    handleChange,
                    true,
                    false,
                    getResource('common:labelLastName')
                  )
                )}
              </View>
            </View>
            <View style={[styles.containerStyles.gridRow]}>
              <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.userName.key,
                    formModel.userName.value,
                    false,
                    handleChange,
                    false,
                    true,
                    getResource('common:labelUserName')
                  )
                )}
              </View>
            </View>
            <View style={[styles.containerStyles.gridRow]}>
              <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.dateOfBirth.key,
                    formModel.dateOfBirth.value,
                    false,
                    handleChange,
                    false,
                    false,
                    getResource('common:labelDateOfBirth')
                  )
                )}
              </View>
            </View>
            <View style={[styles.containerStyles.gridRow]}>
              <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.email.key,
                    formModel.email.value,
                    false,
                    handleChange,
                    false,
                    true,
                    getResource('common:labelEmail')
                  )
                )}
              </View>
            </View>
          </View>
          <View id="form-address">
            <View id="form-header" style={styles.labelStyles.formHeaderContainer}>
              <Text style={styles.labelStyles.formHeader}>{getResource('common:labelAddress')}</Text>
            </View>
            <View style={[styles.containerStyles.gridRow]}>
              <View style={[styles.inputStyles.formItemContainer, { flex: 2, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.street.key,
                    formModel.street.value,
                    false,
                    handleChange,
                    false,
                    false,
                    getResource('common:labelStreet')
                  )
                )}
              </View>
              <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.houseNumber.key,
                    formModel.houseNumber.value,
                    false,
                    handleChange,
                    false,
                    false,
                    getResource('common:labelHouseNumber')
                  )
                )}
              </View>
            </View>
            <View style={[styles.containerStyles.gridRow]}>
              <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.postalCode.key,
                    formModel.postalCode.value,
                    false,
                    handleChange,
                    false,
                    false,
                    getResource('common:labelPostalCode')
                  )
                )}
              </View>
              <View style={[styles.inputStyles.formItemContainer, { flex: 2, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.city.key,
                    formModel.city.value,
                    false,
                    handleChange,
                    false,
                    false,
                    getResource('common:labelCity')
                  )
                )}
              </View>
            </View>
            <View style={[styles.containerStyles.gridRow]}>
              <View style={[styles.inputStyles.formItemContainer, { flex: 1, height: 70 }]}>
                {FormFieldFactory.execute(
                  FormFieldTypeEnum.Text,
                  getFormTextFieldProps(
                    formModel.country.key,
                    formModel.country.value,
                    false,
                    handleChange,
                    false,
                    false,
                    getResource('common:labelCountry')
                  )
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View id="form-actions">{/* buttonContainer */}</View>
    </FormContainer>
  );
};

export default ProfileFormInitializationContainer;
