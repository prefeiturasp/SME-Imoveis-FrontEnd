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
    return fetch(`${endPont.API_URL}/${endPont.IMOVEIS}/`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify(values)
    })
      .then(handleErrors)
      .then(res => {
        let data = res.json();
        data["status"] = res.status;
        return data;
      })
      .catch(err => {
        if (false === err instanceof Error && err.type) {
          switch (err.type) {
            case "cors":
              return err.json().then(errorMessage => {
                throw errorMessage;
              });
            case "unparsable":
              throw err.body;
            default:
              throw err;
          }
        }
        throw err.toString();
      });
  }
}

export const Imovel = new ImovelClass();
