import React, { Component } from "react";

import Menu from "../MenuSuperior/Menu";
import Rodape from "../Rodape/Rodape";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default class BasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
