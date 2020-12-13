import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { SelectText } from "components/Input/SelectText";
import { Field, Form } from "react-final-form";
import {
  getDres,
  getPerfis,
  getSecretarias,
  getUsuarios,
} from "services/permissionamento.service";
import { normalizarOptions, normalizarPerfis } from "helpers/utils";
import { InputText } from "components/Input/InputText";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import Botao from "components/Botao";
import { toastError } from "components/Toast/dialogs";
import { formataPaylaodBuscaUsuarios } from "../../helper";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";

export const Filtro = ({
  setUsuarios,
  setSecretariasProps,
  setPerfisProps,
  setDresProps,
}) => {
  const [perfis, setPerfis] = useState(null);
  const [dres, setDres] = useState(null);
  const [secretarias, setSecretarias] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getPerfis()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setPerfis(response.data.results);
          setPerfisProps(response.data.results);
        }
      })
      .catch(() => {
        setErro(true);
      });
    getDres()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setDres(response.data.results);
          setDresProps(response.data.results);
        }
      })
      .catch(() => {
        setErro(true);
      });
    getSecretarias()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setSecretarias(response.data.results);
          setSecretariasProps(response.data.results);
        }
      })
      .catch(() => {
        setErro(true);
      });
  }, []);

  const onSubmit = async (values) => {
    const response = await getUsuarios(formataPaylaodBuscaUsuarios(values));
    if (!response) toastError("Erro ao carregar os dados dos usuários");
    else if (response.status === HTTP_STATUS.OK) {
      setUsuarios(response.data);
    }
  };

  const LOADING = !dres || !perfis || !secretarias;

  return (
    <>
      {LOADING && !erro && <div>Carregando...</div>}
      {erro && <div>Erro ao carregar dados do servidor</div>}
      {!LOADING && (
        <Form onSubmit={onSubmit}>
          {({ handleSubmit, form, submitting, values }) => (
            <Spin spinning={submitting}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <Field
                      component={SelectText}
                      name="secretaria"
                      label="Pesquisa por Secretaria"
                      options={normalizarOptions(secretarias)}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                  <div className="col-sm-6 col-12">
                    <Field
                      component={SelectText}
                      name="dre"
                      label="Pesquisa por DRE"
                      options={normalizarOptions(dres)}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 col-12">
                    <Field
                      component={InputText}
                      esconderAsterisco
                      label="Nome do usuário"
                      name="nome"
                      placeholder={"Digite o nome do usuário"}
                      type="text"
                    />
                  </div>
                  <div className="col-sm-4 col-12">
                    <Field
                      component={SelectText}
                      name="perfil"
                      label="Tipo de permissão"
                      options={normalizarPerfis(perfis)}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                  <div className="col-sm-2 mt-auto mb-2 col-12">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      className="col-12"
                      texto="Limpar"
                      onClick={() => form.reset()}
                    />
                  </div>
                  <div className="col-sm-2 mt-auto mb-2 col-12">
                    <Botao
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.BLUE}
                      className="col-12"
                      texto="Filtrar"
                    />
                  </div>
                </div>
              </form>
            </Spin>
          )}
        </Form>
      )}
    </>
  );
};
