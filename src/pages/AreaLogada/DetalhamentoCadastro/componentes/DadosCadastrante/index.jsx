import { InputText } from "components/Input/InputText";
import { SelectText } from "components/Input/SelectText";
import { TIPO_PROPONENTE } from "constants/choices.constants";
import {
  celValidate,
  composeValidators,
  cpfCnpjValidate,
  nameValidate,
  telValidate,
} from "helpers/fieldValidators";
import { fieldCPF_CNPJ, telCelMask } from "helpers/textMask";
import React from "react";
import { Field } from "react-final-form";

export const DadosCadastrante = ({ editar }) => {
  return (
    <>
      <div className="title mb-3">Dados do cadastrante</div>
      <div className="row">
        <div className="col-8">
          <Field
            component={InputText}
            label="Nome"
            name="proponente.nome"
            type="text"
            validate={composeValidators(nameValidate)}
            labelClassName="font-weight-bold color-black"
            disabled={!editar}
          />
        </div>
        <div className="col-4">
          <Field
            component={SelectText}
            options={TIPO_PROPONENTE}
            placeholder="Selecione um Tipo"
            label="Tipo"
            labelClassName="font-weight-bold color-black"
            name="proponente.tipo_proponente"
            disabled={!editar}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <Field
            customChange={fieldCPF_CNPJ}
            component={InputText}
            esconderAsterisco
            label="CPF/CNPJ"
            name="proponente.cpf_cnpj"
            maxLength="18"
            labelClassName="font-weight-bold color-black"
            validate={composeValidators(cpfCnpjValidate)}
            disabled={!editar}
          />
        </div>
        <div className="col-3">
          <Field
            component={InputText}
            label="E-mail"
            name="proponente.email"
            type="text"
            labelClassName="font-weight-bold color-black"
            disabled={!editar}
          />
        </div>
        <div className="col-3">
          <Field
            customChange={telCelMask}
            component={InputText}
            label="Telefone fixo"
            name="proponente.telefone"
            maxLength="15"
            labelClassName="font-weight-bold color-black"
            validate={telValidate}
            disabled={!editar}
          />
        </div>
        <div className="col-3">
          <Field
            customChange={telCelMask}
            component={InputText}
            label="Telefone móvel"
            name="proponente.celular"
            maxLength="15"
            labelClassName="font-weight-bold color-black"
            validate={composeValidators(celValidate)}
            disabled={!editar}
          />
        </div>
      </div>
    </>
  );
};
