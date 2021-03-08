import React from "react";
import "./styles.scss";
import DadosDemanda from "../DadosDemanda"

const DemandaInsuficiente = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
        <p>
          Em resposta ao cadastro de imóvel, <b>protocolo nº {imovel.imovel.protocolo}</b>, conforme dados 
            a seguir, após a atualização da demanda cadastrada para o ano letivo corrente, 
            a localidade não apresenta demanda suficiente para viabilizar a celebração de 
            uma parceria nesse momento, conforme dados a seguir:
        </p>
      </div>
      <DadosDemanda imovel={imovel.imovel}/>
      <div className="textarea-email">
        <p>
          A Secretaria Municipal de Educação – SME prioriza vistorias de imóveis 
            em regiões com alta demanda. Contudo, seu imóvel continuará em nosso banco 
            de dados, e caso, haja necessidade, faremos novo contato oportunamente.
        </p>
      </div>
    </>
  );
}

export default DemandaInsuficiente;
