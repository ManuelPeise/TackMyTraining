export const isValidPassword = (value: string): boolean => (value as string).length > 8;

export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const exp = new RegExp(emailRegex);

  return exp.test(value as string);
};

export const isValidDate = (value: string): boolean => {
  const isDateRegex = /^\d{2}.?\d{2}.?\d{4}/;
  const exp = new RegExp(isDateRegex);

  return exp.test(value as string);
};

export const numberValidation = (value: string): boolean => {
  const isNumberRegex = /^\d{3}-?\d{3}-?\d{3}/;
  const exp = new RegExp(isNumberRegex);
  const isValid = exp.test(value as string);

  return isValid;
};

export const postalCodeValidation = (value: string): boolean => {
  const isPostalCode = /^\d{5}/;
  const exp = new RegExp(isPostalCode);
  const isValid = exp.test(value as string);

  console.log('postalCode is valid:', isValid);
  return isValid;
};

export const houseNumberValidation = (value: string) => {
  const isHouseNumber = /^\d+[A-Za-z\d]$/;
  const exp = new RegExp(isHouseNumber);
  const isValid = exp.test(value as string);
  console.log('houseNumber is valid:', isValid);
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

export const emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';
