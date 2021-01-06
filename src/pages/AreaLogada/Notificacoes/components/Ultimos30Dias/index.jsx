import React from "react";

export const Ultimos30Dias = ({ notificacoes }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <i className="fas fa-thumbtack mr-2"></i>Status dos cadastros
        </div>
        <div className="row cards">
          <div className="col-4">
            <div className="card-notificacao">
              <div className="titulo">NOVOS CADASTROS</div>
              <div className="numero">{notificacoes["novos_cadastros"]}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="card-notificacao two">
              <div className="titulo">PRÓXIMOS AO VENCIMENTO</div>
              <div className="numero">
                {notificacoes["proximos_ao_vencimento"]}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card-notificacao three">
              <div className="titulo">ATRASADOS</div>
              <div className="numero">{notificacoes["atrasados"]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
