import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import { getUltimos30dias } from "services/notificacoes.service";
import "./style.scss";

export const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getUltimos30dias()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setNotificacoes(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          setErro(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setErro(true);
      });
  }, []);

  return (
    <PaginaHeaderSidebar>
      {loading && !erro && <div>Carregando...</div>}
      {erro && <div>Erro ao carregar dados de notificação</div>}
      {!loading && !erro && notificacoes && (
        <div className="card">
          <div className="card-body">
            <div className="card-title">Status últimos 30 dias</div>
            <div className="row cards">
              <div className="col-4">
                <div className="card-notificacao">
                  <div className="titulo">NOVOS CADASTROS</div>
                  <div className="numero">
                    {notificacoes["novos_cadastros"]}
                    <span>Conferir lista</span>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card-notificacao two">
                  <div className="titulo">PRÓXIMOS AO VENCIMENTO</div>
                  <div className="numero">
                    {notificacoes["proximos_ao_vencimento"]}
                    <span>Conferir lista</span>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card-notificacao three">
                  <div className="titulo">ATRASADOS</div>
                  <div className="numero">
                    {notificacoes["atrasados"]}
                    <span>Conferir lista</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PaginaHeaderSidebar>
  );
};
