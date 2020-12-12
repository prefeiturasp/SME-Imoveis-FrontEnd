import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { TabelaUsuarios } from "./componentes/TabelaUsuarios";
import { Filtro } from "./componentes/Filtro";
import "./style.scss";

const Permissionamento = () => {
  const [usuarios, setUsuarios] = useState(null);

  return (
    <PaginaHeaderSidebar>
      <div className="permissionamento">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Gestão de Permissões</h1>
            <Filtro setUsuarios={setUsuarios} />
            <TabelaUsuarios usuarios={usuarios} />
          </div>
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default Permissionamento;
