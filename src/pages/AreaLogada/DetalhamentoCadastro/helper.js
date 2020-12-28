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
