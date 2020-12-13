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
  const [secretarias, setSecretarias] = useState(null);
  const [perfis, setPerfis] = useState(null);
  const [dres, setDres] = useState(null);

  return (
    <PaginaHeaderSidebar>
      <div className="permissionamento">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Gestão de Permissões</h1>
            <Filtro
              setUsuarios={setUsuarios}
              setPerfisProps={setPerfis}
              setSecretariasProps={setSecretarias}
              setDresProps={setDres}
            />
            <TabelaUsuarios
              usuarios={usuarios}
              setShowModal={setShowModal}
              setUsuario={setUsuario}
            />
            {perfis && secretarias && dres && (
              <ModalEditarUsuario
                usuario={usuario}
                setUsuarios={setUsuarios}
                showModal={showModal}
                setShowModal={setShowModal}
                perfis={perfis}
                secretarias={secretarias}
                dres={dres}
              />
            )}
          </div>
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default Permissionamento;
