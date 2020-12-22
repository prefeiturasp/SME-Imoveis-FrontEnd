import endPonts from "../constants/endPonts.constants";
import { getToken } from "./auth.service";

export const getCadastros = (queryParams, pagina=1) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/?page=${pagina}${queryParams}`;
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

export const getDres = () => {
  const url = `${endPonts.API_URL}/dres/`;
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

export const getDistritos = () => {
  const url = `${endPonts.API_URL}/distritos/`;
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

export const getSetores = () => {
  const url = `${endPonts.API_URL}/setores/`;
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
