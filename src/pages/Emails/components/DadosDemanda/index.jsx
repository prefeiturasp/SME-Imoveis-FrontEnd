import React from "react";
import "./styles.scss";

const DadosDemanda = (imovel) => {
  return(
    <>
      <div className="title-wrapper">
        <div className="title-content">
          <label className="title">
            Dados da Demanda {imovel.imovel.data_atualizacao_demanda}
          </label>
        </div>
      </div>
      <div className="body-wrapper">
        <div className="body-content">
          <label className="body-info">
            Berçário I: {imovel.imovel.bercario_i}
            <br/>
            Berçário II: {imovel.imovel.bercario_ii}
            <br/>
            Mini Grupo I: {imovel.imovel.mini_grupo_i}
            <br/>
            Mini Grupo II: {imovel.imovel.mini_grupo_ii}
            <br/>
            Total: {imovel.imovel.demanda_total}
            <br/>
          </label>
        </div>
      </div>
    </>
  )
};

export default DadosDemanda;