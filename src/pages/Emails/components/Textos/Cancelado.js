import React from "react";
import "./styles.scss";

const Cancelado = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
        <p>
          Em atendimento a solicitação de V.Sa. referente ao cadastro de imóvel, <b>protocolo nº 
            {imovel.imovel.protocolo}</b>, conforme dados a seguir, efetuamos o 
            cancelamento do cadastro na presente data <b>[data_hoje]</b>.
        </p>
        <p>
          Obrigado.
        </p>
      </div>
    </>
  );
}

export default Cancelado;
