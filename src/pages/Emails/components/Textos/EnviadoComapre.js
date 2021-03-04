import React from "react";
import "./styles.scss";

const EnviadoComapre = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
        <p>
         Em continuidade as ações referentes ao cadastro de imóvel, <b>protocolo nº {imovel.imovel.protocolo}</b>, conforme dados a seguir, informamos que foi encaminhado ao setor responsável (SME/COMAPRE) para <b>agendamento de vistoria</b>.
        </p>
        <p>
          Aguarde contato do Engenheiro/Arquiteto para a realização da vistoria no imóvel.
        </p>
      </div>
    </>
  );
}

export default EnviadoComapre;
