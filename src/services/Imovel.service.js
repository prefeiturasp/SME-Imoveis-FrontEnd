import api from "./_base";

export const cadastrarImovel = async payload => {
  return await api.post("cadastro-imovel/", payload);
};
