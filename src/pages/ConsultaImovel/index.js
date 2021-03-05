import React, { useState } from "react";
import "./styles.scss";
import BaseHome from "components/BaseHome";
import { Card } from "primereact/card";
import { Field, Form } from "react-final-form";
import { InputText } from "components/Input/InputText";
import Spin from "antd/es/spin";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import Botao from "components/Botao";
import { numeroProtocolo } from "helpers/textMask";
import { toastError } from "components/Toast/dialogs";
import { getImovel } from "services/Imovel.service";
import HTTP_STATUS from "http-status-codes";
import { TextArea } from "components/TextArea/TextArea";

const ConsultaImovel = () => {

  const [imovel, setImovel] = useState(false);
  const [erro, setErro] = useState(false);

  const onSubmit = async (values) => {
    if (values.numero_protocolo && values.numero_protocolo.length > 0) {
      const uuid = values.numero_protocolo
      getImovel(uuid)
    .then((response) => {
    if (response.status === HTTP_STATUS.OK) {
      setImovel(response.data);
    }
    })
    .catch(() => {
    toastError("Cadastro não encontrado");
    });
    } else {
      toastError("Digite um número de protocolo")
    }
  };

  const buscarNovamente = async () => {
    setImovel(false);
  };

  return(
    <BaseHome>
      <section id="consulta-imovel">
        <div className="container">
          <div className="row">
            <div className="col-12 p-4">
              <h4 className="cor-azul">
                Acompanhamento de Protocolo
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Card className="card-imovel">
                <Form onSubmit={onSubmit}>
                  {({ handleSubmit, form, submitting, values }) => (
                    <Spin spinning={submitting}>
                      <form onSubmit={handleSubmit}>
                        {imovel ? (
                          <div>
                            <div className="row">
                              <div className="col-4">
                                <Field
                                  component={InputText}
                                  label="Nº do protocolo"
                                  name={"nmr_protocolo"}
                                  defaultValue={imovel.protocolo}
                                  disabled={true}
                                />
                              </div>
                              <div className="col-8"></div>
                            </div>
                            <div className="row imovel-content">
                              <div className="col-4">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.status}
                                  name={"status"}
                                  label="Status Atual"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-8"></div>
                              <div className="col-12 mt-4">
                                <p className="cor-azul">Dados do Imóvel</p>
                              </div>
                              <div className="col-8">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.endereco}
                                  name={"endereco"}
                                  label="Endereço"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-4">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.numero}
                                  name={"numero"}
                                  label="Número"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-6">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.complemento}
                                  name={"complemento"}
                                  label="Complemento"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.bairro}
                                  name={"bairro"}
                                  label="Bairro"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.cep}
                                  name={"cep"}
                                  label="CEP"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-6">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.cidade}
                                  name={"cidade"}
                                  label="Cidade"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.uf}
                                  name={"estado"}
                                  label="Estado"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.area_construida | 0}
                                  name={"area_construida"}
                                  label="Área Construída em m²"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-4">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.numero_iptu}
                                  name="iptu"
                                  label="IPTU"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-8 mt-5">
                                <input
                                  component='input'
                                  className="naoPossuiIPTU"
                                  name="nao_possui_iptu"
                                  type="checkbox"
                                  defaultChecked={imovel.nao_possui_iptu}
                                  disabled={true}
                                />
                                <label className="ml-2"><b>Este imóvel não possui IPTU</b></label>
                              </div>
                              <div className="col-12  mb-4">
                                <Field
                                  component={TextArea}
                                  defaultValue={imovel.observacoes}
                                  name={"observacoes"}
                                  label="Observações"
                                  style={{minHeight: "100px", height: "100px", maxHeight: '100px'}}
                                  disabled={true}
                                />
                              </div>
                              <div className="col-6">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.setor ? imovel.setor.dre.nome : ""}
                                  name={"dre"}
                                  label="DRE"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.setor ? imovel.setor.distrito.nome : ""}
                                  name={"distrito"}
                                  label="Distrito"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-3">
                                <Field
                                  component={InputText}
                                  defaultValue={imovel.setor ? imovel.setor.codigo: ""}
                                  name={"setor"}
                                  label="Setor"
                                  disabled={true}
                                />
                              </div>
                              <div className="col-9"></div>
                              <div className="col-3">
                                <Botao
                                  type={BUTTON_TYPE.BUTTON}
                                  style={BUTTON_STYLE.BLUE}
                                  className="col-12  mt-3"
                                  texto="Nova Busca"
                                  onClick={() => buscarNovamente()}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            <div className="col-4">
                              <Field
                                customChange={numeroProtocolo}
                                component={InputText}
                                label="Número do Protocolo"
                                placeholder={'Nº do Protocolo'}
                                name="numero_protocolo"
                              />
                            </div>
                            <div className="col-8 botao-buscar">
                              <Botao
                                type={BUTTON_TYPE.SUBMIT}
                                style={BUTTON_STYLE.BLUE}
                                className="col-2"
                                texto="Buscar"
                              />
                            </div>
                          </div>
                        )}
                      </form>
                    </Spin>
                  )}
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </BaseHome>
  );
}

export default ConsultaImovel;
