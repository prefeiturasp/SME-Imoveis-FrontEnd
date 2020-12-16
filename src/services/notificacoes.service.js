import endPonts from "../constants/endPonts.constants";
import { getToken } from "./auth.service";

export const getUltimos30dias = () => {
    const url = `${endPonts.API_URL}/cadastro-imovel/ultimos-30-dias/`;
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