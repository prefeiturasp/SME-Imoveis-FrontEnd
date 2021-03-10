import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./style.scss";

export default class Menu extends Component {
  constructor() {
    super();
    this.abrirNovaJanela = this.abrirNovaJanela.bind(this);
  }

  abrirNovaJanela(path) {
    window.open(path, 'NewButtonWindowName','width=2000,height=800,scrollbars=yes')
  }
  render() {
    const { esconderLinkBuscaEscola } = this.props;
    return (
      <div>
        <div className="header-acessibilidade">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="#conteudo">
                      Ir ao Conteúdo<span className="span-accesskey">1</span>{" "}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#menu-principal">
                      Ir para menu principal
                      <span className="span-accesskey">2</span>{" "}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#rodape">
                      Ir para o rodapé
                      <span className="span-accesskey">3</span>{" "}
                    </a>
                  </li>
                </ul>
              </div>
              {/*(<div className="col-6 text-right">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="https://educacao.sme.prefeitura.sp.gov.br/acessibilidade/">
                      Acessibilidade<span className="span-accesskey">5</span>{" "}
                    </a>
                  </li>
                  <li onClick={alterarContraste} className="list-inline-item">
                    Alternar Alto Contraste
                    <FontAwesomeIcon icon={faAdjust} />
                  </li>
                  <li onClick={alterarFonte} className="list-inline-item">
                    Alternar Tamanho da Fonte
                    <FontAwesomeIcon icon={faTextHeight} />
                  </li>
                </ul>
              </div>*/}
            </div>
          </div>
        </div>
        <div className="pref-menu">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-start justify-content-center">
                <ul className="list-inline mt-3">
                  <li className="list-inline-item">
                    <a className="links-nova-janela" onClick={() => this.abrirNovaJanela("https://educacao.sme.prefeitura.sp.gov.br")}>
                      Acesso ao Portal da SME
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="links-nova-janela" onClick={() => this.abrirNovaJanela("http://transparencia.prefeitura.sp.gov.br/acesso-a-informacao/Paginas/default.aspx")}>
                      Acesso à informação e-sic
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="links-nova-janela" onClick={() => this.abrirNovaJanela("https://www.prefeitura.sp.gov.br/cidade/secretarias/ouvidoria/fale_com_a_ouvidoria/index.php?p=464")}>
                      Ouvidoria
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="links-nova-janela" onClick={() => this.abrirNovaJanela("http://dados.prefeitura.sp.gov.br/organization/educacao1")}>
                      Portal da Transparência
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="links-nova-janela" onClick={() => this.abrirNovaJanela("https://sp156.prefeitura.sp.gov.br/portal/servicos")}>
                      SP 156
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-xs-12 d-flex justify-content-lg-end justify-content-center">
                <ul className="list-inline my-auto">
                  <li className="list-inline-item">
                    <a className="links-nova-janela" onClick={() => this.abrirNovaJanela("https://www.facebook.com/EducaPrefSP/")}>
                      <FontAwesomeIcon size="2x" icon={faFacebookSquare} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="links-nova-janela" onClick={() => this.abrirNovaJanela("https://www.instagram.com/educaprefsp/")}>
                      <FontAwesomeIcon size="2x" icon={faInstagram} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="links-nova-janela" onClick={() => this.abrirNovaJanela("https://www.youtube.com/c/EducaPrefSP")}>
                      <FontAwesomeIcon size="2x" icon={faYoutube} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-4 mb-4">
            <div className="col-lg-4 col-sm-12">
              <h1 className="m-0">
                <a href="https://educacao.sme.prefeitura.sp.gov.br/">
                  <img src={logo} alt="Escola Aberta" className="img-fluid" />
                </a>
              </h1>
            </div>
            <div className="offset-lg-6 col-lg-2 col-sm-12">
              <img src='https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2019/06/Logo_Educacao.png' alt="Logo SME" className="img-fluid logo-sme"></img>
            </div>
            <div
              id="menu-principal"
              className="offset-lg-4 col-lg-8 col-sm-12 d-flex links-menu align-items-end justify-content-lg-end justify-content-center pr-lg-0 mb-xs-4"
            >
              <ul className="nav nav-tabs">
                {(window.location.pathname !== '/' )&& (
                  <li className="nav-item">
                    <Link className="nav-link text-secondary mb-1 pb-0" to="/">
                      Página Inicial
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary mb-1 pb-0"
                    href="/cadastro-imovel"
                  >
                    Cadastro de Imóvel
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary mb-1 pb-0"
                    href="/consulta-imovel"
                  >
                    Acompanhamento de Protocolo
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary mb-1 pb-0"
                    href="/login"
                  >
                    Área Restrita
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
