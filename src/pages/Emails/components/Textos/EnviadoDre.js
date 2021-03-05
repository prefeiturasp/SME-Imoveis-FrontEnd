import React from "react";
import "./styles.scss";

const EnviadoDre = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
        <p>
          Em continuidade as ações referentes ao cadastro de imóvel, <b>protocolo nº {imovel.imovel.protocolo}</b>, conforme dados a seguir, informamos que após o parecer favorável da vistoria, foi encaminhado para o Setor de Parcerias da Diretoria Regional de Educação {imovel.imovel.diretoria_regional_educacao}.
        </p>
        <p>
          Aguarde contato do Gestor de Parcerias para novas orientações.
        </p>
      </div>
    </>
  );
}

export default EnviadoDre;
