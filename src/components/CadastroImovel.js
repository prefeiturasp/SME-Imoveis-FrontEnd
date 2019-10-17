import React, { Component } from "react";

import { Form, Field, reduxForm } from "redux-form";
import { Button } from "primereact/button";
import { InputText } from "components/Input/InputText";
import { FileUpload } from "components/Input/FileUpload";

import { Imovel } from "services/Imovel.service";

const ENTER = 13;
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
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  }

  resetForm = () => this.props.reset();

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="p-grid p-fluid">
        <div className="p-col-12">
          <h1>Cadastro de Oferta de Imovel</h1>
        </div>
        <div className="p-col-12">
          <Form onSubmit={handleSubmit(this.onSubmit)}
            className="p-grid p-fluid"
            onKeyPress={this.onKeyPress}
          >
            <div className="p-col-6">
              <div className="card card-w-title">
                <h2>Dados de Contato</h2>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Nome"
                    name="contato.name"
                    required
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="E-mail"
                    name="contato.email"
                    required
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Telefone"
                    name="contato.telephone"
                    required
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Celular"
                    name="contato.cellphone"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="p-col-6">
              <div className="card card-w-title">
                <h2>Dados do Imovel</h2>

                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Logradouro"
                    name="address"
                    required
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Bairro"
                    name="neighborhood"
                    required
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Cidade"
                    name="city"
                    required
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="Estado"
                    name="state"
                    required
                  />
                </div>
                <div className="p-col">
                  <Field
                    component={InputText}
                    label="CEP"
                    name="cep"
                    required
                  />
                </div>
                <div className="p-col">
                  <label className="col-form-label">Planta Baixa</label>
                  <div className="custom-file nput-group">
                    <Field
                      type='file'
                      component={FileUpload}
                      name='planta'
                      id='planta'
                      accept='file/*'
                      className="custom-file-input" 
                    />
                    <label className="custom-file-label">Selecione o Arquivo</label>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="p-col-1">
              <Button label="Enviar" type="submit" />
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
