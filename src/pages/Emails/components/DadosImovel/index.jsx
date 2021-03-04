import React from "react";
import "./styles.scss";

const DadosImovel = (imovel) => {
  return (
    <div className="title-wrapper">
      <div className="title-content">
        <label className="title">
          Dados do Imóvel
        </label>
      </div>
      <div className="body-wrapper">
        <div className="body-content">
          <label className="body-info">
            Endereço: {imovel.imovel.endereco}
            <br/>
            Número: {imovel.imovel.numero}
            <br/>
            Bairro: {imovel.imovel.bairro}
            <br/>
            CEP: {imovel.imovel.cep}
            <br/>
            Cidade/Estado: {imovel.imovel.cidade} - {imovel.imovel.uf}
            <br/>
            Número do IPTU: {imovel.imovel.numero_iptu}
            <br/>
            Área Construída (m²): {imovel.imovel.area_construida}
            <br/>
          </label>
        </div>
      </div>
    </div>
  )
}

export default DadosImovel