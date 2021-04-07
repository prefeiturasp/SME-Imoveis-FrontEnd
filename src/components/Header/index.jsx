import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import iconeSair from "img/sair.png";
import logo from "img/Logo.png";
import iconeAjuda from "img/ajuda.svg";
import { ModalAjuda } from "./ModalAjuda";
import "./style.scss";

export const Header = ({toggled}) => {
  const [openAjuda, setOpenAjuda] = useState(false);
  return (
    <div>
      <ModalAjuda
        openAjuda={openAjuda}
        setOpenAjuda={setOpenAjuda}
      />
      <nav className="navbar navbar-expand-lg navbar-light bg-white static-top navbar-sme fixed-top">
        <div className="container-fluid">
          <div className={`nav-bar ${toggled && "toggled"}`}>
            <img src={logo} alt="logo portal de imóveis" />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
  
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="#"
                  onClick={() => setOpenAjuda(true)}
                  className="nav-link"
                >
                  <img src={iconeAjuda} alt="Ícone de ajuda" />
                </Link>
                <p className="title">Ajuda</p>
              </li>
              <li onClick={() => authService.logout()} className="nav-item">
                <Link className="nav-link" to="">
                  <img src={iconeSair} alt="Ícone de logout" />
                </Link>
                <p className="title">Sair</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}  

