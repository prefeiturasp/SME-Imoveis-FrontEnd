import React, { Component } from "react";

import Menu from "../MenuSuperior/Menu";
import Rodape from "../Rodape/Rodape";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import arrowUp from "img/up-arrow.png";

export default class BasePage extends Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    return (
      <div>
        <Menu {...this.props} />

        {this.props.children}
        <a onClick={this.scrollToTop} className="button-to-top">
          <img src={arrowUp}></img>
        </a>
        <Rodape />
      </div>
    );
  }
}
