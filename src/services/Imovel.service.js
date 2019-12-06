import endPont from "../constants/endPonts.constants";
const authHeader = {
  "Content-Type": "application/json"
};

function handleErrors(response) {
  if (!response.ok) {
    throw response;
  }
  return response;
}

class ImovelClass {
  create(values) {
    let status = 0;
    return fetch(`${endPont.API_URL}/${endPont.IMOVEIS}/`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify(values)
    })
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(data => {
        return { data: data, status: status };
      })
      .catch(error => {
        return error.json();
      });
  }
}

export const Imovel = new ImovelClass();
