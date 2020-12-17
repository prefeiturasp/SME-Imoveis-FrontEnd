export const formataPaylaodBuscaCadastros = (values) => {
  let stringParams = "?";
  console.log(values)
  if (values.protocolo) {
    stringParams += `protocolo=${values.protocolo}&`;
  }
  if (values.endereco) {
    stringParams += `endereco=${values.endereco}&`;
  }
  if (values.area) {
    stringParams += `area=${values.area}&`;
  }
  if (values.dre) {
    stringParams += `dre=${values.dre}&`;
  }
  if (values.distrito) {
    stringParams += `distrito=${values.distrito}&`;
  }
  if (values.setor) {
    stringParams += `setor=${values.setor}&`;
  }
  if (values.status) {
    stringParams += `status=${values.status}&`;
  }
  if (values.demanda) {
    stringParams += `demanda=${values.demanda}&`;
  }
  if (values.data_inicio) {
    stringParams += `data_inicio=${values.data_inicio}&`;
  }
  if (values.data_fim) {
    stringParams += `data_fim=${values.data_fim}&`;
  }
  return stringParams.slice(0, -1);
};

