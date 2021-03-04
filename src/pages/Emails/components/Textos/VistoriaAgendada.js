import React from "react";
import "./styles.scss";

const VistoriaAgendada = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
        <p>
          Em continuidade as ações referentes ao cadastro de imóvel, <b>protocolo nº {imovel.imovel.protocolo}</b>, conforme dados a seguir, após contato com V.Sa. a vistoria do imóvel foi confirmada para: <b>{imovel.imovel.data_vistoria}</b>.
        </p>
      </div>
    </>
  );
}

export default VistoriaAgendada;
