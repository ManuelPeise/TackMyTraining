export const isValidPassword = (value: string): boolean => (value as string).length > 8;

export const isValidEmail = (value: string): boolean => {
  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  return emailRegex.test(value as string);
};

export const numberValidation = (value: string): boolean => {
  const numberRegex = new RegExp(/([1-9]d{0,5})(,{0,1})([0-9]d{0,2})/);
  const isValid = numberRegex.test(value as string);

  return isValid;
};

export const customValidationCallbacks = {
  isNumber: numberValidation,
  isEmail: isValidEmail,
  isValidNumber: (value: string, min: number, max: number) => {
    return value.length >= max && value.length <= min;
  },
  isValidStringLength: (value: string, minLength: number) => {
    return value.length >= minLength;
  },
};
