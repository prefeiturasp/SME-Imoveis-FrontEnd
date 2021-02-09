import { checaNumeroIPTU } from "services/step2.service";

export const formataValues = (values) => {
  delete values.logs;
  delete values.anexos;
  if (!values.latitude) {
    values.latitude = -23.5489;
  }
  if (!values.longitude) {
    values.longitude = -46.6388;
  }
  if (!values.setor) values.setor = {};
  if (!values.demandaimovel) values.demandaimovel = {};
  return values;
};

export const validateImovel = async (values) => {
  const errors = {};

  if (!values.nao_possui_iptu) {
    if (!values.numero_iptu) {
      errors.numero_iptu = "Campo obrigatório";
    } else if (values.iptu && values.numero_iptu.length !== 14) {
      errors.numero_iptu =
        "IPTU precisa estar na seguinte máscara: 000.000.0000.0";
    } else {
      const response = await checaNumeroIPTU(values.numero_iptu);
      if (!response.data.iptu_valido) {
        errors.numero_iptu = "Número de IPTU inválido";
      }
    }
  }

  return errors;
};

export const formataPaylaodAtualizaCadastro = (values) => {
  let stringParams = "&";
  if (values.id) {
    stringParams += `id=${values.id}&`;
  }
  if (values.situacao) {
    stringParams += `situacao=${values.situacao}&`;
  }
  if (values.codigo_eol) {
    stringParams += `codigo_eol=${values.codigo_eol}&`;
  }
  if (values.escola) {
    stringParams += `escola=${values.escola}&`;
  }
  return stringParams.slice(0, -1);
};

export const formataPaylaodEnviarComapre = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  if (values.observacoes_comapre !== undefined && values.observacoes_comapre !== "") {
    stringParams += `justificativa=${values.observacoes_comapre}&`;
  }
  stringParams += `data_agendada=${values.data_envio_comapre}&`;
  stringParams += `enviar_email=${values.enviar_email}&`;
  return stringParams.slice(0, -1);
};

export const formataPaylaodFinalizaAnalise = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  if (values.observacoes_analise !== undefined && values.observacoes_analise !== "") {
    stringParams += `justificativa=${values.observacoes_analise}&`;
  }
  if (values.resultado_da_analise === 0) {
    stringParams += `resultado_da_analise=${values.resultado_da_analise}&`;
  }
  if (values.resultado_da_analise === 1) {
    stringParams += `resultado_da_analise=${values.resultado_da_analise}&`;
  }
  if (values.resultado_da_analise === 2) {
    stringParams += `resultado_da_analise=${values.resultado_da_analise}&`;
  }
  stringParams += `enviar_email=${values.enviar_email}&`;
  return stringParams.slice(0, -1);
};

export const formataPaylaodAgendarVistoria = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  stringParams += `data_agendada=${values.data_vistoria}&`;
  stringParams += `enviar_email=${values.enviar_email}&`;
  return stringParams.slice(0, -1);
};

export const formataPaylaodEnviaRelatorio = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  return stringParams.slice(0, -1);
};

export const formataPaylaodEnviaLaudo = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  return stringParams.slice(0, -1);
};

export const formataPaylaodResultadoVistoria = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  if (values.resultado_vistoria === 0) {
    stringParams += `resultado_da_vistoria=${values.resultado_vistoria}&`;
  }
  if (values.resultado_vistoria === 1) {
    stringParams += `resultado_da_vistoria=${values.resultado_vistoria}&`;
  }
  stringParams += `enviar_email=${values.enviar_email}&`;
  return stringParams.slice(0, -1);
};