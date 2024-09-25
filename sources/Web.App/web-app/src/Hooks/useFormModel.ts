import React from 'react';
import { Partial } from 'src/customTypes';
import { FormEntry, FormEntryDictionary, FormEntrySettings, FormModelReturnType } from 'src/form';
import { getSinglePropertySetter, formReducer, differsFromPrev } from 'src/Lib/utils';

type FormValidation<TValue> = {
  value: TValue;
  cb: (value: TValue) => boolean;
};

export const useFormModel = <TModel, TValue>(
  initialState: TModel,
  settings: FormEntrySettings<TModel>[]
): FormModelReturnType<TModel, TValue> => {
  const originalStateRef = React.useRef(initialState);

  const [state, dispatch] = React.useReducer<React.Reducer<TModel, Partial<TModel>>>(
    (prevState: TModel, update: Partial<TModel> | ((prev: TModel) => Partial<TModel>)) =>
      formReducer(prevState, update),
    initialState
  );

  const formMembers = React.useMemo((): FormEntryDictionary<TModel, TValue> => {
    const members = {} as FormEntryDictionary<TModel, TValue>;
    if (originalStateRef.current == null) {
      throw new Error('Original state ref could not be null!');
    }

    settings.forEach((setting) => {
      if (!members[setting.key]) {
        const validationCallBack = setting.validationCallback === undefined ? undefined : setting.validationCallback;

        members[setting.key] = {
          property: setting.key,
          value: state[setting.key],
          dataType: setting.type,
          required: setting.required,
          updateFunction: getSinglePropertySetter(setting.key, dispatch),
          validationFunction: validationCallBack,
        } as FormEntry<TModel, TValue>;
      }
    });

    return members;
  }, [state, settings]);

  const formIsValid = React.useMemo(() => {
    const keys = Object.keys(formMembers) as Array<keyof TModel>;

    const validationCallbacks: FormValidation<TValue>[] = [];

    keys.forEach((key) => {
      if (formMembers[key].validationFunction !== undefined) {
        validationCallbacks.push({
          value: formMembers[key].value,
          cb: formMembers[key].validationFunction,
        });
      }
    });

    if (!validationCallbacks.length) {
      return true;
    }

    const validationResult = validationCallbacks.map((entry) => {
      return entry.cb(entry.value);
    });

    return validationResult.every((value) => value);
  }, [formMembers]);

  const isModified = React.useMemo(() => {
    const keys = Object.keys(state) as Array<keyof TModel>;

    const modified = keys.map((key) => {
      if (differsFromPrev(state[key], initialState[key])) {
        return true;
      }
      return false;
    });

    return modified.some((x) => x);
  }, [state, initialState]);

  const resetForm = React.useCallback(() => {
    dispatch(originalStateRef.current);
  }, [originalStateRef, dispatch]);

  return {
    state: state,
    formMembers: formMembers,
    formIsValid: formIsValid,
    isModified: isModified,
    resetForm: resetForm,
  };
};
