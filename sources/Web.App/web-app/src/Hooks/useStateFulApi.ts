import React from 'react';
import { StatelessApi, StateLessApiOptions } from 'src/Lib/Api/StatelessApi';

export const useStatefulApi = <T>(api: StatelessApi<T>) => {
  const [data, setData] = React.useState<T | null>(null);

  const get = React.useCallback(
    async (options?: Partial<StateLessApiOptions>) => {
      const response = await api?.get(options);

      setData(response);
    },
    [api]
  );

  React.useEffect(() => {
    const onLoad = async () => {
      await get();
    };

    onLoad();
    // eslint-disable-next-line
  }, [api]);

  return {
    data,
    get,
  };
};
