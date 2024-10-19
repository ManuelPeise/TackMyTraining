export type ApiRequestOptions = {
  serviceUrl: string;
  parameters?: { [key: string]: any } | null;
  body?: string;
};

export type ApiResult<T> = {
  result: T;
  isLoading: boolean;
  error: string | null;
  get: (forceRequest?: boolean, options?: ApiRequestOptions) => Promise<void>;
  post: <TModel>(options: ApiRequestOptions, data?: any) => Promise<TModel | null>;
};

export type StatelessApiResult<T> = {
  options: ApiRequestOptions;
  get: (options: ApiRequestOptions, jwt: string) => Promise<T>;
  post: (options: ApiRequestOptions, jwt: string) => Promise<boolean>;
};
