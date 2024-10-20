import React from 'react';
import { View } from 'react-native';
import { useAppContext } from 'src/_hooks/useAppContext';
import { useStatefulApi } from 'src/_hooks/useStatefulApi';
import { serviceUrls } from 'src/_lib/_api/ServiceUrls';
import { ProfileImport, UserData } from 'src/_lib/_types/userTypes';
import ProfileForm from './ProfileForm';
import FormContextProvider from 'src/_contextProviders/FormContextProvider';
import { FieldValues } from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import LoadingIndicatorWithText from 'src/_components/_indicators/LoadingIndicatorWithText';
import { useI18n } from 'src/_hooks/useI18n';

interface IProps {
  userData: UserData;
  updateProfileCallback: (profile: ProfileImport) => Promise<boolean>;
}

const ProfileFormInitializationContainer: React.FC = () => {
  const { data, isLoading, sendGetRequest, sendPostRequest } = useStatefulApi<UserData>(
    { serviceUrl: serviceUrls.profile.getProfile },
    true
  );

  const { getResource } = useI18n();
  const updateProfileData = React.useCallback(
    async (profileData: ProfileImport): Promise<boolean> => {
      return await sendPostRequest<boolean>(
        { serviceUrl: serviceUrls.profile.postProfileUpdate },
        JSON.stringify(profileData)
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

  return <ProfileScreenContainer userData={data} updateProfileCallback={updateProfileData} />;
};

const ProfileScreenContainer: React.FC<IProps> = (props) => {
  const { userData, updateProfileCallback } = props;
  const { styles } = useAppContext();

  const onSubmitProfile = React.useCallback(
    async (fieldValues: FieldValues): Promise<boolean> => {
      const profileImportModel: ProfileImport = {
        firstName: fieldValues['firstName'] ?? userData.firstName,
        lastName: fieldValues['lastName'] ?? userData.lastName,
        email: fieldValues['email'] ?? userData.email,
      };

      return await updateProfileCallback(profileImportModel);
    },
    [userData, updateProfileCallback]
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
          <Icon name="idcard" size={70} color={styles.colors.blueAccent[300]} />
        </View>
      </View>

      <FormContextProvider
        defaultValues={userData}
        additionalStyle={{ borderRadius: 0, height: '100%' }}
        buttonPosition="flex-end"
        onSubmit={onSubmitProfile}
      >
        <ProfileForm userData={userData} />
      </FormContextProvider>
    </View>
  );
};

export default ProfileFormInitializationContainer;
