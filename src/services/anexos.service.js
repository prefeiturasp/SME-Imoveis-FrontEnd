import endPonts from "../constants/endPonts.constants";
import { getToken } from "./auth.service";

export const deleteAnexo = async (uuid) => {
  const url = `${endPonts.API_URL}/plantafoto/${uuid}/`;
  let status = 0;
  return fetch(url, {
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((response) => {
      status = response.status;
      return response.text();
    })
    .then((data) => {
      return Promise.resolve(data ? JSON.parse(data) : { status: status });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const setAnexo = async (payload) => {
  const url = `${endPonts.API_URL}/plantafoto/`;
  let status = 0;
  return fetch(url, {
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
    method: "POST",
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
