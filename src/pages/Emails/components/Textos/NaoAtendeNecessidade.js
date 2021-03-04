import React from "react";
import "./styles.scss";

const NaoAtendeNecessidade = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
        <p>
          O imóvel de <b>protocolo nº {imovel.imovel.protocolo}</b>, conforme dados a seguir, está cadastrado no banco de dados do Cadastro de Imóveis, porém no momento não atende às necessidades para implantação de Centro de Educação Infantil.
        </p>
      </div>
    </>
  );
}

export default NaoAtendeNecessidade;
