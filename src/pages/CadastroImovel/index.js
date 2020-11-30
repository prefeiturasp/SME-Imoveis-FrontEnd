/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import "./styles.scss";
import Wizard from "./Wizard";
import BaseHome from "components/BaseHome";
import Proponente from "./components/Proponente";
import { Imovel } from "./components/Imovel";
import { FormSpy } from "react-final-form";

const onSubmit = async () => {};

const CadastroImovel = () => {
  return (
    <BaseHome>
      <div className="container">
        <Wizard onSubmit={onSubmit}>
          <Wizard.Page>
            <Proponente />
          </Wizard.Page>
          <Wizard.Page>
            <FormSpy>
              {({ form, values }) => <Imovel form={form} values={values} />}
            </FormSpy>
          </Wizard.Page>
          <Wizard.Page>
            <div></div>
          </Wizard.Page>
        </Wizard>
      </div>
    </BaseHome>
  );
};

export default CadastroImovel;
