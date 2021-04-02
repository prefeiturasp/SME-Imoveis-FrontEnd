import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { Filtro } from "./componentes/Filtro";
import { Link } from "react-router-dom";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import { TabelaCadastros } from "./componentes/TabelaCadastros";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import "components/Botao/style.scss"
import "./style.scss";

const Cadastros = () => {
  const [cadastros, setCadastros] = useState(null);
  const [dataToExport, setDataToExport] = useState(null);
  const [total, setTotal] = useState(0);
  const [lastSearchParams, setLastSearchParams] = useState(null);
  const [dres, setDres] = useState(null);
  const [distritos, setDistritos] = useState(null);
  const [setores, setSetores] = useState(null);

  return (
    <PaginaHeaderSidebar>
      <Breadcrumb>
        <Breadcrumb.Item href="/adm-imoveis"><i className="fas fa-home"></i> Home</Breadcrumb.Item>
        <Breadcrumb.Item active href="/adm-imoveis/cadastros-realizados">
          Cadastros Realizados
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="cadastros">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Gestão de Cadastros Realizados</h1>
            <Filtro
              setCadastros={setCadastros}
              setDataToExport={setDataToExport}
              setTotal={setTotal}
              setDresProps={setDres}
              setDistritosProps={setDistritos}
              setSetoresProps={setSetores}
              setLastSearchParams={setLastSearchParams}
            />
            <TabelaCadastros
              cadastros={cadastros}
              dataToExport={dataToExport}
              total={total}
              lastSearchParams={lastSearchParams}
              setCadastros={setCadastros}
            />
          </div>
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default Cadastros;
