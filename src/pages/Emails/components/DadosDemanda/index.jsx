import React from "react";
import "./styles.scss";

const DadosDemanda = (imovel) => {
  return(
    <>
      <div className="title-wrapper">
        <div className="title-content">
          <label className="title">
            Dados da Demanda [data_atualizacao_demanda]
          </label>
        </div>
      </div>
      <div className="body-wrapper">
        <div className="body-content">
          <label className="body-info">
            Berçário I: 
            <br/>
            Berçário II: 
            <br/>
            Mini Grupo I: 
            <br/>
            Mini Grupo II: 
            <br/>
          </label>
        </div>
      </div>
    </>
  )
};

export default DadosDemanda;