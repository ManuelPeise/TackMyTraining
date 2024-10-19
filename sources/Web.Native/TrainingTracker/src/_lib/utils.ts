import { isEqual } from 'lodash';
import { UserAuthenticationData } from 'src/Types/User/types';

export type Partial<TState> = {
  [P in keyof TState]?: TState[P];
};

export const utils = {
  reducers: {
    authenticationReducer: (
      initialState: UserAuthenticationData | null,
      stateUpdate: UserAuthenticationData | ((prevState: UserAuthenticationData) => UserAuthenticationData)
    ): UserAuthenticationData => {
      const newState: UserAuthenticationData =
        typeof stateUpdate === 'function' ? stateUpdate(initialState) : stateUpdate;

      if (newState == null) {
        return null;
      }

      let isChangedState = false;

      if (initialState == null) {
        isChangedState = newState != null;
      } else {
        const objectKeys = Object.keys(newState) as Array<keyof UserAuthenticationData>;
        isChangedState = objectKeys.some((key) => isEqual(initialState[key], newState[key]));
      }

      if (isChangedState) {
        return { ...initialState, ...newState };
      }

      return initialState;
    },
    genericReducer: <T>(initialState: T | null, stateUpdate: Partial<T>): T => {
      const newState: Partial<T> = stateUpdate;

      if (newState == null) {
        return null;
      }

      let isChangedState = false;

      if (initialState == null) {
        isChangedState = newState != null;
      } else {
        const objectKeys = Object.keys(newState) as Array<keyof T>;
        isChangedState = objectKeys.some((key) => isEqual(initialState[key], newState[key]));
      }

      if (isChangedState) {
        return { ...initialState, ...newState };
      }

      return initialState;
    },
  },
};
