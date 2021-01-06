import React, { useState } from "react";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { ModalVerTudo } from "../ModalVerTudo";
import { useHistory } from "react-router-dom";

export const CardPorStatus = ({
  imoveis,
  titulo,
  status,
  endpointGetImoveis,
  count,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [hovered] = useState([]);
  const [, updateState] = React.useState();

  const forceUpdate = React.useCallback(() => updateState({}), []);
  const history = useHistory();

  return (
    <div className="card mt-3">
      <div className="card-body">
        <ModalVerTudo
          endpointGetImoveis={endpointGetImoveis}
          showModal={showModal}
          setShowModal={setShowModal}
          imoveisProps={imoveis}
          status={status}
          count={count}
          forceUpdate={forceUpdate}
          history={history}
        />
        <div className="card-title notificacoes">
          <i className="fas fa-thumbtack mr-2"></i>Notificações
        </div>
        <table className="notificacoes">
          <thead>
            <tr>
              <th colSpan="7">
                {titulo}
                <Botao
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.BLUE}
                  texto="Ver tudo"
                  className="float-right mr-2"
                  onClick={() => setShowModal(true)}
                  disabled={!imoveis || imoveis.length === 0}
                />
              </th>
            </tr>
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
                <tr
                  className={`${hovered.includes(key) && "hovered"}`}
                  onMouseEnter={() => {
                    hovered.push(key);
                    forceUpdate();
                  }}
                  onMouseLeave={() => {
                    hovered.pop();
                    forceUpdate();
                  }}
                  onClick={() =>
                    history.push(
                      `/adm-imoveis/detalhamento-cadastro?uuid=${imovel.id}`
                    )
                  }
                  key={key}
                >
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
            {imoveis.length === 0 && (
              <tr>
                <td colSpan="7">Não há imóveis com status {titulo}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
