import React from 'react';
import { isEqual, keysIn } from 'lodash';
import { useReducerStore } from './useReducerStore';
import { PartialFormEntryUpdate } from 'src/_lib/_types/customTypes';

export const useFormModel = <TFormModel>(
  initialModel: TFormModel,
  validate: boolean,
  saveCallback: (model: TFormModel) => Promise<void> | void
) => {
  const { model, updateState } = useReducerStore<TFormModel>(initialModel);

  const [isModified, setIsModified] = React.useState<boolean>(false);
  const handleChange = React.useCallback(
    (update: PartialFormEntryUpdate) => {
      const item = model[update.key as keyof TFormModel] as unknown as any;

      item.value = update.value;

      if (validate) {
        item.isValid = update.isValid;
        item.error = update.error;
      }

      updateState({ ...model, [update.key]: item } as Partial<TFormModel>);
    },
    [updateState]
  );

  const resetForm = React.useCallback(() => {
    updateState(initialModel);
    setIsModified(false);
  }, [initialModel, updateState, setIsModified]);

  const isValid = React.useMemo(() => {
    if (!validate) {
      return true;
    }

    const hasErrors = keysIn(model).some((key) => {
      const item = model[key as keyof TFormModel] as any;

      return item?.error?.length > 0;
    });

    return !hasErrors;
  }, [validate, model]);

  const formErrors = React.useMemo((): string[] => {
    if (!validate) {
      return [];
    }

    const errors = keysIn(model).map((key) => {
      const item = model[key as keyof TFormModel] as any;

      if (item?.error?.length > 0) return item?.error as string;

      return null;
    });

    return errors.filter((x) => x != null);
  }, [validate, model]);

  React.useEffect(() => {
    const originalValues = keysIn(initialModel).map((key) => {
      return (initialModel[key as keyof TFormModel] as unknown as any)?.value;
    });

    const modifiedValues = keysIn(model).map((key) => {
      return (model[key as keyof TFormModel] as unknown as any)?.value;
    });

    console.log(modifiedValues);
    if (!isEqual(originalValues, modifiedValues)) {
      console.log('is modified...');
      setIsModified(true);
    } else {
      console.log('is not modified');
      setIsModified(false);
    }
  }, [model, initialModel]);

  return {
    formModel: model,
    canSave: isValid,
    isModified: isModified,
    errors: formErrors,
    resetForm: resetForm,
    handleChange: handleChange,
  };
};
