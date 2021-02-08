import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { FluxoDeStatus } from "components/FluxoDeStatus";
import { fluxoImoveis } from "components/FluxoDeStatus/helper";
import { Form, Field } from "react-final-form";
import { getImovel, updateImovel } from "services/Imovel.service";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import Botao from "components/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Botao/constants";
import { useHistory } from "react-router-dom";
import { InputText } from "components/Input/InputText";
import { iptuMask } from "helpers/textMask";
import { composeValidators, validaCEP } from "helpers/fieldValidators";
import { SelectText } from "components/Input/SelectText";
import { EH_PERFIL_ADMIN, EH_PERFIL_SECRETARIA, normalizarSetores } from "helpers/utils";
import formatStringByPattern from "format-string-by-pattern";
import { OnChange } from "react-final-form-listeners";
import { getEnderecoPorCEP } from "services/cep.service";
import { toastError, toastSuccess } from "components/Toast/dialogs";
import { georef } from "services/step2.service";
import { ESTADOS } from "pages/CadastroImovel/components/Imovel/constants";
import { getSetores } from "services/cadastros.service";
import { TabelaDemanda } from "./componentes/Demanda";
import { Anexos } from "./componentes/Anexos";
import { DadosCadastrante } from "./componentes/DadosCadastrante";
import "./style.scss";
import { formataValues, validateImovel } from "./helper";
import { TextArea } from "components/TextArea/TextArea";
import { ModalAtualizaStatus } from "./componentes/ModalAtualizaStatus";

export const DetalhamentoCadastro = () => {
  const [cadastro, setCadastro] = useState(null);
  const [erro, setErro] = useState(false);
  const [editar, setEditar] = useState(false);
  const [apiFora, setApiFora] = useState(false);
  const [setores, setSetores] = useState(null);
  const [count, setCount] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  const PODE_EDITAR = EH_PERFIL_ADMIN || EH_PERFIL_SECRETARIA;

  const history = useHistory();

  const onSubmit = (values) => {
    if (count % 2 === 1) {
      updateImovel(cadastro.id, formataValues(values))
        .then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess("Cadastro atualizado com sucesso");
            setEditar(false);
            setCadastro(response.data);
          } else {
            toastError("Houve um erro ao atualizar o cadastro");
            setCount(count + 1);
            setErro(true);
          }
        })
        .catch(() => {
          toastError("Houve um erro ao atualizar o cadastro");
          setCount(count + 1);
          setErro(true);
        });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getImovel(uuid)
        .then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            setCadastro(response.data);
          } else {
            setErro(true);
          }
        })
        .catch(() => {
          setErro(true);
        });
    }
    getSetores()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setSetores(response.data);
        }
      })
      .catch(() => {
        setErro(true);
      });
  }, []);

  return (
    <PaginaHeaderSidebar>
      <div className="row">
        <div className="col-12 text-right">
          <Botao
            style={BUTTON_STYLE.BLUE}
            type={BUTTON_TYPE.BUTTON}
            icon={BUTTON_ICON.ARROW_LEFT}
            className="col-2 mb-3"
            texto="voltar"
            onClick={() => history.goBack()}
          />
        </div>
      </div>
      <div className="card detalhamento-cadastro">
        <div className="card-body">
          <h1 className="card-title">Detalhamento de Cadastro</h1>
          {!cadastro && !erro && <div>Carregando...</div>}
          {erro && <div>Erro ao carregar dados do imóvel</div>}
          {cadastro && (
            <>
              {cadastro.logs && (
                <FluxoDeStatus
                listaDeStatus={cadastro.logs}
                fluxo={fluxoImoveis}
                />
                )}
                <ModalAtualizaStatus
                  showModal={showModal}
                  setShowModal={setShowModal}
                  cadastroProps={cadastro}
                  setCadastroProps={setCadastro}
                  count={count}
                />
              <Form
                initialValues={cadastro}
                onSubmit={onSubmit}
                validate={validateImovel}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <>
                      <div className="row mb-3 mt-3">
                        <div className="col-12 text-right">
                          <Botao
                            style={BUTTON_STYLE.BLUE_OUTLINE}
                            type={BUTTON_TYPE.BUTTON}
                            className="col-2"
                            texto="Atualizar status"
                            onClick={() => setShowModal(true)}
                          />
                          {PODE_EDITAR &&
                            (editar ? (
                              <Botao
                                style={BUTTON_STYLE.BLUE}
                                type={BUTTON_TYPE.SUBMIT}
                                className="col-2 ml-3"
                                texto={"Atualizar cadastro"}
                                onClick={() => setCount(count + 1)}
                              />
                            ) : (
                              <Botao
                                style={BUTTON_STYLE.BLUE}
                                type={BUTTON_TYPE.BUTTON}
                                className="col-2 ml-3"
                                texto={"Editar cadastro"}
                                onClick={() => {
                                  setEditar(true);
                                  setCount(count + 1);
                                }}
                              />
                            ))}
                        </div>
                      </div>
                      <div className="title mb-3">
                        Informações sobre o cadastro
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Número de protocolo"
                            name="protocolo"
                            type="text"
                            labelClassName="font-weight-bold color-black"
                            disabled
                          />
                        </div>
                        <div className="col-4">
                          <Field
                            component={InputText}
                            label="Data do cadastro"
                            name="criado_em"
                            type="text"
                            labelClassName="font-weight-bold color-black"
                            disabled
                          />
                        </div>
                      </div>
                      <hr />
                      <DadosCadastrante editar={editar} />
                      <hr />
                      <div className="title mb-3">Dados do imóvel</div>
                      <Field component="input" name="latitude" hidden />
                      <Field component="input" name="longitude" hidden />
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <Field
                            component={InputText}
                            parse={formatStringByPattern("12345-678")}
                            label="CEP"
                            name="cep"
                            validate={composeValidators(validaCEP)}
                            labelClassName="font-weight-bold color-black"
                            placeholder="Digite o CEP"
                            disabled={!editar}
                          />
                          <OnChange name="cep">
                            {async (value, previous) => {
                              if (value.length === 9) {
                                const response = await getEnderecoPorCEP(value);
                                if (response.status === HTTP_STATUS.OK) {
                                  if (response.data.resultado === "0") {
                                    toastError("CEP não encontrado");
                                    form.change("endereco", "");
                                    form.change("bairro", "");
                                  } else if (
                                    response.data.uf !== "SP" ||
                                    response.data.cidade !== "São Paulo"
                                  ) {
                                    toastError(
                                      "CEP não é do município de São Paulo"
                                    );
                                    form.change("endereco", "");
                                  } else {
                                    form.change(
                                      "endereco",
                                      response.data.tipo_logradouro +
                                        " " +
                                        response.data.logradouro.split(",")[0]
                                    );
                                    form.change("cidade", response.data.cidade);
                                    form.change("uf", response.data.uf);
                                    form.change("bairro", response.data.bairro);
                                  }
                                } else {
                                  setApiFora(true);
                                }
                              }
                            }}
                          </OnChange>
                        </div>
                        <div className="col-sm-6 col-12">
                          <Field
                            component={InputText}
                            label="Bairro"
                            name="bairro"
                            required
                            labelClassName="font-weight-bold color-black"
                            disabled={!apiFora}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <Field
                            component={InputText}
                            label="Endereço"
                            name="endereco"
                            required
                            labelClassName="font-weight-bold color-black"
                            disabled={!apiFora}
                          />
                        </div>
                        <div className="col-sm-2 col-12">
                          <Field
                            component={InputText}
                            maxlength={255}
                            label="Número"
                            name="numero"
                            labelClassName="font-weight-bold color-black"
                            disabled={!editar}
                            required
                          />
                          <OnChange name="numero">
                            {async (value, previous) => {
                              if (value) {
                                const response = await georef(
                                  values.endereco + " " + value
                                );
                                form.change(
                                  "longitude",
                                  response.data.features[0].geometry
                                    .coordinates[0]
                                );
                                form.change(
                                  "latitude",
                                  response.data.features[0].geometry
                                    .coordinates[1]
                                );
                              }
                            }}
                          </OnChange>
                        </div>
                        <div className="col-sm-4 col-12">
                          <Field
                            component={InputText}
                            maxlength={20}
                            label="Complemento"
                            name="complemento"
                            labelClassName="font-weight-bold color-black"
                            disabled={!editar}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-10 col-12">
                          <Field
                            component={InputText}
                            maxlength={100}
                            label="Cidade"
                            name="cidade"
                            disabled={!apiFora}
                            labelClassName="font-weight-bold color-black"
                          />
                        </div>
                        <div className="col-sm-2 col-12">
                          <Field
                            component={SelectText}
                            name="uf"
                            label="UF"
                            options={ESTADOS}
                            disabled={!apiFora}
                            naoDesabilitarPrimeiraOpcao
                            labelClassName="font-weight-bold color-black"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Field
                            component={InputText}
                            customChange={iptuMask}
                            label="Número do IPTU"
                            name="numero_iptu"
                            required={!values.nao_possui_iptu ? true : false}
                            disabled={values.nao_possui_iptu || !editar}
                            tooltipMessage={"Número de IPTU do imóvel."}
                            placeholder="Digite o Número do IPTU"
                            labelClassName="font-weight-bold color-black"
                          />
                        </div>
                        <div className="col-6">
                          <Field
                            component={InputText}
                            label="Área construída (m²)"
                            type="number"
                            name="area_construida"
                            required
                            tooltipMessage={"Área construída do imóvel em m²."}
                            placeholder="Digite a Área construída do imóvel"
                            labelClassName="font-weight-bold color-black"
                            disabled={!editar}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-check">
                          <Field
                            component={"input"}
                            name="nao_possui_iptu"
                            className="form-check-input"
                            type="checkbox"
                            disabled={!editar}
                          />
                          <OnChange name="nao_possui_iptu">
                            {async (value, previous) => {
                              if (value) {
                                values.numero_iptu = "";
                              }
                            }}
                          </OnChange>
                          <label className="form-check-label">
                            Imóvel não tem IPTU
                          </label>
                        </div>
                      </div>
                      {values.nao_possui_iptu && (
                        <Field
                          component={TextArea}
                          label="Campo para preenchimento do ITR (Imposto Territorial Rural) ou Observações"
                          name="observacoes"
                          required
                          placeholder="Por que o imóvel não possui IPTU?"
                          disabled={!editar}
                        />
                      )}
                      {!setores && <div>Carregando setores...</div>}
                      {setores && (
                        <div className="row">
                          <div className="col-4">
                            <Field
                              component={InputText}
                              name="setor.dre.nome"
                              label="DRE"
                              disabled
                              labelClassName="font-weight-bold color-black"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              name="setor.distrito.nome"
                              label="Distrito"
                              disabled
                              labelClassName="font-weight-bold color-black"
                            />
                          </div>
                          <div className="col-4">
                            <Field
                              component={InputText}
                              name="setor.codigo"
                              label="Setor"
                              disabled
                              labelClassName="font-weight-bold color-black"
                            />
                          </div>
                        </div>
                      )}
                      <hr />
                      <TabelaDemanda cadastro={cadastro} />
                      <hr />
                      {cadastro.anexos && (
                        <Anexos
                          cadastro={cadastro}
                          setPropsCadastro={setCadastro}
                          setPropsErro={setErro}
                          editar={editar}
                        />
                      )}
                    </>
                  </form>
                )}
              />
            </>
          )}
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};
