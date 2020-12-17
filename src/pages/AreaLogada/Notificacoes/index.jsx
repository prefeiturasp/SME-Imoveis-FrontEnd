import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import HTTP_STATUS from "http-status-codes";
import React, { useEffect, useState } from "react";
import {
  getImoveisNovosCadastros,
  getUltimos30dias,
  getImoveisProximosAoVencimento,
  getImoveisAtrasados,
} from "services/notificacoes.service";
import { CardPorStatus } from "./components/CardPorStatus";
import { Ultimos30Dias } from "./components/Ultimos30Dias";
import "./style.scss";

export const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState(null);
  const [novosCadastros, setNovosCadastros] = useState(null);
  const [proximosAoVencimento, setProximosAoVencimento] = useState(null);
  const [atrasados, setAtrasados] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getUltimos30dias()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setNotificacoes(response.data);
        } else {
          setErro(true);
        }
      })
      .catch(() => {
        setErro(true);
      });
    getImoveisNovosCadastros()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setNovosCadastros(response.data.results);
        } else {
          setErro(true);
        }
      })
      .catch(() => {
        setErro(true);
      });
    getImoveisProximosAoVencimento()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setProximosAoVencimento(response.data.results);
        } else {
          setErro(true);
        }
      })
      .catch(() => {
        setErro(true);
      });
    getImoveisAtrasados()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setAtrasados(response.data.results);
        } else {
          setErro(true);
        }
      })
      .catch(() => {
        setErro(true);
      });
  }, []);

  const LOADING =
    !notificacoes || !novosCadastros || !proximosAoVencimento || !atrasados;

  return (
    <PaginaHeaderSidebar>
      {LOADING && !erro && <div>Carregando...</div>}
      {erro && <div>Erro ao carregar dados de notificação</div>}
      {!LOADING && !erro && notificacoes && (
        <>
          <Ultimos30Dias notificacoes={notificacoes} />
          <CardPorStatus
            titulo="NOVOS CADASTROS"
            imoveis={novosCadastros}
            status="NOVO CADASTRO"
          />
          <CardPorStatus
            titulo="PRÓXIMOS AO VENCIMENTO"
            imoveis={proximosAoVencimento}
            status="5 DIAS PARA DEVOLUTIVA"
          />
          <CardPorStatus
            titulo="ATRASADOS"
            imoveis={atrasados}
            status="ATRASADO"
          />
        </>
      )}
    </PaginaHeaderSidebar>
  );
};
