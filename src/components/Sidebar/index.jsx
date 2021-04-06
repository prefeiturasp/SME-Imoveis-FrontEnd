import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./style.scss";
import "./sb-admin-2.css";
import { EH_PERFIL_ADMIN, getNome, getPerfil } from "helpers/utils";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API_VERSION: null,
    };
  }

  render() {
    const { toggle, toggled } = this.props;
    return (
      <div>
        <div className="mb-5" />
        <ul
          className={`navbar-nav bg-gradiente-sme sidebar sidebar-dark accordion pl-2 pt-5
          ${toggled && "toggled"}`}
          id="accordionSidebar"
        >
          <div className="sidebar-divider my-0" />
          <p onClick={() => toggle()} className="text-right c-pointer">
            <i
              className={
                toggled
                  ? `fas fa-chevron-circle-right`
                  : `fas fa-chevron-circle-left`
              }
            />
          </p>
          <div className="justify-content-center mx-auto align-items-center sidebar-brand-text mx-3 pt-2">
            <div className="nav-item">
              {!toggled && (
                <div className="sidebar-brand-text text-center">
                  <span className="d-none d-lg-inline text-bold text-white small border border-light rounded-pill p-1">
                    {getNome()}
                  </span>
                  <br />
                  <span className="d-none d-lg-inline text-bold text-white small p-1">
                    {getPerfil()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="sidebar-wrapper div-submenu">
            <li className="nav-item">
              <NavLink className={`nav-link collapsed`} to="/adm-imoveis">
                <i className="fas fa-bell" />
                <span>Notificações</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link collapsed`}
                to="#teste"
                data-toggle="collapse"
                data-target="#collapseCadastro"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-user-edit" />
                <span>Cadastros</span>
              </Link>
              <div
                id="collapseCadastro"
                className={`collapse`}
                aria-labelledby="headingConfig"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to="/adm-imoveis/cadastros-realizados"
                  >
                    Cadastros realizados
                  </NavLink>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link collapsed`}
                to="#teste"
                data-toggle="collapse"
                data-target="#collapseRelatorios"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-file" />
                <span>Relatórios</span>
              </Link>
              <div
                id="collapseRelatorios"
                className={`collapse`}
                aria-labelledby="headingConfig"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to="/adm-imoveis/cadastros-realizados"
                  >
                    Relatórios Gerenciais
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to="/adm-imoveis/relatorio-por-status"
                  >
                    Cadastros de imóveis por Status
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to="/adm-imoveis/relatorio-demanda-territorial"
                  >
                    Cadastros por Demanda Territorial
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to="/adm-imoveis/relatorio-area-construida"
                  >
                    Cadastros por Área Construída
                  </NavLink>
                </div>
              </div>
            </li>
            {EH_PERFIL_ADMIN && (
              <li className="nav-item">
                <Link
                  className={`nav-link collapsed`}
                  to="#teste"
                  data-toggle="collapse"
                  data-target="#collapseConfig"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i className="fas fa-cog" />
                  <span>Gestão</span>
                </Link>
                <div
                  id="collapseConfig"
                  className={`collapse`}
                  aria-labelledby="headingConfig"
                  data-parent="#accordionSidebar"
                >
                  <div className="bg-white py-2 collapse-inner rounded">
                    <NavLink
                      activeClassName="active"
                      className="collapse-item"
                      to="/adm-imoveis/permissionamento"
                    >
                      Permissionamento
                    </NavLink>
                  </div>
                </div>
              </li>
            )}
          </div>
          {!toggled && (
            <div className="text-center page-footer mt-auto justify-content-center mb-3 pb-2">
              <p>
                SME-SP-SGA - Distribuído sob <br />a Licença AGPL V3
              </p>
              <div className="sidebar-wrapper">
                <div className="text-center mx-auto justify-content-center p-2">
                  <span className="text-bold text-white small">API: 0.0.1</span>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
