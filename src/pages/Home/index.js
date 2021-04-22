import React, { Component } from "react";
import BaseHome from "components/BaseHome";
import BlocoTexto from "components/BlocoTexto";

import listaDeSubdistritos from "files/lista_de_subdistritos.pdf";
import imgSalaAula from "img/05.jpg";

export default class Home extends Component {
  constructor() {
    super();
    this.irParaFormulario = this.irParaFormulario.bind(this);
    this.openSubdistritos = this.openSubdistritos.bind(this);
    this.orientaçãoNormativa = this.orientaçãoNormativa.bind(this);
  }

  irParaFormulario() {
    window.open(`/cadastro-imovel`, 'NewButtonWindowName','width=2000,height=800,scrollbars=yes')
  }

  openSubdistritos() {
    window.open(listaDeSubdistritos, 'NewButtonWindowName','width=2000,height=800,scrollbars=yes')
  }

  orientaçãoNormativa() {
    const path = "http://portal.sme.prefeitura.sp.gov.br/Portals/1/Files/35746.pdf"
    window.open(path, 'NewButtonWindowName','width=2000,height=800,scrollbars=yes')
  }

  render() {
    return (
      <BaseHome>
        <div className="w-100 oferta-imoveis position-relative">
          <div className="container conteudo">
            <div className="row">
              <div className="col-12">
                <h1>
                  O que é o Cadastro de Imóveis?
                </h1>
                <p>
                  O Cadastro de Imóveis tem por objetivo formar um banco de imóveis disponíveis para
                  locação para fins de implantação de Centro de Educação Infantil - CEI.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="conteudo" className="w-100">
          <div className="duvidas mt-5 mb-5">
            <div className="col-12">
              <h1>
                Quem pode realizar cadastro?
              </h1>
              <p>Os proprietários ou seus respresentantes legais interessados na locação de imóveis para fins educacionais.</p>
            </div>
          </div>
        </div>
        <div className="w-100 demanda-regioes position-relative">
          <div className="conteudo justify-conteudo">
            <div className="offset-lg-2 col-lg-8 offset-xl-2 col-xl-8 col-sm-12 ">
              <h1>
                Qual região precisamos dos imóveis?
              </h1>
              <p>
                Todas as regiões da cidade de São Paulo podem ter imóveis cadastrados para 
                possível implantação e/ou substituição de Centro de Educação Infantil - CEI
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 home">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-12">
                <h1>Quais os requisitos para o Cadastro de Imóvel?</h1>                
              </div>
              <div className="col-lg-12 requisitos">
                <BlocoTexto>
                  <div className="text-center">
                    Condições básicas do imóvel: prédio de alvenaria, com no mínimo 200m², 
                    bem ventilado, que receba iluminação natural, banheiros com possibilidade de 
                    adaptação para fraldário/vasos sanitários infantis, cozinha ampla, com espaço 
                    para refeitório e despensa, espaço externo para instalação de playground e 
                    solário. Clique a seguir e veja todas as condições necessárias. {""}
                    <a
                      className="link-orientacao"
                      onClick={this.orientaçãoNormativa}
                    >
                      Orientação
                      Normativa Nº 01/2015
                    </a>
                  </div>
                </BlocoTexto>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 necessidades position-relative">
          <div className="conteudo justify-conteudo">
            <div className="offset-lg-2 col-lg-8 offset-xl-2 col-xl-8 col-sm-12 ">
              <h1>
                Detalhamento após o Cadastro de Imóvel?
              </h1>
              <p>
                O interessado receberá um número de protocolo para identificação da
                solicitação. A área técnica da Secretaria Municipal de Educação
                analisará previamente as condições do imóvel e entrará em contato 
                oportunamente.
              </p>
            </div>
          </div>
        </div>
        <div className="w-100 cadastro">
          <div className="container">
            <div className="row blue-wrapper">
              <div className="col-6">
                <div className="conteudo ajuda">
                  <label>
                    Dúvidas? Entre em contato conosco através
                    do email: <b>imoveis@sme.prefeitura.sp.gov.br</b>
                  </label>
                </div>
              </div>
              <div className="col-6">
                <button
                  onClick={this.irParaFormulario}
                  className="botao-cadastro"
                >Cadastrar Imóvel</button>
              </div>
            </div>
          </div>
        </div>
      </BaseHome>
    );
  }
}
