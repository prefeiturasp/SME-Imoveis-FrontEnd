import React from "react";
import logoEducacao from "img/Logo_Educacao.png";

const Footer = () => {
  return (
    <div align="center" bgcolor="FFFFFF">
      <div className="footer-text" width="600" height="40" bgcolor="#ffffff" align="center">
        <label>
          Agradecemos o contato.
        </label>
      </div>
      <a href="https://dev-imoveis.sme.prefeitura.sp.gov.br/" target="_blank" rel="noopener noreferrer">
        <img alt="" src={logoEducacao} width="auto" height="auto" />
      </a>
    </div>
  )
};

export default Footer;