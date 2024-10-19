import React from 'react';
import { IFormItem } from 'src/Lib/Interfaces/IFormItem';
import { IFormState } from 'src/Lib/Interfaces/IFormState';
import { FormInputProps } from 'src/types';

export interface IForm<T> {
  items: { [key: string]: FormInputProps<T> };
  handleChange: (key: string, value: string | number | null) => void;
  getUpdatedModel: () => {};
  subScribeFormState: () => { isModified: boolean; canSave: boolean };
  handleResetForm: () => void;
}

type Update<T> = {
  type: 'update';
  key: string;
  payload: IFormState<T>;
};

type Initialize<T> = {
  type: 'initialize';
  payload: IFormState<T>;
};

type FormAction<T> = Update<T> | Initialize<T>;

const initialize = <T>(formItems: IFormItem<T>[], originalState: T): IFormState<T> => {
  const formDict: { [key: string]: FormInputProps<T> } = {};

  formItems.forEach((item) => {
    if (formDict[item.propertyName as string] === undefined) {
      formDict[item.propertyName as string] = {
        key: item.propertyName,
        value: item.value,
        type: item.dataType,
        label: item.label,
        validationCallback: item.validationCallback,
      };
    }
  });
  return {
    originalState: originalState,
    formProps: formDict,
  };
};

const getOriginalState = <T>(formItems: IFormItem<T>[]): T => {
  const obj = {};

  Object.keys(formItems).forEach((key) => {
    Object.defineProperty(obj, formItems[parseInt(key)].propertyName, {
      value: formItems[parseInt(key)].value,
      writable: false,
    });
  });

  return obj as T;
};

const createTestReducer =
  <T>() =>
  (state: IFormState<T> = {} as IFormState<T>, action: FormAction<T>) => {
    switch (action.type) {
      case 'initialize': {
        return action.payload;
      }
      case 'update':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };

export const useForm = <T extends {}>(formItems: IFormItem<T>[]): IForm<T> => {
  const [state, dispatch] = React.useReducer(
    createTestReducer<T>(),
    initialize(formItems, getOriginalState(formItems))
  );

  const handleOnChange = React.useCallback(
    (key: string, value: string | number | null) => {
      const items = state.formProps;
      items[key].value = value;

      dispatch({ type: 'update', key: key, payload: { ...state, formProps: items } });
    },
    [state, dispatch]
  );

  const getUpdatedModel = React.useCallback((): T => {
    const map = new Map();

    Object.keys(state.formProps).forEach((key) => {
      map.set(key, state.formProps[key].value);
    });

    const objFromMap: T = Object.fromEntries(map);
    const json = JSON.stringify(objFromMap);

    return JSON.parse(json);
  }, [state]);

  const getOriginalModel = React.useCallback((): T => {
    const map = new Map();

    Object.keys(state.formProps).forEach((key) => {
      const item = formItems.find((x) => x.propertyName === key);
      map.set(key, item?.value);
    });

    const objFromMap: T = Object.fromEntries(map);

    const json = JSON.stringify(objFromMap);

    return JSON.parse(json);
  }, [formItems, state.formProps]);

  const isModified = React.useMemo((): boolean => {
    const originalModel = getOriginalModel();
    const updatedModel = getUpdatedModel();
    let modified = false;

    if (Object.keys(originalModel).length === Object.keys(updatedModel).length) {
      Object.keys(originalModel).forEach((key) => {
        if (Object.create(originalModel)[key] !== Object.create(updatedModel)[key]) {
          modified = true;
        }
      });
    }
    return modified;
  }, [getOriginalModel, getUpdatedModel]);

  const canSave = React.useMemo((): boolean => {
    const map = new Map<string, (value: string | number | null) => boolean>();
    const updatedModel = getUpdatedModel();

    let canSave = false;

    Object.keys(updatedModel).forEach((key) => {
      const formProps = formItems.find((x) => x.propertyName === key) ?? null;

      if (formProps != null && formProps.validationCallback !== undefined) {
        map.set(key, formProps.validationCallback);
      }
    });

    if (map.size === 0) {
      return true;
    }

    Object.keys(updatedModel).forEach((key) => {
      if (map.has(key)) {
        const callBack = map.get(key);

        canSave = (callBack && callBack(state.formProps[key].value)) ?? false;
      }
    });

    return canSave;
  }, [formItems, state, getUpdatedModel]);

  const subScribeFormState = React.useCallback((): { isModified: boolean; canSave: boolean } => {
    return {
      isModified: isModified,
      canSave: canSave,
    };
  }, [isModified, canSave]);

  const handleResetForm = React.useCallback(() => {
    dispatch({ type: 'initialize', payload: initialize(formItems, getOriginalState(formItems)) });
  }, [formItems, dispatch]);

  return {
    items: state.formProps,
    handleChange: handleOnChange,
    getUpdatedModel,
    subScribeFormState,
    handleResetForm,
  };
};
