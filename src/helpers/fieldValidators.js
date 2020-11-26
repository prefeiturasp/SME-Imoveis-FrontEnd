export const required = value =>
  value !== undefined ? undefined : "Campo obrigatório";

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Email inválido"
    : undefined;

export const prefeituraEmail = value =>
  value && /.+@\prefeitura.sp.gov.br/.test(value)
    ? undefined
    : "Somente emails da prefeitura de São Paulo";

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export const numericInteger = value =>
  value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

export const minLength = min => value =>
  value && value.length < min
    ? `Deve ter ao menos ${min} caracteres(s)`
    : undefined;

export const telValidate = value => {
  if (value) {
    const cleanedValue = value.replace(/[^a-z0-9]/gi, "").replace(/\D/g, "");
    if (cleanedValue.length < 10 || cleanedValue.length > 11)
      return "Telefone inválido";
    return undefined;
  }
  return undefined;
};

export const celValidate = value => {
  if (value) {
    const cleanedValue = value.replace(/[^a-z0-9]/gi, "").replace(/\D/g, "");
    if (cleanedValue.length !== 11) return "Celular inválido";
    return undefined;
  }
  return undefined;
};

export const nameValidate = value =>
  value && !/^[a-zA-Z]+. +[a-zA-Z]/.test(value) ? "Nome inválido" : undefined;

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
