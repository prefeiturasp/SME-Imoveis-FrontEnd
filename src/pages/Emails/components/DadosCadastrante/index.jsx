import React from "react";
import "./styles.scss";

const DadosCadastrante = (imovel) => {
  return(
    <>
      <div className="title-wrapper">
        <div className="title-content">
          <label className="title">
            Dados do Cadastrante
          </label>
        </div>
      </div>
      <div className="body-wrapper">
        <div className="body-content">
          <label className="body-info">
            CPF/CNPJ: {imovel.imovel.proponente_cpf_cnpj}
            <br/>
            Nome: {imovel.imovel.proponente_nome}
            <br/>
            Tipo: {imovel.imovel.proponente_tipo}
            <br/>
            E-mail: {imovel.imovel.proponente_email}
            <br/>
            Telefone Fixo: {imovel.imovel.proponente_telefone}
            <br/>
            Telefone Celular: {imovel.imovel.proponente_celular}
            <br/>
          </label>
        </div>
      </div>
    </>
  )
};

export default DadosCadastrante;