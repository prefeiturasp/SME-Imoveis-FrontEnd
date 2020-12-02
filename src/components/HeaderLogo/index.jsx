import React, { Component } from "react";
import logo from "../../img/Logo.png";
import "./style.scss";

export class HeaderLogo extends Component {
  render() {
    return (
      <div className="header-logo">
        <img src={logo} alt="" />
      </div>
    );
  }
}
