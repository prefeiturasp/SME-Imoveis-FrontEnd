import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { TabelaUsuarios } from "./componentes/TabelaUsuarios";
import { Filtro } from "./componentes/Filtro";
import { ModalEditarUsuario } from "./componentes/ModalEditarUsuario";
import "./style.scss";

const Permissionamento = () => {
  const [usuarios, setUsuarios] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <PaginaHeaderSidebar>
      <div className="permissionamento">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Gestão de Permissões</h1>
            <Filtro setUsuarios={setUsuarios} />
            <TabelaUsuarios
              usuarios={usuarios}
              setShowModal={setShowModal}
              setUsuario={setUsuario}
            />
            <ModalEditarUsuario
              usuario={usuario}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default Permissionamento;
