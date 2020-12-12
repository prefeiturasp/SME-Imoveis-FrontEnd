export const formataPaylaodBuscaUsuarios = (values) => {
  let stringParams = "?";
  if (values.secretaria) {
    stringParams += `secretaria=${values.secretaria}&`;
  }
  if (values.dre) {
    stringParams += `dre=${values.dre}&`;
  }
  if (values.nome) {
    stringParams += `nome=${values.nome}&`;
  }
  if (values.perfil) {
    stringParams += `perfil=${values.perfil}&`;
  }
  return stringParams.slice(0, -1);
};
