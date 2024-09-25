import { TValue } from 'src/customTypes';

export const passwordValidation = (value: TValue): boolean => (value as string).length > 8;
export const emailValidation = (value: TValue) => {
  let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  return emailRegex.test(value as string);
};
