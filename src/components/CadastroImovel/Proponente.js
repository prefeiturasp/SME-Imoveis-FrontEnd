import React, { Component } from "react";

import { Field } from "redux-form";
import { InputText } from "components/Input/InputText";
import { fieldCPF_CNPJ, fieldTel } from "helpers/textMask";
import { email } from "helpers/fieldValidators";

export class Proponente extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Proponente</h4>
          <Field component={InputText} label="Nome" name="proponente.nome" />
          <Field
            customChange={fieldCPF_CNPJ}
            component={InputText}
            label="CPF/CNPJ"
            name="proponente.cpf_cnpj"
            maxLength="18"
          />
          <Field
            component={InputText}
            label="E-mail"
            name="proponente.email"
            validate={email}
          />
          <Field
            {...fieldTel}
            component={InputText}
            label="Telefone"
            name="proponente.telefone"
          />
        </div>
      </div>
    );
  }
}
