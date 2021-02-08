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

export const exportarCadastros = (queryParams) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/exportar?${queryParams}`;
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

export const getDistritos = (queryParams) => {
  const url = `${endPonts.API_URL}/distritos/get_distritos_por_dre?${queryParams}`;
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

export const getSetores = (queryParams) => {
  const url = `${endPonts.API_URL}/setores/get_setores_por_distrito?${queryParams}`;
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

export const getEscola = (value) => {
  const url = `https://escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/${value}`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: {
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

export const updateStatus = (queryParams) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/update-status/?${queryParams}`;
  let status = 0;
  return fetch(url, {
    method: "PUT",
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

export const enviaComapre = (queryParams) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/envia-comapre/?${queryParams}`
  let status = 0;
  return fetch(url, {
    method: "POST",
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

export const finalizaAnalise = (queryParams) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/finaliza-analise/?${queryParams}`
  let status = 0;
  return fetch(url, {
    method: "POST",
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

export const agendaVistoria = (queryParams) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/agenda-vistoria/?${queryParams}`
  let status = 0;
  return fetch(url, {
    method: "POST",
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


export const enviaResultadoVistoria = (queryParams) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/resultado-vistoria/?${queryParams}`
  let status = 0;
  return fetch(url, {
    method: "POST",
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

export const setAnexo = async (payload) => {
  const url = `${endPonts.API_URL}/anexolog/`;
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

export const deleteAnexo = async (uuid) => {
  const url = `${endPonts.API_URL}/anexolog/${uuid}/`;
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

export const enviaRelatorio = (queryParams) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/relatorio-vistoria/?${queryParams}`
  let status = 0;
  return fetch(url, {
    method: "POST",
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

export const enviaLaudo = (queryParams) => {
  const url = `${endPonts.API_URL}/cadastro-imovel/imoveis/laudo-locaticio/?${queryParams}`
  let status = 0;
  return fetch(url, {
    method: "POST",
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
