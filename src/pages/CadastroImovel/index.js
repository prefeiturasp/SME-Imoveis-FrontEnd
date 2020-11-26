/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./styles.scss";
import Wizard from "./Wizard";
import BaseHome from "components/BaseHome";
import Proponente from "./components/Proponente";

const onSubmit = async () => {};

const CadastroImovel = () => (
  <BaseHome>
    <Wizard onSubmit={onSubmit}>
      <Wizard.Page>
        <Proponente />
      </Wizard.Page>
      <Wizard.Page></Wizard.Page>
      <Wizard.Page></Wizard.Page>
    </Wizard>
  </BaseHome>
);

export default CadastroImovel;
