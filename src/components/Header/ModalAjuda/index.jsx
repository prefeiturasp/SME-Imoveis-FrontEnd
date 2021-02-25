import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./style.scss";

export const ModalAjuda = ({
  openAjuda,
  setOpenAjuda
}) => {
  return(
    <Modal
      dialogClassName="modal-70w"
      show={openAjuda}
      onHide={() => setOpenAjuda(false)}
      dialog='true'
    >
      <Modal.Header closeButton className="wrapperModal">
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="modalText">Para ajuda, entre em contato através do e-mail:</p>
          <p className="modalText"><b>SME - COGED</b></p>
          <p className="modalText email">smecoged@sme.prefeitura.sp.gov.br</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}  