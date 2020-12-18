import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { Filtro } from "./componentes/Filtro";
// import { TabelaCadastros } from "./componentes/TabelaCadastros";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import "components/Botao/style.scss"
import "./style.scss";
import { Link } from "react-router-dom";

const Cadastros = () => {
  const [cadastros, setCadastros] = useState(null);
  const [dres, setDres] = useState(null);
  const [distritos, setDistritos] = useState(null);
  const [setores, setSetores] = useState(null);

  return (
    <PaginaHeaderSidebar>
      <div className="cadastros">
        <div className="offset-sm-10 col-sm-2 mb-2">
          <Link to="/adm-imoveis">
            <button
              className={`general-button ${BUTTON_STYLE.BLUE} col-12`}
              type='button'
              data-cy="Voltar"
              >
                <i className={`${BUTTON_ICON.ARROW_LEFT} ${"Voltar" && "text-and-icon"}`} />
                Voltar
            </button>
          </Link>
        </div>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Gestão de Cadastros Realizados</h1>
            <Filtro
              setCadastros={setCadastros}
              setDresProps={setDres}
              setDistritosProps={setDistritos}
              setSetoresProps={setSetores}
            />
            {/* <TabelaCadastros
              cadastros={cadastros}
            /> */}
          </div>
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default Cadastros;
