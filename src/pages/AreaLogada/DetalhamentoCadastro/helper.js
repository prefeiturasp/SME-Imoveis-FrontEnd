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

export const formataPaylaodEnviarSolicitacaoVistoria = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  if (values.observacoes_solicitacao_vistoria !== undefined && values.observacoes_solicitacao_vistoria !== "") {
    stringParams += `justificativa=${values.observacoes_solicitacao_vistoria}&`;
  }
  stringParams += `data_agendada=${values.data_envio_solicitacao_vistoria}&`;
  stringParams += `enviar_email=${values.enviar_email}&`;
  return stringParams.slice(0, -1);
};

export const formataPaylaodEnviarSolicitacaoVistoriaEdicao = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  if (values.observacoes_solicitacao_vistoria !== undefined && values.observacoes_solicitacao_vistoria !== "") {
    stringParams += `justificativa=${values.observacoes_solicitacao_vistoria}&`;
  }
  stringParams += `edicao=ok&`
  return stringParams.slice(0, -1);
};

export const formataPaylaodFinaliza = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  if (values.observacoes_analise !== undefined && values.observacoes_analise !== "") {
    stringParams += `justificativa=${values.observacoes_analise}&`;
  }
  if (values.status_final === 0) {
    stringParams += `resultado=${values.status_final}&`;
  }
  if (values.status_final === 1) {
    stringParams += `resultado=${values.status_final}&`;
  }
  if (values.status_final === 2) {
    stringParams += `resultado=${values.status_final}&`;
  }
  if (values.status_final === 3) {
    stringParams += `resultado=${values.status_final}&`;
  }
  if (values.status_final === 4) {
    stringParams += `resultado=${values.status_final}&`;
  }
  stringParams += `enviar_email=${values.enviar_email}&`;
  return stringParams.slice(0, -1);
};

export const formataPayloadFinalizaEdicao = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;

  if (values.observacoes_solicitacao_vistoria !== undefined && values.observacoes_solicitacao_vistoria !== "") {
    stringParams += `justificativa_analise_previa=${values.observacoes_solicitacao_vistoria}&`;
  }

  if (values.observacoes_analise !== undefined && values.observacoes_analise !== "") {
    stringParams += `justificativa_finalizacao=${values.observacoes_analise}&`;
  }

  stringParams += `edicao=ok&`;

  return stringParams.slice(0, -1);
};

export const formataPaylaodAgendarVistoria = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  stringParams += `data_agendada=${values.data_vistoria}&`;
  stringParams += `enviar_email=${values.enviar_email}&`;
  return stringParams.slice(0, -1);
};

export const formataPaylaodAgendarVistoriaEdicao = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  stringParams += `data_agendada=${values.data_vistoria}&`;
  stringParams += `edicao=ok&`;
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

export const formataPaylaodEnviarDre = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  stringParams += `data_agendada=${values.data_envio_dre}&`;
  stringParams += `enviar_email=${values.enviar_email}&`;
  stringParams += `processo_sei=${values.numero_processo_sei}&`;
  stringParams += `nome_da_unidade=${values.nome_da_unidade}&`;
  return stringParams.slice(0, -1);
};


export const formataPaylaodEnviarDreEdicao = (values) => {
  let stringParams = "&";
  stringParams += `imovel=${values.id}&`;
  stringParams += `processo_sei=${values.numero_processo_sei}&`;
  stringParams += `nome_da_unidade=${values.nome_da_unidade}&`;
  stringParams += `edicao=ok&`;
  return stringParams.slice(0, -1);
};
