import { isEqual } from 'lodash';
import React from 'react';

const store = <TModel>(initState: TModel, update: Partial<TModel> | ((model: Partial<TModel>) => Partial<TModel>)) => {
  const newState = typeof update === 'function' ? update(initState) : update;

  if (initState == null) {
    return null;
  }

  let stateIsChanged = false;

  if (newState != null) {
    stateIsChanged = newState != null;
  }

  const keys = Object.keys(newState) as Array<keyof TModel>;

  stateIsChanged = keys.some((key) => {
    return !isEqual(newState[key], initState[key]);
  });

  if (stateIsChanged) {
    return { initState, ...newState };
  }

  return newState;
};

export const useReducerStore = <TModel>(initialState: TModel | Partial<TModel>) => {
  const originalState = React.useRef(initialState);

  const [model, update] = React.useReducer<React.Reducer<Partial<TModel>, Partial<TModel>>>(
    (initialState: TModel, update: Partial<TModel> | ((model: Partial<TModel>) => Partial<TModel>)) =>
      store(initialState, update),
    initialState
  );

  const updateState = React.useCallback(
    (state: Partial<TModel>) => {
      update(state);
    },
    [update]
  );

  const resetState = React.useCallback(() => {
    update(originalState.current);
  }, [originalState, update]);

  return {
    model,
    originalModel: originalState.current as Partial<TModel>,
    updateState,
    resetState,
  };
};
