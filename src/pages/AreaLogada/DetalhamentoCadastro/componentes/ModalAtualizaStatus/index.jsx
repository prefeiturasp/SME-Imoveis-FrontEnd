import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { InputText } from "components/Input/InputText";
import { SelectText } from "components/Input/SelectText";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { SITUACAO } from "pages/CadastroImovel/components/Imovel/constants";
import { codigoEscolaMask } from "helpers/textMask";
import HTTP_STATUS from "http-status-codes";
import { getEscola, updateStatus } from "services/cadastros.service";
import { formataPaylaodAtualizaCadastro } from "../../helper";
import { toastError, toastSuccess } from "components/Toast/dialogs";
import { EH_PERFIL_DRE, EH_PERFIL_CONSULTA_SECRETARIA } from "helpers/utils";
import "./style.scss";

export const ModalAtualizaStatus = ({
  cadastroProps,
  showModal,
  setShowModal,
}) => {
  const [cadastro, setCadastro] = useState(null);

  useEffect(() => {
    setCadastro(cadastroProps);
  }, []);

  const onSubmit = async (values) => {
    const response = await updateStatus(formataPaylaodAtualizaCadastro(values));
    if (!response) toastError("Erro ao carregar os dados dos cadastros realizados");
    else if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Cadastro atualizado com sucesso")
    }
  };

  return (
    <Modal
      dialogClassName="modal-70w"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modalTitle">
            Atualização de Status
          </div>
        </Modal.Title>
      </Modal.Header>
      {cadastro && (
        <Modal.Body>
          <Form
            initialValues={cadastro}
            onSubmit={onSubmit}
            render={({
              handleSubmit,
              form,
              submitting,
              pristine,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      texto="Salvar Alteração"
                      className="float-right mr-2"
                      onClick={() => onSubmit(values)}
                      disabled={EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA}
                    />
                  </div>
                  <div className="col-12 title mb-3">
                    Informações
                  </div>
                  <Field
                      component={InputText}
                      name="id"
                      type="hidden"
                  />
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
                  <div className="col-8">
                    <Field
                      component={InputText}
                      label="Endereço"
                      name="endereco"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-2">
                    <Field
                      component={InputText}
                      label="Número"
                      name="numero"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Bairro"
                      name="bairro"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={InputText}
                      label="Área Construída m²"
                      name="area_construida"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={InputText}
                      label="Demanda Total"
                      name="demandaimovel.total"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={SelectText}
                      name="situacao"
                      label="Situação"
                      options={SITUACAO}
                      naoDesabilitarPrimeiraOpcao
                      labelClassName="font-weight-bold color-black"
                      disabled={EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA}
                    />
                  </div>
                  <div className="col-9"></div>
                  { values.situacao === "Substituição" && (
                    <>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          name="codigo_eol"
                          customChange={codigoEscolaMask}
                          label="Código EOL"
                          type="text"
                          labelClassName="font-weight-bold color-black"
                          disabled={EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA}
                        />
                        <OnChange name="codigo_eol">
                          {async (value, previous) => {
                            if (value.length == 6) {
                              const response = await getEscola(value);
                              if(response.data.nomesc && response.data.tipoesc) {
                                form.change(
                                  "escola",
                                  `${response.data.tipoesc} ${response.data.nomesc}`
                                );
                              } else {
                                toastError("Escola não encontrada");
                                form.change("codigo_eol", "");
                                form.change("escola", "");
                              }
                            }
                          }}
                        </OnChange>
                      </div>
                      <div className="col-9">
                        <Field
                          component={InputText}
                          label="Escola"
                          name="escola"
                          type="text"
                          labelClassName="font-weight-bold color-black"
                          disabled
                        />
                      </div>
                    </>
                  )}
                </div>
              </form>
            )}
          />
        </Modal.Body>
      )}
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};
