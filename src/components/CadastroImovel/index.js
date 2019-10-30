import React, { Component } from "react";

import { Form, reduxForm } from "redux-form";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";

import BasePage from "components/Base/BasePage";
import { Imovel as ImovelService } from "services/Imovel.service";

import { Proponente } from "./Proponente";
import { Proprietario } from "./Proprietario";
import { Imovel } from "./Imovel";

// Style PrimeReact
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

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
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  onSubmit(values) {
    const sub_endereco = values.endereco.endereco;
    delete values.endereco.endereco;
    values["endereco"] = { ...values.endereco, ...sub_endereco };

    ImovelService.create(values)
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


  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <BasePage>
        <div id="conteudo" className="w-100 desenvolvimento-escolar">
          <div className="container pt-5 pb-5">
            <div className="row">

              <div className="col-12 mb-4">
                <h1>Cadastro de Oferta de Imóvel</h1>
              </div>
              <div className="col-12">
                <Messages ref={el => (this.messages = el)}></Messages>
              </div>
              <div className="col-12">
                <Form
                  onSubmit={handleSubmit(this.onSubmit)}
                  onKeyPress={this.onKeyPress}
                  className="row"
                >
                  {/* Proponente */}
                  <div className="p-col-12 p-md-6">
                    <Proponente />
                  </div>

                  {/* Proprietário */}
                  <div className="p-col-12 p-md-6">
                    <Proprietario />
                  </div>

                  {/* Imovel */}
                  <div className="p-col-12 p-md-6">
                    <Imovel />
                  </div>

                  {/* Botao */}
                  <div className="p-col-12 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              disabled={pristine || submitting}
                              onClick={this.resetForm}
                            >Limpar</button>
                          </div>
                          <div className="col-6">
                            <Button
                              label="Enviar"
                              disabled={pristine || submitting}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </Form>

              </div>
            </div>
          </div>
        </div>
      </BasePage>
    );
  }
}

CadastroImovel = reduxForm({
  // a unique name for the form
  form: "CadastroImovelForm"
})(CadastroImovel);

export default CadastroImovel;
