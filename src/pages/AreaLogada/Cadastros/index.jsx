import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { Filtro } from "./componentes/Filtro";
import { Link } from "react-router-dom";
import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { TabelaCadastros } from "./componentes/TabelaCadastros";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { useHistory } from "react-router-dom";
import "components/Botao/style.scss"
import "./style.scss";

const Cadastros = () => {
  const [cadastros, setCadastros] = useState(null);
  const [total, setTotal] = useState(0);
  const [lastSearchParams, setLastSearchParams] = useState(null);
  const [dres, setDres] = useState(null);
  const [distritos, setDistritos] = useState(null);
  const [setores, setSetores] = useState(null);
  const history = useHistory();
  const [carregando, setCarregando] = useState(false);

  return (
    <PaginaHeaderSidebar>
      <Breadcrumb>
        <Breadcrumb.Item href="/adm-imoveis"><i className="fas fa-home"></i> Home</Breadcrumb.Item>
        <Breadcrumb.Item active href="/adm-imoveis/cadastros-realizados">
          Cadastros Realizados
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
      <div className="cadastros">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Gestão de Cadastros Realizados</h1>
            <Filtro
              setCadastros={setCadastros}
              setTotal={setTotal}
              setDresProps={setDres}
              setDistritosProps={setDistritos}
              setSetoresProps={setSetores}
              setLastSearchParams={setLastSearchParams}
              setCarregando={setCarregando}
            />
            <TabelaCadastros
              cadastros={cadastros}
              total={total}
              lastSearchParams={lastSearchParams}
              setCadastros={setCadastros}
              carregando={carregando}
              setCarregando={setCarregando}
            />
          </div>
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default Cadastros;
