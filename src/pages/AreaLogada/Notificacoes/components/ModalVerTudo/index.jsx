import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { QUANTIDADE_POR_PAGINA } from "components/Paginacao/constants";
import { Paginacao } from "components/Paginacao";

export const ModalVerTudo = ({
  endpointGetImoveis,
  showModal,
  setShowModal,
  imoveisProps,
  status,
  count,
}) => {
  const [imoveis, setImoveis] = useState(null);

  useEffect(() => {
    setImoveis(imoveisProps);
  }, []);

  const getImoveisPorPagina = (pagina) => {
    endpointGetImoveis(pagina).then((response) => {
      setImoveis(response.data.results);
    });
  };

  return (
    <Modal
      dialogClassName="modal-70w"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Lista de Novos Cadastros</Modal.Title>
      </Modal.Header>
      {imoveis && (
        <Modal.Body>
          <table className="notificacoes">
            <thead>
              <tr>
                <th>Protocolo</th>
                <th>DRE</th>
                <th>Distrito</th>
                <th>Setor</th>
                <th>Endereço</th>
                <th>Status</th>
                <th>Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((imovel, key) => {
                return (
                  <tr key={key}>
                    <td>{imovel.protocolo}</td>
                    <td>{imovel.setor && imovel.setor.dre.sigla}</td>
                    <td>{imovel.setor && imovel.setor.distrito.nome}</td>
                    <td>{imovel.setor && imovel.setor.codigo}</td>
                    <td>{`${imovel.endereco}, ${imovel.numero}`}</td>
                    <td>{status}</td>
                    <td>{imovel.criado_em.split(" ")[0]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {imoveis && (
            <div>
              <Paginacao
                onChange={(pagina) => getImoveisPorPagina(pagina)}
                total={count}
              />
            </div>
          )}
        </Modal.Body>
      )}
      <Modal.Footer>
        <button
          className="btn btn-primary pl-4 pr-4"
          onClick={() => setShowModal(false)}
        >
          OK
        </button>
      </Modal.Footer>
    </Modal>
  );
};
