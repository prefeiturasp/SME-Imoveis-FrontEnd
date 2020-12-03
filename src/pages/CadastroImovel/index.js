/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./styles.scss";
import Wizard from "./Wizard";
import BaseHome from "components/BaseHome";
import Proponente from "./components/Proponente";
import Imovel from "./components/Imovel";
import Anexos from "./components/Anexos";
import { tamanhoMaximoAnexos } from "helpers/utils";
import { checaEnderecoImovel, checaNumeroIPTU } from "services/step2.service";

const CadastroImovel = () => {
  const onSubmit = async () => {};

  const validateAnexos = (values) => {
    const errors = {};
    const anexos = [];

    if (values.anexos_fachada && values.anexos_fachada.length) {
      values.anexos_fachada.forEach((anexo) => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_fachada = "Campo obrigatório";
    }

    if (
      values.anexos_ambiente_interno &&
      values.anexos_ambiente_interno.length
    ) {
      values.anexos_ambiente_interno.forEach((anexo) => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_ambiente_interno = "Campo obrigatório";
    }

    if (values.anexos_area_externa && values.anexos_area_externa.length) {
      values.anexos_area_externa.forEach((anexo) => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_area_externa = "Campo obrigatório";
    }

    if (values.anexos_iptu && values.anexos_iptu.length) {
      values.anexos_iptu.forEach((anexo) => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_iptu = "Campo obrigatório";
    }

    if (values.anexos_planta && values.anexos_planta.length) {
      values.anexos_planta.forEach((anexo) => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_planta = "Campo obrigatório";
    }

    if (anexos.length) {
      if (tamanhoMaximoAnexos(anexos, 15728640)) {
        errors.limiteTamanhoError = "Você ultrapassou o limite de 15MB.";
      }
    }
    return errors;
  };

  const validateImovel = async (values) => {
    const errors = {};

    if (!values.nao_possui_iptu) {
      if (!values.iptu) {
        errors.iptu = "Campo obrigatório";
      } else if (values.iptu && values.iptu.length !== 14) {
        errors.iptu = "IPTU precisa estar na seguinte máscara: 000.000.0000.0";
      } else {
        const response = await checaNumeroIPTU(values.iptu);
        if (response.data.iptu_existe)
          errors.iptu = "Este IPTU já está cadastrado";
        else if (!response.data.iptu_valido) {
          errors.iptu = "Número de IPTU inválido";
        }
      }
    }

    if (values.cep && values.numero && values.endereco && values.bairro) {
      const response = await checaEnderecoImovel(values);
      if (response.data.endereco_existe) {
        errors.numero = "Este imóvel já possui cadastro em nossa base de dados";
      }
    }

    return errors;
  };

  return (
    <BaseHome>
      <div className="container">
        <Wizard onSubmit={onSubmit}>
          <Wizard.Page>
            <Proponente />
          </Wizard.Page>

          <Wizard.Page validate={validateImovel}>
            <Imovel />
          </Wizard.Page>

          <Wizard.Page validate={validateAnexos}>
            <Anexos />
          </Wizard.Page>
        </Wizard>
      </div>
    </BaseHome>
  );
};

export default CadastroImovel;
