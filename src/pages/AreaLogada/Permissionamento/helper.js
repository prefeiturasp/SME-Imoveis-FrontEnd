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

export const formataUsuario = (usuario) => {
  if (usuario.secretaria) {
    usuario.secretaria_ = usuario.secretaria.id;
  }
  if (usuario.setor) {
    usuario.dre_ = usuario.setor.dre.id;
    usuario.setor_ = usuario.setor.codigo;
  }
  usuario.perfil_ = usuario.perfil ? usuario.perfil.id : "SEM PERMISSAO";
  return usuario;
};

export const formataPayloadUsuario = (values) => {
  if (values.setor_) {
    if (values.setor) {
      values.setor.codigo = values.setor_;
    } else values.setor = { codigo: values.setor_ };
  }
  return values;
};
