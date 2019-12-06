import { validarCNPJ, validarCPF } from "helpers/utils";

export const validarForm = values => {
  let erro = null;
  console.log(validarCNPJ(values.contato.cpf_cnpj))
  if (
    !validarCNPJ(values.contato.cpf_cnpj) &&
    !validarCPF(values.contato.cpf_cnpj)
  ) {
    erro = "CPF ou CNPJ do Proprietário inválido";
  }
  return erro;
};
