import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Input/InputText";
import { SelectText } from "components/Input/SelectText";
import { fieldCPF_CNPJ, telCelMask } from "helpers/textMask";
import Wizard from "../../Wizard";
import {
  email,
  required,
  composeValidators,
  telValidate,
  celValidate,
  nameValidate,
  cpfCnpjValidate
} from "helpers/fieldValidators";
import { TIPO_PROPONENTE } from "constants/choices.constants";

const Proponente = () => {
  return (
    <Wizard.Page>
      <div className="title mb-3">Dados do cadastrante</div>
      <div className="row">
        <div className="col-6">
          <Field
            customChange={fieldCPF_CNPJ}
            component={InputText}
            label="CPF/CNPJ"
            name="proponente.cpf_cnpj"
            maxLength="18"
            tooltipMessage={
              "O CPF deverá conter 11 caracteres e ser válido, e o CNPJ deverá conter 14 caracteres e ser válido."
            }
            required
            validate={composeValidators(required, cpfCnpjValidate)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Field
            component={InputText}
            label="Nome Completo"
            name="proponente.nome"
            maxLength="100"
            required
            validate={composeValidators(required, nameValidate)}
            tooltipMessage={
              "Deve ser informado o nome completo (nome e sobrenome)."
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Field
            component={SelectText}
            options={TIPO_PROPONENTE}
            placeholder="Selecione um Tipo"
            label="Tipo"
            name="proponente.tipo"
            tooltipMessage={
              "Proprietário do Imóvel ou Representante legal do imóvel."
            }
            required
            validate={required}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Field
            component={InputText}
            label="E-mail"
            name="proponente.email"
            required
            validate={composeValidators(required, email)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Field
            customChange={telCelMask}
            component={InputText}
            label="Telefone Fixo"
            name="proponente.telefone"
            maxLength="15"
            validate={telValidate}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Field
            customChange={telCelMask}
            component={InputText}
            label="Telefone Celular"
            name="proponente.celular"
            maxLength="15"
            required
            validate={composeValidators(required, celValidate)}
          />
        </div>
      </div>
    </Wizard.Page>
  );
};

export default Proponente;
