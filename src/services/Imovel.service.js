import endPontsConstants from "constants/endPonts.constants";
import { getToken } from "./auth.service";
import api from "./_base";

export const cadastrarImovel = async (payload) => {
  return await api.post("cadastro-imovel/", payload);
};

export const updateImovel = async (id, payload) => {
  const url = `${endPontsConstants.API_URL}/cadastro-imovel/${id}/`;
  let status = 0;
  return fetch(url, {
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(payload),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};


export const getImovel = async (uuid) => {
  return await api.get(`cadastro-imovel/${uuid}/`);
};

export const getImovelByProtocolo = async (uuid, criado_em) => {
  return await api.get(`cadastro-imovel/imoveis/get-by-protocolo/?imovel=${uuid}&criado_em=${criado_em}`);
};
