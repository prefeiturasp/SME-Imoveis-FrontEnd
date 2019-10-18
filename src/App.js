import React, { Component } from "react";
import classNames from "classnames";
import { Route } from "react-router-dom";
import { AppMenu } from "./components/AppMenu";
import { AppTopbar } from "./components/AppTopbar";
import { Dashboard } from "./components/Dashboard";
import { CadastroImovel } from "./components/CadastroImovel";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./layout/layout.scss";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      staticMenuInactive: false,
      mobileMenuActive: false
    };

    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.createMenu();
  }

  onWrapperClick(event) {
    if (!this.menuClick) {
      this.setState({
        overlayMenuActive: false,
        mobileMenuActive: false
      });
    }

    this.menuClick = false;
  }

  onToggleMenu(event) {
    this.menuClick = true;

    if (this.isDesktop()) {
      this.setState({
        staticMenuInactive: !this.state.staticMenuInactive
      });
    } else {
      const mobileMenuActive = this.state.mobileMenuActive;
      this.setState({
        mobileMenuActive: !mobileMenuActive
      });
    }

    event.preventDefault();
  }

  onSidebarClick(event) {
    this.menuClick = true;
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.setState({
        mobileMenuActive: false
      });
    }
  }

  createMenu() {
    this.menu = [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location = "#/";
        }
      },
      {
        label: "Cadastro de Imoveis",
        icon: "pi pi-fw pi-file",
        to: "/forms"
      }
    ];
  }

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  componentDidUpdate() {
    if (this.state.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  }

  render() {
    const wrapperClass = classNames("layout-wrapper layout-static", {
      "layout-overlay": this.state.layoutMode === "overlay",
      "layout-static-sidebar-inactive": this.state.staticMenuInactive,
      "layout-mobile-sidebar-active": this.state.mobileMenuActive
    });
    return (
      <div className={wrapperClass} onClick={this.onWrapperClick}>
        <AppTopbar onToggleMenu={this.onToggleMenu} />

        <div
          ref={el => (this.sidebar = el)}
          className="layout-sidebar layout-sidebar-light"
          onClick={this.onSidebarClick}
        >
          <div className="layout-logo">
            <img alt="Logo" src="assets/images/logo-sme-branco.svg" />
          </div>
          <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
        </div>
        <div className="layout-main">
          <Route path="/" exact component={Dashboard} />
          <Route path="/forms" exact component={CadastroImovel} />
        </div>
        <div className="layout-mask"></div>
      </div>
    );
  }
}

export default App;
