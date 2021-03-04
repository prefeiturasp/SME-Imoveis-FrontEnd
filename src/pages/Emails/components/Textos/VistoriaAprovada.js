import React from "react";
import "./styles.scss";

const VistoriaAprovada = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
        <p>
          Em continuidade as ações referentes ao cadastro de imóvel, <b>protocolo nº {imovel.imovel.protocolo}</b>, conforme dados a seguir, informamos que após a vistoria realizada em <b>{imovel.imovel.data_vistoria}</b>, o responsável pela área técnica da Secretaria Municipal de Educação considerou o referido imóvel Aprovado.
        </p>
        <p>
          Agradecemos a disponibilização do imóvel. Aguarde contato da Secretaria Municipal de Educação para novas orientações.
        </p>
      </div>
    </>
  );
}

export default VistoriaAprovada;
