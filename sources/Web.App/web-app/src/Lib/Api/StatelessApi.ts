import { AxiosClient } from './AxiosClient';

export type StateLessApiOptions = {
  serviceUrl: string;
  parameters?: { [key: string]: string };
};

export class StatelessApiService {
  public static create<T>(options: StateLessApiOptions, token: string): StatelessApi<T> {
    return new StatelessApi<T>(options, token);
  }
}

export class StatelessApi<T> {
  private _options: StateLessApiOptions;
  private _error: string = '';
  private _token: string;

  constructor(options: StateLessApiOptions, token: string) {
    this._options = options;
    this._token = token;
  }

  private getServiceUrl = (options: StateLessApiOptions): string => {
    let serviceUrl = options.serviceUrl;
    if (!options.parameters) {
      return serviceUrl;
    }

    const params = options.parameters;

    Object.keys(params).forEach((key, index) => {
      if (index === 0) {
        serviceUrl = `${serviceUrl}?${key}=${params[key]}`;
      } else {
        serviceUrl = `${serviceUrl}&${key}=${params[key]}`;
      }
    });

    return serviceUrl;
  };

  public error: string = this._error;

  public get = async (): Promise<T> => {
    let response: T | null = null;
    try {
      AxiosClient.defaults.headers.common['Authorization'] = `bearer ${this._token}`;
      await AxiosClient.get(this.getServiceUrl(this._options)).then(async (res) => {
        if (res.status === 200) {
          response = await JSON.parse(JSON.stringify(res.data));
        } else {
          throw new Error(`Request failed with: ${res.statusText}`);
        }
      });
    } catch (err) {
      this._error = err.message;
    }

    return response;
  };

  public post = async <TData>(options: StateLessApiOptions, data: any): Promise<TData> => {
    let response: TData | null = null;
    try {
      AxiosClient.defaults.headers.common['Authorization'] = `bearer ${this._token}`;
      await AxiosClient.post(options.serviceUrl, data, {
        headers: { 'content-type': 'application/json' },
      }).then(async (res) => {
        if (res.status === 200) {
          response = await JSON.parse(JSON.stringify(res.data));
        } else {
          throw new Error(`Request failed with: ${res.statusText}`);
        }
      });
    } catch (err) {
      this._error = err.message;
    }
    return response;
  };
}
