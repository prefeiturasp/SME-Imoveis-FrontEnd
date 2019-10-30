import React, { Component } from "react";

import Menu from "../MenuSuperior/Menu";
import Rodape from "../Rodape/Rodape";

export default class BasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (document.querySelector(".conteudo")){
      document.querySelector(".conteudo").style.marginTop =
        document.querySelector(".busca-escolas").clientHeight / 2 / 2 + "px";
    }
  }

  render() {
    return (
      <div>
        <Menu {...this.props} />

        {this.props.children}

        <Rodape />
      </div>
    );
  }
}
