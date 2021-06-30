import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export const ModalConfirmacaoEnvioEmailAoCancelar = ({
    showModal, closeModal, cancelar, values
}) => {

    const sendEmail = (send = false) => {
        cancelar(values, send);
        closeModal();
    }

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Cancelamento de cadastro de imóvel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Deseja enviar e-mail com retorno ao proprietário?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary pl-4 pr-4" onClick={() => sendEmail(true)}>
                    Sim
                </button>
                <button className="btn btn-primary pl-4 pr-4" onClick={() => sendEmail()}>
                    Não
                </button>
            </Modal.Footer>
        </Modal>
    );
}
