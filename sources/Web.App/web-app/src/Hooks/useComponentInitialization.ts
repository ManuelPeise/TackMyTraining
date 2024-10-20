import React from 'react';
import { InitializationProps } from 'src/customTypes';

export const useComponentInitialization = <T>(initialCallback: () => Promise<T>): InitializationProps<T> => {
  const callbackRef = React.useRef(initialCallback);

  const [componentState, setComponentState] = React.useState<T | null>();

  const initializeAsync = React.useCallback(async () => {
    const result = await callbackRef.current();

    setComponentState(result);
  }, [callbackRef]);

  React.useEffect(() => {
    const callback = async () => {
      initializeAsync();
    };
    if (callbackRef.current) {
      callback();
    }
  }, [initializeAsync]);

  return {
    isInitialized: componentState != null,
    props: componentState,
  };
};
