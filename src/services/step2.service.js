import endPonts from "../constants/endPonts.constants";

export const checaNumeroIPTU = (numero_iptu) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/checa-iptu-ja-existe/${numero_iptu}/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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

export const checaEnderecoImovel = (payload) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/checa-endereco-imovel-ja-existe/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
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

export const georef = (value) => {
  const url = `https://georef.sme.prefeitura.sp.gov.br/v1/search?text=${value}&layers=address&boundary.gid=whosonfirst:locality:101965533`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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

export const getSetor = (latitude, longitude) => {
  const url = `https://escolaaberta.sme.prefeitura.sp.gov.br/api/localizador?lat=${latitude}&lon=${longitude}&radius=100`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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