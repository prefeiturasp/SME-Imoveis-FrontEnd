import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import HTTP_STATUS from "http-status-codes";
import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { useHistory } from "react-router-dom";
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
  const [countNovosCadastros, setCountNovosCadastros] = useState(0);
  const [proximosAoVencimento, setProximosAoVencimento] = useState(null);
  const [countProximosAoVencimento, setCountProximosAoVencimento] = useState(0);
  const [atrasados, setAtrasados] = useState(null);
  const [countAtrasados, setCountAtrasados] = useState(0);
  const [erro, setErro] = useState(false);
  const history = useHistory();

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
          setCountNovosCadastros(response.data.count);
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
          setCountProximosAoVencimento(response.data.count);
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
          setCountAtrasados(response.data.count);
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
          <Breadcrumb>
            <Breadcrumb.Item href="/adm-imoveis"><i className="fas fa-home"></i> Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="row">
            <div className="col-12 text-right">
              <Botao
                style={BUTTON_STYLE.BLUE}
                type={BUTTON_TYPE.BUTTON}
                icon={BUTTON_ICON.ARROW_LEFT}
                className="col-2 mb-3"
                texto="voltar"
                onClick={() => history.goBack()}
              />
            </div>
          </div>
          <Ultimos30Dias notificacoes={notificacoes} />
          <CardPorStatus
            titulo="NOVOS CADASTROS"
            imoveis={novosCadastros}
            status="NOVO CADASTRO"
            endpointGetImoveis={getImoveisNovosCadastros}
            count={countNovosCadastros}
          />
          <CardPorStatus
            titulo="PRÓXIMOS AO VENCIMENTO"
            imoveis={proximosAoVencimento}
            status="5 DIAS PARA DEVOLUTIVA"
            endpointGetImoveis={getImoveisProximosAoVencimento}
            count={countProximosAoVencimento}
          />
          <CardPorStatus
            titulo="ATRASADOS"
            imoveis={atrasados}
            status="ATRASADO"
            endpointGetImoveis={getImoveisAtrasados}
            count={countAtrasados}
          />
        </>
      )}
    </PaginaHeaderSidebar>
  );
};
