import React, { Component } from "react";
import { Link } from "react-router-dom";
import BasePage from "components/Base/BasePage";
import BlocoTexto from "components/BlocoTexto";

import imgSalaAula from "img/sala_aula.png";
import imgMapaSaoPaulo from "img/mapa_soapaulo.png";

export default class Home extends Component {
  render() {
    return (
      <BasePage>
        <div className="w-100 oferta-imoveis position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="col-lg-6 col-sm-12 mt-5">
                <h2>Ajude a aumentar o número de creches em São Paulo</h2>
                <p>
                  Você pode ajudar no aumento do número de creches na cidade
                  disponibilizando o seu imóvel. Veja abaixo quais são os
                  requisitos mínimos e como se cadastrar para a vistoria
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
                    A Secretaria Municipal de Educação está cadastrando imóveis
                    para atendimento de Educação Infantil – Creche. Verifique se
                    seu imóvel atende nossos requisitos:
                    <br />
                    <b>Documentação:</b>IPTU (ou registro do INCRA), registro de
                    imóvel e planta.
                    <br />
                    <b>Condições do imóvel:</b>o prédio precisa ser de alvenaria
                    em bom estado de conservação; com janelas que permitam que
                    ventilação, iluminação natural e visibilidade para ambiente
                    externo; corrimão na altura das crianças e dos adultos; piso
                    lavável, não escorregadio e de fácil limpeza, nas salas de
                    atividade com conforto térmico; as salas devem ter tem
                    minimamente 10,5m²; banheiro amplo para adaptação para
                    fraldário ou instalação de bancadas para troca de fraldas e
                    vasos infantis; espaço destinado para instalação de lactário
                    próximo à cozinha; espaço que possibilite a organização de
                    refeitório; cozinha ampla para instalação de fogão
                    industrial e pia com 2 cubas; espaço para dispensa; depósito
                    de lixo externo; espaço externo para instalação de
                    playground e solário; salas para
                    direção/coordenação/secretaria/sala de professores.
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
                  Ao lado você encontra o mapa de São Paulo com indicações de
                  regiões com mais e menos procura por creches.
                  <br />
                  As regiões em vermelho e amarelo são as que
                </BlocoTexto>
                <BlocoTexto title=" O que acontece depois do cadastro?">
                  Após o envio do cadastro, você receberá um número de protocolo
                  para a identificação e acompanhamento da solicitação.
                  <br />
                  Também será enviado um e-mail da SME confirmando o cadastro e
                  com alguns detalhes do processo: se o imóvel será vistoriado,
                  e que uma Organização da Sociedade Civil entrará em contato
                  para elaboração de plano de adequação do imóvel e tratativas
                  para a locação.
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
