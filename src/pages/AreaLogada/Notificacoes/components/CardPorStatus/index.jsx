import React from "react";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";

export const CardPorStatus = ({ imoveis, titulo, status }) => {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="card-title notificacoes">Notificações</div>
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
