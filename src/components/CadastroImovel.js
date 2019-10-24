import React, { Component } from "react";

import { Form, Field, reduxForm } from "redux-form";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { Card } from "primereact/card";

import { InputText } from "components/Input/InputText";
import { FileUpload } from "components/Input/FileUpload";
import { SelectText } from "components/Input/SelectText";
import { AutoComplete } from "components/Input/AutoComplete";

import { fieldTel, fieldCPF_CNPJ } from "helpers/textMask";
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
    this.state = {
      imageFile: [],
      AddressSelected: false,
      endereco: "",
      bairro: "",
      selectCEP: [],
      cep: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.onFetchCEP = this.onFetchCEP.bind(this);
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
      })
      .catch(error => {
        let text = "";
        if (typeof error == "object") {
          try {
            text = join_error(error);
          } catch (e) {
            text = error.toString();
            console.log(e);
          }
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

  resetForm = () => {
    this.setState({
      AddressSelected: false
    });
    this.props.reset();
  };

  onFetchCEP = value => {
    fetch(`https://viacep.com.br/ws/SP/São%20Paulo/${value.trim()}/json`)
      .then(response => response.json())
      .then(json => {
        const data = json.map(data => {
          return {
            value: data.cep,
            label: `${data.cep} - ${data.logradouro} ${data.complemento}`
          };
        });

        this.setState({ selectCEP: data });
      });
  };

  handleAddressChange(dataAddress) {
    this.onFetchCEP(dataAddress.endereco);
    this.setState({
      AddressSelected: true,
      ...dataAddress
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { AddressSelected, endereco, bairro } = this.state;
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
                    component={AutoComplete}
                    label="Endereço"
                    name="endereco"
                    required
                    validate={required}
                    handleChange={this.handleAddressChange}
                  />

                  {AddressSelected && (
                    <Card title="Endereço Selecionado">
                      <b>Endereço:</b> <span>{endereco}</span>
                      <br />
                      <b>Bairro:</b> <span>{bairro}</span>
                      <br />
                      <b>Cidade:</b> <span>São Paulo </span>
                      <b>Estado:</b> <span>SP</span>
                    </Card>
                  )}
                </div>

                <div className="p-col">
                  <Field
                    component={SelectText}
                    options={this.state.selectCEP}
                    onChange={event => this.setState({ cep: event.value })}
                    placeholder="Selecione um CEP"
                    label="CEP"
                    name="endereco.cep"
                    required
                    validate={required}
                  />
                </div>

                <div className="p-col">
                  <div className="p-grid p-fluid">
                    <div className="p-col-4">
                      <Field
                        component={InputText}
                        label="Nº"
                        name="endereco.numero"
                        required
                        validate={required}
                      />
                    </div>
                    <div className="p-col-8">
                      <Field
                        component={InputText}
                        label="Complemento"
                        name="endereco.complemento"
                      />
                    </div>
                  </div>
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
