import endPonts from "../constants/endPonts.constants";
import { getToken } from "./auth.service";


export const getAnos = () => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/anos/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return console.log(error);
    });
};

export const filtrar = (params) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/filtrar-por-status/?${params}`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return console.log(error);
    });
};

export const exportar = (params) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/exportar-relatorio-por-status?${params}`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      status = res.status;
      return res.blob();
    })
    .then((blob) => {
      return { data: blob, status: status };
    })
    .catch((error) => {
      return console.log(error);
    });
};
