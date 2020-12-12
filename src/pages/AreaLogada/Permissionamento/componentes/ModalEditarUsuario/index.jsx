import React from "react";
import { Field, Form } from "react-final-form";
import { Modal } from "react-bootstrap";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";
import { InputText } from "components/Input/InputText";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";

export const ModalEditarUsuario = ({ usuario, showModal, setShowModal }) => {
  const onSubmit = (values) => {
    console.log(values);
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
