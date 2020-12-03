export const required = (value) =>
  value !== undefined ? undefined : "Campo obrigatório";

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Email inválido"
    : undefined;

export const prefeituraEmail = (value) =>
  value && /.+@\prefeitura.sp.gov.br/.test(value)
    ? undefined
    : "Somente emails da prefeitura de São Paulo";

export const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export const numericInteger = (value) =>
  value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;
export const numerosEPontos = (value) =>
  value && /[^0-9.]/i.test(value) ? "Somente números" : undefined;

export const phoneNumber = (value) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

export const minLength = (min) => (value) =>
  value && value.length < min
    ? `Deve ter ao menos ${min} caracteres(s)`
    : undefined;

export const telValidate = (value) => {
  if (value) {
    const cleanedValue = value.replace(/[^a-z0-9]/gi, "").replace(/\D/g, "");
    if (cleanedValue.length < 10 || cleanedValue.length > 11)
      return "Telefone inválido";
    return undefined;
  }
  return undefined;
};

export const celValidate = (value) => {
  if (value) {
    const cleanedValue = value.replace(/[^a-z0-9]/gi, "").replace(/\D/g, "");
    if (cleanedValue.length !== 11) return "Celular inválido";
    return undefined;
  }
  return undefined;
};

export const nameValidate = (value) =>
  value && !/^[a-zA-Z]+. +[a-zA-Z]/.test(value) ? "Nome inválido" : undefined;

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const cpfCnpjValidate = (value) => {
  if (value) {
    const cleanedValue = value.replace(/[^a-z0-9]/gi, "").replace(/\D/g, "");
    console.log(cleanedValue);
    if (cleanedValue.length === 11) return cpfValidate(cleanedValue);
    else if (cleanedValue.length === 14) return cnpjValidate(cleanedValue);
    else return "O CPF/CNPJ é um número inválido";
  }
  return undefined;
};

export const cpfValidate = (value) => {
  if (!value) return undefined;

  let soma;
  let resto;
  soma = 0;

  if (value === "00000000000") return "CPF inválido";

  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(value.substring(9, 10))) return "CPF inválido";

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== parseInt(value.substring(10, 11))) return "CPF inválido";
  return undefined;
};

export const cnpjValidate = (value) => {
  let cnpj = value.replace(/[^\d]+/g, "");
  if (cnpj === "") return "CNPJ inválido";

  if (cnpj.length !== 14) return "CNPJ inválido";

  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  )
    return "CNPJ inválido";

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return "CNPJ inválido";
  console.log("chegou aqui");

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return "CNPJ inválido";

  return undefined;
};

export const validaCEP = (value) => {
  let numero = value.replace("-", "").replace(/_/g, "");
  return numero.length === 8 ? undefined : "Necessário CEP válido!";
};

export const requiredMultiselect = (value) => {
  if (Array.isArray(value)) {
    if (!value.length) return "Campo obrigatório";
  } else {
    return "Campo obrigatório";
  }
  return undefined;
};

export const iptuLength = (value) => {
  return value && value.length === 14
    ? undefined
    : "Necessário IPTU na seguinte máscara: 000.000.0000.0";
};

export const iptuExisteValidator = (iptu_existe) => (value) => {
  console.log(iptu_existe)
  return iptu_existe ? `Número de IPTU já está cadastrado` : undefined;
};
