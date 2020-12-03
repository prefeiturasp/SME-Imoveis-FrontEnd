import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import { createPersistDecorator } from "final-form-persist";
import { Button, Alert } from "react-bootstrap";

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {},
      showAlert: false
    };
  }
  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));

  previous = values =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
      values: values
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = values => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
    }
  };

  checkPersistExpire = (isPersisted, clear) => {
    const now = moment();
    if (isPersisted) {
      const persistExpire = localStorage.getItem("cadastroImovelPersistExpire");
      if (persistExpire) {
        const persistExpireDate = moment(persistExpire);
        const hours = now.diff(persistExpireDate, "hours");
        if (hours > 0) {
          clear();
          localStorage.removeItem("cadastroImovelPersistExpire");
        }
      } else {
        localStorage.setItem("cadastroImovelPersistExpire", now);
      }
    }
  };

  showFirstPageAlert = values => {
    if (!values.proponente) this.setState({ showAlert: true });
    else if (!values.proponente.email) this.setState({ showAlert: true });
    else if (!values.proponente.nome) this.setState({ showAlert: true });
    else if (!values.proponente.cpf_cnpj) this.setState({ showAlert: true });
    else if (!values.proponente.tipo) this.setState({ showAlert: true });
    else if (!values.proponente.celular) this.setState({ showAlert: true });
    else this.setState({ showAlert: false });
  };

  showSecondPageAlert = values => {
    if (!values.cep) this.setState({ showAlert: true });
    else if (!values.bairro) this.setState({ showAlert: true });
    else if (!values.endereco) this.setState({ showAlert: true });
    else if (!values.numero) this.setState({ showAlert: true });
    else if (!values.cidade) this.setState({ showAlert: true });
    else if (!values.uf) this.setState({ showAlert: true });
    else if (!values.area_construida) this.setState({ showAlert: true });
    else if (!values.nao_possui_iptu) {
      if (!values.iptu) this.setState({ showAlert: true });
    } else this.setState({ showAlert: false });
  };

  showAlertPage = values => {
    const { page } = this.state;
    if (page === 0) this.showFirstPageAlert(values);
    if (page === 1) this.showSecondPageAlert(values);
  };

  render() {
    const { children } = this.props;
    const { page, values, showAlert } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    const { persistDecorator, clear, isPersisted } = createPersistDecorator({
      name: "cadastroImovelPersist",
      debounceTime: 500,
      whitelist: [],
      blacklist: [
        "anexos_fachada",
        "anexos_ambiente_interno",
        "anexos_area_externa",
        "anexos_iptu",
        "anexos_planta"
      ]
    });
    this.checkPersistExpire(isPersisted(), clear);
    return (
      <div id="conteudo" className="w-100 cadastro-imovel mb-5">
        <div className="container">
          <div className="row mt-5 mb-4">
            <h1>Cadastrar Imóvel</h1>
          </div>
          <div className="tabs pb-5">
            <div className="row">
              <div className={`tab col ${page === 0 ? "active" : "inactive"}`}>
                Dados cadastrante
              </div>
              <div
                className={`tab col ${page === 1 ? "active" : "inactive"} ml-2`}
              >
                Dados do imóvel
              </div>
              <div
                className={`tab col ${page === 2 ? "active" : "inactive"} ml-2`}
              >
                Anexos
              </div>
            </div>
          </div>

          <Form
            decorators={[persistDecorator]}
            initialValues={values}
            validate={this.validate}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit}>
                <Alert
                  show={showAlert}
                  onClose={() => this.setState({ showAlert: false })}
                  variant="info"
                  transation={true}
                  dismissible
                >
                  Os campos obrigatórios não foram preenchidos, favor preencher.
                </Alert>
                {activePage}
                <div className="row mt-5">
                  <div className="col">
                    {isLastPage && (
                      <Button
                        type="submit"
                        variant="primary"
                        className="ml-3 float-right"
                        disabled={submitting}
                        onClick={() => clear()}
                      >
                        Enviar Cadastro
                      </Button>
                    )}
                    {!isLastPage && (
                      <Button
                        type="submit"
                        variant="primary"
                        className="ml-3 float-right"
                        onClick={() => this.showAlertPage(values)}
                      >
                        Avançar »
                      </Button>
                    )}

                    {page > 0 && (
                      <Button
                        type="button"
                        variant="outline-primary"
                        className="ml-3 float-right"
                        onClick={() => this.previous(values)}
                      >
                        « Voltar
                      </Button>
                    )}
                  </div>
                </div>
                {this.checkPersistExpire(isPersisted(), clear)}
              </form>
            )}
          </Form>
        </div>
      </div>
    );
  }
}
