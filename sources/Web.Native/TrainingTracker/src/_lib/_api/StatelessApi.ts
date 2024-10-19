import { ApiRequestOptions, StatelessApiResult } from '../_types/apiTypes';
import { AxiosClient } from './AxiosClient';

export const createStatelessApi = <T>(options: ApiRequestOptions): StatelessApiResult<T> => {
  return {
    options: options,
    get: get,
    post: post,
  };
};

const get = async <T>(options: ApiRequestOptions, jwt: string): Promise<T> => {
  try {
    let responseData: T = null;
    AxiosClient.defaults.headers.common['Authorization'] = `bearer ${jwt}`;

    await AxiosClient.get(options.serviceUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(async (res) => {
      if (res.status === 200) {
        console.log('status', res.status);
        responseData = await JSON.parse(JSON.stringify(res.data));
      } else {
      }
    });

    return responseData;
  } catch (err) {
    return null;
  }
};

const post = async (options: ApiRequestOptions, jwt: string, data?: string): Promise<boolean> => {
  AxiosClient.defaults.headers.common['Authorization'] = `bearer ${jwt}`;

  let response: boolean = false;

  try {
    await AxiosClient.post(options.serviceUrl, data, {
      headers: { 'content-type': 'application/json' },
    }).then(async (res) => {
      if (res.status === 200) {
        response = true;
      } else {
        response = false;
      }
    });

    return response;
  } catch (err) {
    return false;
  }
};
