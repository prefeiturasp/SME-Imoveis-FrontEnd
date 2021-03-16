import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Filtro } from "./componentes/Filtro";
import { Relatorio } from "./componentes/Relatorio";
import { Grafico } from "./componentes/Grafico";
import "./style.scss";
import { Tabs } from "react-bootstrap";
import { Tab } from "bootstrap";

const RelatorioPorStatus = () => {
  const [filtros, setFiltros] = useState({status: [], anos: []});
  const [resultado, setResultado] = useState(null);

  return (
    <PaginaHeaderSidebar>
      <Breadcrumb className='breadcrumb-bootstrap'>
        <Breadcrumb.Item href="/adm-imoveis"><i class="fas fa-home"></i>Home</Breadcrumb.Item>
        <Breadcrumb.Item active href="/adm-imoveis/relatorio-por-status/">
          Cadastro de Imóveis por Status
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Cadastro de Imóveis por Status</h1>
          <Filtro
            filtros={filtros}
            setFiltros={setFiltros}
            setResultado={setResultado}
          />
          {resultado && (
            <div className="relatorio card mt-5">
              <Tabs defaultActiveKey="relatorio" id="uncontrolled-tab-example">
                <Tab eventKey="relatorio" title="Resumo">
                  <Relatorio
                    resultado={resultado}
                    filtros={filtros}
                  />
                </Tab>
                <Tab eventKey="grafico" title="Gráfico">
                  <Grafico
                    resultado={resultado}
                  />
                </Tab>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default RelatorioPorStatus;
