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
    return new Promise((resolve, reject) => {
      const file = values.planta[0]
      const reader = new FileReader()
      reader.onload = () => {
        const data = {
          base64: reader.result.split('base64,')[1],
          filename: file.name,
          filesize: file.size,
          filetype: file.type
        }  
        values['planta'] = data; 
        
        fetch(`${endPont.API_URL}/${endPont.IMOVEIS}/`, {
          method: "POST",
          headers: authHeader,
          body: JSON.stringify(values)
        })
        .then(handleErrors)
        .then(res => {
          let data = res.json();
          data['status'] = res.status;
          return resolve(data);
        })
        .catch(error => {
          error.text().then( errorMessage => {
            return reject(errorMessage);
          })
        });
      };
      reader.readAsDataURL(values.planta[0] || "")
    })  
  }
}
export const Imovel = new ImovelClass();
