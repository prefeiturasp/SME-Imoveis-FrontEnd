/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from "react";
import "./styles.scss";
import Wizard from "./Wizard";
import BaseHome from "components/BaseHome";
import Proponente from "./components/Proponente";
import Imovel from "./components/Imovel";
import Anexos from "./components/Anexos";
import { tamanhoMaximoAnexos } from "helpers/utils";
import { checaEnderecoImovel, checaNumeroIPTU } from "services/step2.service";
import { cadastrarImovel } from "services/Imovel.service";
import TelaFinal from "./components/TelaFinal";

const CadastroImovel = () => {
  const [showTelaFinal, setShowTelaFinal] = useState(false);
  const [dadosCadastro, setDadosCadastro] = useState({});

  const onSubmit = async (values, form) => {
    let payload = { ...values };
    let anexos = [];
    const contato = {};

    anexos.push.apply(anexos, payload.anexos_fachada);
    anexos.push.apply(anexos, payload.anexos_ambiente_interno);
    anexos.push.apply(anexos, payload.anexos_area_externa);
    anexos.push.apply(anexos, payload.anexos_iptu);
    anexos.push.apply(anexos, payload.anexos_planta);

    anexos = anexos.map(anexo => {
      return {
        arquivo: anexo.arquivo,
        tipo_documento: anexo.tipo_documento,
        tipo_arquivo: anexo.tipo_arquivo
      };
    });

    contato.nome = payload.proponente.nome;
    contato.cpf_cnpj = payload.proponente.cpf_cnpj;
    contato.email = payload.proponente.email;
    contato.telefone = payload.proponente.telefone;
    contato.celular = payload.proponente.celular;

    delete payload.anexos_fachada;
    delete payload.anexos_ambiente_interno;
    delete payload.anexos_area_externa;
    delete payload.anexos_iptu;
    delete payload.anexos_planta;

    payload = { ...payload, anexos, contato };

    const res = await cadastrarImovel(payload);
    setTimeout(() => form.restart());
    setDadosCadastro(res.data);
    setShowTelaFinal(true);
  };

  const validateAnexos = values => {
    const errors = {};
    const anexos = [];

    if (values.anexos_fachada && values.anexos_fachada.length) {
      values.anexos_fachada.forEach(anexo => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_fachada = "Campo obrigatório";
    }

    if (
      values.anexos_ambiente_interno &&
      values.anexos_ambiente_interno.length
    ) {
      values.anexos_ambiente_interno.forEach(anexo => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_ambiente_interno = "Campo obrigatório";
    }

    if (values.anexos_area_externa && values.anexos_area_externa.length) {
      values.anexos_area_externa.forEach(anexo => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_area_externa = "Campo obrigatório";
    }

    if (values.anexos_iptu && values.anexos_iptu.length) {
      values.anexos_iptu.forEach(anexo => {
        anexos.push(anexo.originalFile);
      });
    } else {
      errors.anexos_iptu = "Campo obrigatório";
    }

    if (values.anexos_planta && values.anexos_planta.length) {
      values.anexos_planta.forEach(anexo => {
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
    if (!values.declaracao_responsabilidade)
      errors.declaracao_responsabilidade = "Campo obrigatório";
    return errors;
  };

  const validateImovel = async values => {
    const errors = {};

    if (!values.nao_possui_iptu) {
      if (!values.numero_iptu) {
        errors.numero_iptu = "Campo obrigatório";
      } else if (values.iptu && values.numero_iptu.length !== 14) {
        errors.numero_iptu =
          "IPTU precisa estar na seguinte máscara: 000.000.0000.0";
      } else {
        const response = await checaNumeroIPTU(values.numero_iptu);
        if (response.data.iptu_existe)
          errors.numero_iptu = "Este IPTU já está cadastrado";
        else if (!response.data.iptu_valido) {
          errors.numero_iptu = "Número de IPTU inválido";
        }
      }
    }

    if (values.cep && values.numero && values.endereco && values.bairro) {
      const response = await checaEnderecoImovel(values);
      if (response.data && response.data.endereco_existe) {
        errors.numero = "Este imóvel já possui cadastro em nossa base de dados";
      }
    }

    return errors;
  };

  return (
    <BaseHome>
      <div className="container">
        {!showTelaFinal ? (
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
        ) : (
          <TelaFinal dadosCadastro={dadosCadastro} />
        )}
      </div>
    </BaseHome>
  );
};

export default CadastroImovel;
