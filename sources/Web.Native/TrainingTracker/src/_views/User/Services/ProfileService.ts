import { useAuth } from 'src/_hooks/useAuth';
import { useComponentInitialization } from 'src/_hooks/useComponentInitialization';
import { serviceUrls } from 'src/_lib/_api/ServiceUrls';
import { createStatelessApi } from 'src/_lib/_api/StatelessApi';
import { StatelessApiResult } from 'src/_lib/_types/apiTypes';
import { UserData } from 'src/_lib/_types/userTypes';

type ProfileInitialization = {
  isLoading?: boolean;
  api: StatelessApiResult<UserData>;
  userData: UserData;
  getUserData: () => Promise<UserData>;
  postProfile: (profile: UserData) => Promise<void>;
};

const initialize = async (jwt: string): Promise<ProfileInitialization> => {
  const api = createStatelessApi<UserData>({ serviceUrl: serviceUrls.profile.getProfile });

  const getUserData = async () => {
    return await api.get(api.options, jwt);
  };

  const postProfile = async (profile: UserData) => {
    await api.post({ serviceUrl: serviceUrls.profile.postProfile }, jwt);
  };

  const [userData] = await Promise.all([getUserData()]);

  return {
    api,
    userData,
    getUserData,
    postProfile,
  };
};

export const ProfileService = (): ProfileInitialization => {
  const { jwtData } = useAuth();

  const { isInitialized, props } = useComponentInitialization<ProfileInitialization>(
    initialize.bind(null, jwtData.jwtToken)
  );

  return {
    ...props,
    isLoading: !isInitialized,
  };
};
