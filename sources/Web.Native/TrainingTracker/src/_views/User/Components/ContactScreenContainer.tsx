import React from 'react';
import { View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';
import { useStatefulApi } from 'src/_hooks/useStatefulApi';
import { serviceUrls } from 'src/_lib/_api/ServiceUrls';
import { ContactImport, UserData } from 'src/_lib/_types/userTypes';
import FormContextProvider from 'src/_contextProviders/FormContextProvider';
import { FieldValues } from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import ContactForm from './ContactForm';
import LoadingIndicatorWithText from 'src/_components/_indicators/LoadingIndicatorWithText';
import { useI18n } from 'src/_hooks/useI18n';

interface IProps {
  userData: UserData;
  updateContactCallback: (contact: ContactImport) => Promise<boolean>;
}

const ContactFormInitializationContainer: React.FC = () => {
  const { data, isLoading, sendGetRequest, sendPostRequest } = useStatefulApi<UserData>(
    { serviceUrl: serviceUrls.profile.getProfile },
    true
  );
  const { getResource } = useI18n();

  const updateContactData = React.useCallback(
    async (contactData: ContactImport): Promise<boolean> => {
      return await sendPostRequest<boolean>(
        { serviceUrl: serviceUrls.profile.postContactData },
        JSON.stringify(contactData)
      ).then(async (res) => {
        if (res) {
          await sendGetRequest();

          return true;
        }

        return false;
      });
    },
    [sendPostRequest]
  );

  if (isLoading === true || data == null) {
    return <LoadingIndicatorWithText text={getResource('common:loadingServer')} />;
  }

  return <ContactScreenContainer userData={data} updateContactCallback={updateContactData} />;
};

const ContactScreenContainer: React.FC<IProps> = (props) => {
  const { userData, updateContactCallback } = props;
  const { styles } = useAppContext();

  const onSubmitContact = React.useCallback(
    async (fieldValues: FieldValues): Promise<boolean> => {
      const contactImportModel: ContactImport = {
        street: fieldValues['street'] ?? userData.contactData.street,
        houseNumber: fieldValues['houseNumber'] ?? userData.contactData.houseNumber,
        postalCode: fieldValues['postalCode'] ?? userData.contactData.postalCode,
        city: fieldValues['city'] ?? userData.contactData.city,
        country: fieldValues['country'] ?? userData.contactData.country,
      };

      return await updateContactCallback(contactImportModel);
    },
    [userData, updateContactCallback]
  );

  return (
    <View style={[styles.containerStyles.flexContainerStyle, { borderRadius: 0 }]}>
      <View
        style={[
          styles.containerStyles.profileHeaderStyle,
          { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <View style={{ borderRadius: 50, height: 70, width: 70 }}>
          <Icon name="mail" size={70} color={styles.colors.blueAccent[300]} />
        </View>
      </View>

      <FormContextProvider
        defaultValues={userData}
        additionalStyle={{ borderRadius: 0, height: '100%' }}
        buttonPosition="flex-end"
        onSubmit={onSubmitContact}
      >
        <ContactForm userData={userData} />
      </FormContextProvider>
    </View>
  );
};

export default ContactFormInitializationContainer;
