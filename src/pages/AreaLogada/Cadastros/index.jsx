import React, { useState } from "react";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { Filtro } from "./componentes/Filtro";
import { Link } from "react-router-dom";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import { TabelaCadastros } from "./componentes/TabelaCadastros";
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
