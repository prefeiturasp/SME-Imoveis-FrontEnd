import React from "react";
import "./style.scss";

export const TabelaDemanda = ({ cadastro }) => {
  return (
    <div>
      <div className="title mb-3">Informações sobre demanda</div>
      {!cadastro.demandaimovel && (
        <div>Não há informações sobre a demanda para este imóvel.</div>
      )}
      {cadastro.demandaimovel && (
        <>
        <table className="tabela-demanda">
          <thead>
            <tr>
              <th />
              <th>Berçário I</th>
              <th>Berçário II</th>
              <th>Mini Grupo I</th>
              <th>Mini Grupo II</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Demada por modalidade</td>
              <td>{cadastro.demandaimovel.bercario_i}</td>
              <td>{cadastro.demandaimovel.bercario_ii}</td>
              <td>{cadastro.demandaimovel.mini_grupo_i}</td>
              <td>{cadastro.demandaimovel.mini_grupo_ii}</td>
            </tr>
            <tr>
              <td>Demanda total</td>
              <td colSpan="4">{cadastro.demandaimovel.total}</td>
            </tr>
          </tbody>
        </table>
        </>
      )}
      {cadastro.demandaimovel && (
        <div className="data_atualizacao">{cadastro.demandaimovel.data_atualizacao} </div>
      )}
    </div>
  );
};
