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
  