import { Validatable } from './types';

// validation
export function validate(validatorConfig: Validatable): [boolean, string] {
  let isValid = true;
  let mess = "";
  const { value, name, required, max, maxLength, min, minLength } =
    validatorConfig;
  if (required) {
    isValid = isValid && value.toString().trim().length > 0;
    if (!isValid) {
      mess = `The ${name} field is required`;
      return [isValid, mess];
    }
  }
  if (maxLength && typeof value === "string") {
    isValid = isValid && value.length < maxLength;
    if (!isValid) {
      mess = `The ${name} field is longer than required`;
      return [isValid, mess];
    }
  }
  if (minLength && typeof value === "string") {
    isValid = isValid && value.length > minLength;
    if (!isValid) {
      mess = `The ${name} field is shorter than required`;
      return [isValid, mess];
    }
  }
  if (max && typeof value === "number") {
    isValid = isValid && value < max;
    if (!isValid) {
      mess = `The ${name} field is larger than required`;
      return [isValid, mess];
    }
  }
  if (min && typeof value === "number") {
    isValid = isValid && +value > min;
    if (!isValid) {
      mess = `The ${name} field is smaller than required`;
      return [isValid, mess];
    }
  }
  return [isValid, mess];
}

