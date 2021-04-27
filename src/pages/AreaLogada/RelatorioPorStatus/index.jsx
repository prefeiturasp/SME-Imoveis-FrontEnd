import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { useHistory } from "react-router-dom";
import { Filtro } from "./componentes/Filtro";
import { Relatorio } from "./componentes/Relatorio";
import { Grafico } from "./componentes/Grafico";
import "./style.scss";
import { Tabs } from "react-bootstrap";
import { Tab } from "bootstrap";
import Spin from "antd/es/spin";

const RelatorioPorStatus = () => {
  const [filtros, setFiltros] = useState({status: [], anos: []});
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [legenda, setLegenda] = useState(null);
  const history = useHistory();

  return (
    <PaginaHeaderSidebar>
      <Breadcrumb className='breadcrumb-bootstrap'>
        <Breadcrumb.Item href="/adm-imoveis"><i className="fas fa-home"></i>Home</Breadcrumb.Item>
        <Breadcrumb.Item active href="/adm-imoveis/relatorio-por-status/">
          Cadastros por Status
        </Breadcrumb.Item>
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
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Cadastros por Status</h1>
          <Filtro
            filtros={filtros}
            setFiltros={setFiltros}
            setResultado={setResultado}
            setCarregando={setCarregando}
            setLegenda={setLegenda}
          />
          {resultado && (
            <Spin spinning={carregando}>
              <div className="relatorio card mt-5">
                <Tabs defaultActiveKey="relatorio" id="uncontrolled-tab-example">
                  <Tab eventKey="relatorio" title="Resumo">
                    <Relatorio
                      resultado={resultado}
                      filtros={filtros}
                      setCarregando={setCarregando}
                      legenda={legenda}
                    />
                  </Tab>
                  <Tab eventKey="grafico" title="Gráfico">
                    <Grafico
                      resultado={resultado}
                    />
                  </Tab>
                </Tabs>
              </div>
            </Spin>
          )}
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default RelatorioPorStatus;
