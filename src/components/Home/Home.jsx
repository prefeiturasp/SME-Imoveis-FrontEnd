import React, { Component } from "react";
import { Link } from "react-router-dom";
import BasePage from "components/Base/BasePage";
import BlocoTexto from "components/BlocoTexto";

import listaDeSubdistritos from "files/lista_de_subdistritos.pdf";
import imgSalaAula from "img/02.jpg";
import imgMapaSaoPaulo from "img/03.jpg";

export default class Home extends Component {
  render() {
    return (
      <BasePage>
        <div className="w-100 oferta-imoveis position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="col-lg-6 col-sm-12 mt-5">
                <h2>Venha contribuir com a ampliação de vagas de creche em São Paulo!</h2>
                <p>
                Seu imóvel pode ser adaptado para atendimento de creche mantida 
                por uma Organização da Sociedade Civil. Veja abaixo os requisitos 
                mínimos e como se cadastrar.
                </p>
                <Link className="btn btn-primary pl-4 pr-4" to="/form">
                  Cadastrar imóvel
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div id="conteudo" className="w-100 home">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-5 mt-5 pt-3 mb-lg-0">
                <img
                  src={imgSalaAula}
                  alt="Acompanhamento no desenvolvimento escolar"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-lg-6">
                <BlocoTexto title="O que é necessário?">
                  <div className="justify-content-lg-end justify-content-center">
                  <b>Condições básicas do imóvel:</b> prédio de alvenaria, bem ventilado, que 
                  receba iluminação natural, banheiros com possibilidade de adaptação para 
                  fraldário/vasos infantis, cozinha ampla, com espaço para refeitório e 
                  dispensa, espaço externo para instalação de playground e solário.
                  <a href="http://portal.sme.prefeitura.sp.gov.br/Portals/1/Files/35746.pdf" download> Clique aqui</a> e veja abaixo todas as condições necessárias 
                  (link da Orientação Normativa Nº 01/2015).
                  </div>
                </BlocoTexto>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 cidade-precisa">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12 mb-4 mb-lg-0">
                <BlocoTexto title="Aonde a cidade precisa de novas creches?">
                  Todas as regiões da cidade podem ter imóveis cadastrados, 
                  a Secretaria Municipal de Educação analisará todas as solicitações. 
                  As regiões com maior necessidade estão destacadas na tabela.
                </BlocoTexto>
                <a href={listaDeSubdistritos} className="btn btn-primary" download>Mapa da Demanda</a>
                <BlocoTexto title=" O que acontece depois do cadastro?">
                Você receberá um número de protocolo para identificação da solicitação.
                No prazo de 30 dias um novo email será enviado com o resultado da análise
                 da área técnica quanto a possibilidade de vistoria no imóvel.
                </BlocoTexto>
              </div>
              <div className="col-lg-6 col-sm-12 mt-5 mb-5 d-flex justify-content-lg-end justify-content-center">
                <img
                  src={imgMapaSaoPaulo}
                  alt="Mapa de São Paulo"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 sociedade-governo text-white text-center">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-lg-12 mb-4 mb-lg-0">
                <h2 className="mb-4">
                  Clique no botão abaixo e cadastre um imóvel
                </h2>
                <p className="mb-0">
                  <Link className="btn btn-primary pl-4 pr-4" to="/form">
                    Cadastrar imóvel
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </BasePage>
    );
  }
}
