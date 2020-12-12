import React from "react";
import { Modal } from "react-bootstrap";

export const ModalEditarUsuario = ({ usuario, showModal, setShowModal }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Atualização de Permissão</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-primary pl-4 pr-4"
          onClick={() => setShowModal(false)}
        >
          Salvar alterações
        </button>
      </Modal.Footer>
    </Modal>
  );
};
