import React from 'react';
import { useAuth } from './useAuth';
import { ApiRequestOptions } from 'src/_lib/_types/apiTypes';
import { AxiosClient } from 'src/_lib/_api/AxiosClient';

export const useStatefulApi = <T>(options: ApiRequestOptions, force?: boolean, isPublic: boolean = false) => {
  const defaultRequestOptionsRef = React.useRef<ApiRequestOptions>(options);
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { jwtData } = useAuth();

  const get = React.useCallback(async (forceRequest?: boolean, options?: ApiRequestOptions) => {
    try {
      if (options) {
        defaultRequestOptionsRef.current = options;
      }

      if (!isPublic) {
        AxiosClient.defaults.headers.common['Authorization'] = `bearer ${jwtData.jwtToken}`;
      }

      setError(null);
      setIsLoading(true);

      await AxiosClient.get(defaultRequestOptionsRef.current.serviceUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(async (res) => {
        if (res.status === 200) {
          const responseData: T = await JSON.parse(JSON.stringify(res.data));

          setData(responseData);
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
  }, []);

  const post = React.useCallback(async <TValue>(options: ApiRequestOptions, data?: string): Promise<TValue> => {
    if (!isPublic) {
      AxiosClient.defaults.headers.common['Authorization'] = `bearer ${jwtData.jwtToken}`;
    }

    let response: TValue | null = null;
    setError(null);
    setIsLoading(true);
    try {
      await AxiosClient.post(options.serviceUrl, data, {
        headers: { 'content-type': 'application/json' },
      }).then(async (res) => {
        if (res.status === 200) {
          response = await JSON.parse(JSON.stringify(res.data));
        } else {
          setError(`Request [${defaultRequestOptionsRef.current.serviceUrl}] failed with [${res.status}]!`);
        }
      });

      setIsLoading(true);

      return response;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
    return null;
  }, []);

  const updateRequestOptions = React.useCallback((options: ApiRequestOptions) => {
    defaultRequestOptionsRef.current = { ...defaultRequestOptionsRef.current, ...options };
  }, []);

  React.useEffect(() => {
    if (force) {
      const loadData = async () => {
        await get(force);
      };

      loadData();
    }
    // eslint-disable-next-line
  }, [force]);

  console.log(error);
  return {
    isLoading: isLoading,
    error: error,
    data: data,
    sendGetRequest: get,
    sendPostRequest: post,
    updateRequestOptions: updateRequestOptions,
  };
};
