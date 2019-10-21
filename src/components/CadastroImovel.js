import React, { Component } from "react";

import { Form, Field, reduxForm } from "redux-form";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";

import { InputText } from "components/Input/InputText";
import { FileUpload } from "components/Input/FileUpload";
import { fieldCep, fieldTel, fieldCPF_CNPJ } from "helpers/textMask";
import { required, email } from "helpers/fieldValidators";

import { Imovel } from "services/Imovel.service";

const ENTER = 13;

function join_error(errors) {
  let text = "";
  for (let key in errors) {
    const element = errors[key];
    if (!(element instanceof Array)) {
      text += `${join_error(element)} \n`;
    } else {
      text += `${key}: ${element.join(",")} \n`;
    }
  }
  return text;
}

export class CadastroImovel extends Component {
  constructor() {
    super();
    this.state = { imageFile: [] };

    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  onSubmit(values) {
    Imovel.create(values)
      .then(resp => {
        this.resetForm();
        this.messages.show({
          severity: "success",
          summary: "Cadastro Realizado com sucesso",
          detail: "Obrigado pelo cadastro, logo vc recebera mais informações.",
          sticky: true
        });
        console.log(resp);
      })
      .catch(error => {
        let text = "";
        if (typeof error == "object") {
          text = join_error(error);
        } else {
          text = error;
        }
        this.messages.show({
          severity: "error",
          summary: "Erro ao Realizado o cadatro",
          detail: `Detalhes: ${text}`,
          sticky: true
        });
        console.log(error);
      });
  }

  resetForm = () => this.props.reset();

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="p-grid p-fluid">
        <div className="p-col-12">
          <h1>Cadastro de Oferta de Imovel</h1>
        </div>
        <div className="p-col-12">
          <Messages ref={el => (this.messages = el)}></Messages>
        </div>
        <div className="p-col-12">
          <Form
            onSubmit={handleSubmit(this.onSubmit)}
            className="p-grid p-fluid"
            onKeyPress={this.onKeyPress}
          >
            <div className="p-col-6">
              <div className="card card-w-title">
                <h2>Dados do Proponente</h2>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Nome"
                    name="proponente.nome"
                    required
                    validate={required}
                  />
                </div>
                <div className="p-col">
                  <Field
                    customChange={fieldCPF_CNPJ}
                    component={InputText}
                    label="CPF/CNPJ"
                    name="proponente.cpf_cnpj"
                    required
                    validate={required}
                    maxLength="18"
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="E-mail"
                    name="proponente.email"
                    required
                    validate={required && email}
                  />
                </div>
                <div className="p-col">
                  <Field
                    {...fieldTel}
                    component={InputText}
                    label="Telefone"
                    name="proponente.telefone"
                    required
                    validate={required}
                  />
                </div>
              </div>
            </div>
            <div className="p-col-6">
              <div className="card card-w-title">
                <h2>Dados do Proprietário do Imovel</h2>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Nome"
                    name="contato.nome"
                    required
                    validate={required}
                  />
                </div>
                <div className="p-col">
                  <Field
                    customChange={fieldCPF_CNPJ}
                    component={InputText}
                    label="CPF/CNPJ"
                    name="contato.cpf_cnpj"
                    required
                    validate={required}
                    maxLength="18"
                  />
                </div>
                <div className="p-col">
                  <h2>Dados do Imovel</h2>
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Logradouro"
                    name="endereco"
                    required
                    validate={required}
                    helpText="Rua, Nº e Complemento"
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Bairro"
                    name="bairro"
                    required
                    validate={required}
                  />
                </div>

                <div className="p-col">
                  <Field
                    {...fieldCep}
                    component={InputText}
                    label="CEP"
                    name="cep"
                    required
                    validate={required}
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={FileUpload}
                    name="planta"
                    id="planta"
                    accept="file/pdf"
                    className="form-control-file"
                    label="Planta Baixa"
                    required
                    validate={required}
                  />
                </div>
              </div>
            </div>

            <div className="p-col-12 ">
              <div className="p-grid p-fluid">
                <div className="p-col">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={pristine || submitting}
                    onClick={this.resetForm}
                  >
                    Limpar
                  </button>
                </div>
                <div className="p-col-4"></div>
                <div className="p-col-1">
                  <Button
                    label="Enviar"
                    className="p-button-success"
                    disabled={pristine || submitting}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

CadastroImovel = reduxForm({
  // a unique name for the form
  form: "CadastroImovelForm"
})(CadastroImovel);

export default CadastroImovel;
