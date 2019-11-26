import React, { Component } from "react";
import { Form, reduxForm } from "redux-form";
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
import "../../styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalConfirmacaoCadastro } from "./components/ModalConfirmacaoCadastro";
import { toastError } from "components/Toast/dialogs";

const ENTER = 13;

export class CadastroImovel extends Component {
  constructor() {
    super();
    this.state = {
      imageFile: [],
      AddressSelected: false,
      endereco: "",
      bairro: "",
      selectCEP: [],
      cep: "",
      numero: "",
      resetarFile: false,
      protocolo: null,
      showModal: false,
      labelBotao: "Enviar"
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.setAddressSelected = this.setAddressSelected.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setResetarFileFalse = this.setResetarFileFalse.bind(this);
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  onSubmit(values) {
    const sub_endereco = values.endereco.endereco;
    delete values.endereco.endereco;
    values.endereco.cep = this.state.cep;
    values.endereco.bairro = this.state.bairro;
    values.endereco.numero = this.state.numero;
    values["endereco"] = { ...values.endereco, ...sub_endereco };
    this.setState({ labelBotao: "Aguarde..." });
    ImovelService.create(values)
      .then(resp => {
        this.resetForm();
        this.setState({ showModal: true, protocolo: resp.protocolo, labelBotao: 'Enviar' });
      })
      .catch(error => {
        toastError(`Erro ao efetuar cadastro`);
        this.setState({ labelBotao: "Enviar" });
      });
  }

  resetForm = () => {
    this.setState({
      AddressSelected: false,
      resetarFile: true
    });
    this.props.reset();
  };

  setResetarFileFalse() {
    this.setState({ resetarFile: false });
  }

  setAddressSelected(value, address) {
    this.setState({
      AddressSelected: value,
      cep: address.cep,
      bairro: address.bairro,
      numero: address.numero
    });
  }

  render() {
    const { labelBotao, protocolo, showModal } = this.state;
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <BasePage>
        <ModalConfirmacaoCadastro
          protocolo={protocolo}
          showModal={showModal}
          closeModal={this.closeModal}
        />
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
                  <div className="p-col-12">
                    <Imovel
                      {...this.state}
                      setResetarFileFalse={this.setResetarFileFalse}
                      setAddressSelected={this.setAddressSelected}
                    />
                  </div>

                  {/* Botao */}
                  <div className="botoes">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      disabled={pristine || submitting}
                      onClick={this.resetForm}
                    >
                      Limpar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={pristine || submitting || labelBotao === 'Aguarde...'}
                    >
                      {labelBotao}
                    </button>
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