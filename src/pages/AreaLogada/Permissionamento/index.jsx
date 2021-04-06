import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { useHistory } from "react-router-dom";
import { TabelaUsuarios } from "./componentes/TabelaUsuarios";
import { Filtro } from "./componentes/Filtro";
import { ModalEditarUsuario } from "./componentes/ModalEditarUsuario";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import "./style.scss";

const Permissionamento = () => {
  const [usuarios, setUsuarios] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [secretarias, setSecretarias] = useState(null);
  const [perfis, setPerfis] = useState(null);
  const [dres, setDres] = useState(null);
  const history = useHistory();

  return (
    <PaginaHeaderSidebar>
      <Breadcrumb className='breadcrumb-bootstrap'>
        <Breadcrumb.Item href="/adm-imoveis"><i className="fas fa-home"></i>Home</Breadcrumb.Item>
        <Breadcrumb.Item active href="/adm-imoveis/permissionamento">
          Permissionamento
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
