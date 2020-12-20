import api from "./_base";

export const cadastrarImovel = async (payload) => {
  return await api.post("cadastro-imovel/", payload);
};

export const getImovel = async (uuid) => {
  return await api.get(`cadastro-imovel/${uuid}/`);
};
