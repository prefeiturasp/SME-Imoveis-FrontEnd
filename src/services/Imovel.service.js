import endPont from "../constants/endPonts.constants";
const authHeader = {
  "Content-Type": "application/json"
};

class ImovelClass {
  create(values) {
    return fetch(`${endPont.API_URL}/${endPont.IMOVEIS}/`, {
      method: "POST",
      headers: authHeader,
      body: values,
      mode: "no-cors"
    })
      .then(response => {
        let json = response.json();
        json.status = response.status;
        return json;
      })
      .catch(erro => {
        console.log(`Create Imovel Error: ${erro}`);
      });
  }
}

export const Imovel = new ImovelClass();
