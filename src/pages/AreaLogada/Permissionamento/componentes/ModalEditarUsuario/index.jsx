import React, {useState} from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Modal } from "react-bootstrap";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";
import { InputText } from "components/Input/InputText";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { SelectText } from "components/Input/SelectText";
import { getError, normalizarOptions, normalizarPerfis } from "helpers/utils";
import { getUsuarios, setUsuario } from "services/permissionamento.service";
import { toastError, toastSuccess } from "components/Toast/dialogs";

export const ModalEditarUsuario = ({
  usuario,
  showModal,
  setShowModal,
  secretarias,
  dres,
  perfis,
  setUsuarios,
}) => {
  const [legenda, setLegenda] = useState(<div></div>);
  
  const onSubmit = (values) => {
    setUsuario(values)
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Usuário atualizado com sucesso");
          getUsuarios("").then((response_) => {
            setUsuarios(response_.data);
            setShowModal(false);
          });
        } else {
          toastError(getError(response.data));
        }
      })
      .catch(() => {
        toastError("Erro ao atualizar usuario");
      });
  };

  return (
    <Form initialValues={usuario} onSubmit={onSubmit}>
      {({ handleSubmit, form, submitting, values }) => (
        <Spin spinning={submitting}>
          <form onSubmit={handleSubmit}>
            <Modal
              dialogClassName="modal-70w"
              show={showModal}
              onHide={() => setShowModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Atualização de Permissão</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-sm-8 col-12">
                    <Field
                      component={InputText}
                      esconderAsterisco
                      label="Nome do usuário"
                      name="nome"
                      disabled
                      type="text"
                    />
                  </div>
                  <div className="col-sm-4 col-12">
                    <Field
                      component={InputText}
                      esconderAsterisco
                      label="RF"
                      name="username"
                      disabled
                      type="text"
                    />
                  </div>
                </div>
                <Field
                  component={InputText}
                  esconderAsterisco
                  label="E-mail"
                  name="email"
                  disabled
                  type="text"
                />
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <Field
                      component={SelectText}
                      name="secretaria_"
                      label="Secretaria"
                      options={normalizarOptions(secretarias)}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                  <div className="col-sm-6 col-12">
                    <Field
                      component={SelectText}
                      name="dre_"
                      label="DRE"
                      disabled
                      options={normalizarOptions(dres)}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <Field
                      component={SelectText}
                      name="perfil_"
                      label="Tipo de permissão"
                      options={normalizarPerfis(perfis)}
                      naoDesabilitarPrimeiraOpcao
                    />
                    <OnChange name="perfil_">
                      { (value, previous) => {
                        if(value === undefined || value === ""){
                          setLegenda(null);
                        }
                        if(value === 1){
                          setLegenda(
                            "ADMIN: refere-se a permissão total do sistema onde a SME terá no máximo 3 usuários."
                          );
                        }
                        if(value === 2){
                          setLegenda(
                            "SECRETARIA: refere-se a permissão total do sistema, exceto ao processo de permissionamento onde cada secretaria terá no máximo 3 usuários."
                          );
                        }
                        if(value === 3){
                          setLegenda(
                            "CONSULTA SECRETARIA: refere-se a permissão de consulta do sistema."
                          );
                        }
                        if(value === 4){
                          setLegenda(
                            "DRE: refere-se a permissão de consulta do sistema referente a sua DRE de acesso."
                          );
                        }
                        if(value === "SEM PERMISSAO"){
                          setLegenda(
                            "SEM PERMISSÃO: usuário não terá acesso ao sistema."
                          );
                        }
                      }}
                    </OnChange>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    { legenda && (
                      <p className="legenda">Tipos de permissionamento referem-se á:</p>
                    )}
                  </div>
                  <div className="col-12">
                    <p className="legenda">
                      {legenda}
                    </p>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="text-right">
                  <Botao
                    type={BUTTON_TYPE.BUTTON}
                    onClick={() => onSubmit(values)}
                    style={BUTTON_STYLE.BLUE}
                    texto="Salvar alterações"
                  />
                </div>
              </Modal.Footer>
            </Modal>
          </form>
        </Spin>
      )}
    </Form>
  );
};
