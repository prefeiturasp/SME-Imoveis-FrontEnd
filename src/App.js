import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import CadastroImovel from "./pages/CadastroImovel";

// Style
import "./styles/styles.scss";
import "./App.scss";

import ReactGA from "react-ga";
import { Login } from "pages/Login";
import { SemPermissao } from "pages/SemPermissao";
ReactGA.initialize("UA-153279384-1");
ReactGA.pageview(window.location.pathname + window.location.search);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alterarFonte:
        (localStorage.getItem("alterarFonte") &&
          localStorage.getItem("alterarFonte") === "true") ||
        false,
      alterarContraste:
        (localStorage.getItem("alterarContraste") &&
          localStorage.getItem("alterarContraste") === "true") ||
        false,
      focusBuscaAtributo: false
    };
    this.alterarFonte = this.alterarFonte.bind(this);
    this.alterarContraste = this.alterarContraste.bind(this);
    this.focusBusca = this.focusBusca.bind(this);
  }

  focusBusca() {
    this.setState({ focusBuscaAtributo: true });
  }

  alterarFonte() {
    const alterarFonte =
      localStorage.getItem("alterarFonte") !== null
        ? localStorage.getItem("alterarFonte") !== "true"
        : true;
    localStorage.setItem("alterarFonte", alterarFonte);
    this.setState({ alterarFonte });
  }

  alterarContraste() {
    const alterarContraste =
      localStorage.getItem("alterarContraste") !== null
        ? localStorage.getItem("alterarContraste") !== "true"
        : true;
    localStorage.setItem("alterarContraste", alterarContraste);
    this.setState({ alterarContraste });
  }

  render() {
    const { alterarFonte, alterarContraste, focusBuscaAtributo } = this.state;
    return (
      <div
        className={`${alterarFonte && "fonte-maior"}
          ${alterarContraste && "alto-contraste"}`}
      >
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Home
                {...props}
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
                focusBusca={this.focusBusca}
                focusBuscaAtributo={focusBuscaAtributo}
                esconderLinkBuscaEscola
              />
            )}
          />
          <Route
            path="/cadastro-imovel"
            render={props => (
              <CadastroImovel
                {...props}
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
          <Route
            path="/sem-permissao"
            render={props => (
              <SemPermissao
                {...props}
                alterarFonte={this.alterarFonte}
                alterarContraste={this.alterarContraste}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
