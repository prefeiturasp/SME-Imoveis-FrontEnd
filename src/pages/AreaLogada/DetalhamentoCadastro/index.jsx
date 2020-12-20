import React, { useState, useEffect } from "react";
import { FluxoDeStatus } from "components/FluxoDeStatus";
import { fluxoImoveis } from "components/FluxoDeStatus/helper";
import { getImovel } from "services/Imovel.service";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import "./style.scss";

export const DetalhamentoCadastro = () => {
  const [cadastro, setCadastro] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getImovel(uuid).then((response) => {
        setCadastro(response.data);
      });
    }
  }, []);

  return (
    <PaginaHeaderSidebar>
      <div className="card detalhamento-cadastro">
        <div className="card-body">
          <h1 className="card-title">Detalhamento de Cadastro</h1>
          {!cadastro && <div>Carregando...</div>}
          {cadastro && (
            <>
              <FluxoDeStatus
                listaDeStatus={cadastro.logs}
                fluxo={fluxoImoveis}
              />
              <div className="atualizar-status mr-3">Atualizar status</div>
            </>
          )}
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};
