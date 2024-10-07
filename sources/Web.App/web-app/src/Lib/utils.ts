import { TValue } from 'src/customTypes';
const ObjectName = 'Object';

export const isNotEqualToPrev = (a: unknown, b: unknown): boolean => {
  if (a === b) {
    return false;
  }

  if (Array.isArray(a)) {
    if (Array.isArray(b) && a.length === 0 && b.length === 0) {
      return false;
    }
  } else if (a != null && a.constructor.name === ObjectName) {
    if (b != null && b.constructor.name === ObjectName && Object.keys(a).length === 0 && Object.keys(b).length === 0) {
      return false;
    }
  }

  return true;
};

export const getSinglePropertySetter = <TState>(key: keyof TState, setState: (state: Partial<TState>) => void) => {
  const updateFunction = (value: TState[typeof key]) => {
    const update = { [key]: value } as Partial<TState>;
    setState(update);
  };

  return updateFunction;
};

export const getSinglePropertyValidationCallback = <TState, T>(key: keyof TState, callback: (value: TValue) => T) => {
  const validationCallback = (value: TValue) => {
    return value === callback(value);
  };

  return validationCallback;
};

export const formReducer = <TState>(
  prevState: TState,
  stateUpdate: Partial<TState> | ((prevState: TState) => Partial<TState>)
): TState => {
  const newPartState: Partial<TState> = typeof stateUpdate === 'function' ? stateUpdate(prevState) : stateUpdate;

  if (newPartState == null) {
    return null;
  }

  let stateChanged = false;

  if (prevState == null) {
    stateChanged = newPartState != null;
  } else {
    const objectKeys = Object.keys(newPartState) as Array<keyof TState>;

    stateChanged = objectKeys.some((key) => {
      const isModified = isNotEqualToPrev;

      return isModified(prevState[key], newPartState[key]);
    });

    if (stateChanged) {
      return {
        ...prevState,
        ...newPartState,
      };
    }
  }
  return prevState;
};

export const getBmi = (height: number, weight: number) => {
  const calculationHeight = parseFloat(height.toString().replace(',', '.'));
  const calculationWeight = parseFloat(weight.toString().replace(',', '.'));

  return calculationWeight / (calculationHeight * calculationHeight);
};

export const toCaption = (value: string) => {
  return value.toUpperCase();
};

export const sortByKey = (a: unknown, b: unknown, type: 'string' | 'number') => {
  if (type === 'string') {
    return (a as string).localeCompare(b as string);
  }
  return a > b ? -1 : 1;
};
