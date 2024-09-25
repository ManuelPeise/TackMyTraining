import React from 'react';
import { AxiosClient } from 'src/Lib/Api/AxiosClient';
import { useLocalStorage } from './useLocalStorage';
import { IJwtData } from 'src/Lib/Interfaces/IUserData';
import { LocalStorageKeyEnum } from 'src/Lib/LocalStorage';

type ApiCache<T> = {
  [key: string]: T;
};

type ApiRequestOptions = {
  serviceUrl: string;
  parameters?: { [key: string]: any } | null;
  body?: string;
};

type ApiResult<T> = {
  result: T;
  isLoading: boolean;
  error: string | null;
  get: (forceRequest?: boolean, options?: ApiRequestOptions) => Promise<void>;
  post: (options?: ApiRequestOptions, data?: string) => Promise<T | null>;
};

export const serviceUrls = {
  auth: {
    login: 'LoginService/Login',
    registration: 'UserRegistration/RegisterUser',
  },
  test: 'Test/Tester',
};

export const useApi = <T>(apiOptions: ApiRequestOptions, isPublic: boolean = false): ApiResult<T> => {
  const { item } = useLocalStorage<IJwtData>(LocalStorageKeyEnum.JwtData);

  const defaultRequestOptionsRef = React.useRef<ApiRequestOptions>(apiOptions);
  const [cache, setCache] = React.useState<ApiCache<T>>({} as ApiCache<T>);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const get = React.useCallback(
    async (forceRequest?: boolean, options?: ApiRequestOptions): Promise<void> => {
      try {
        if (options) {
          defaultRequestOptionsRef.current = options;
        }

        if (!forceRequest && !cache[defaultRequestOptionsRef.current.serviceUrl]) return;

        if (!isPublic) {
          AxiosClient.defaults.headers.common['Authorization'] = `bearer ${item.jwtToken}`;
        }

        setError(null);
        setIsLoading(true);

        await AxiosClient.get(defaultRequestOptionsRef.current.serviceUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }).then(async (res) => {
          if (res.status === 200) {
            cache[defaultRequestOptionsRef.current.serviceUrl] = await JSON.parse(JSON.stringify(res.data));

            setCache(cache);
          } else {
            setError(`Request [${defaultRequestOptionsRef.current.serviceUrl}] failed with [${res.status}]!`);
          }
        });

        setIsLoading(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [cache, item, isPublic]
  );

  const post = React.useCallback(
    async (options?: ApiRequestOptions, data?: string): Promise<T | null> => {
      if (options) {
        defaultRequestOptionsRef.current = options;
      }

      cache[defaultRequestOptionsRef.current.serviceUrl] = {} as T;

      if (!isPublic) {
        AxiosClient.defaults.headers.common['Authorization'] = `bearer ${item.jwtToken}`;
      }

      setError(null);
      setIsLoading(true);
      try {
        await AxiosClient.post(defaultRequestOptionsRef.current.serviceUrl, data, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }).then(async (res) => {
          if (res.status === 200) {
            console.log(`data received...`);
            cache[defaultRequestOptionsRef.current.serviceUrl] = await JSON.parse(JSON.stringify(res.data));

            setCache(cache);
          } else {
            setError(`Request [${defaultRequestOptionsRef.current.serviceUrl}] failed with [${res.status}]!`);
          }
        });

        setIsLoading(true);

        return cache[defaultRequestOptionsRef.current.serviceUrl] ?? null;
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }

      return null;
    },
    [cache, item, isPublic]
  );

  React.useEffect(() => {
    if (!cache[defaultRequestOptionsRef.current.serviceUrl] && defaultRequestOptionsRef.current.parameters != null) {
      const loadData = async () => {
        await get();
      };

      loadData();
    }
    // eslint-disable-next-line
  }, []);

  return {
    result: cache[defaultRequestOptionsRef.current.serviceUrl],
    isLoading: isLoading,
    error: error,
    get,
    post,
  };
};
