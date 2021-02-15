import React, { Fragment, useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import logo from "../../img/Logo.png";
import { Form, Field } from "react-final-form";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { Link, useHistory } from "react-router-dom";
import {
  composeValidators,
  required,
  numericInteger,
  semCaracteresEspeciais,
} from "helpers/fieldValidators";
import { InputText } from "components/Input/InputText";
import logoSME from "img/logo-sme.svg";
import authService from "services/auth.service";
import { atualizarEmail, recuperaSenha } from "services/perfil.service";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import { getError } from "helpers/utils";
import { TIPOS_EMAIL_CADASTRO } from "./constants";
import Select from "components/Select";
import "./style.scss";

export const Login = () => {
  const [exibir, setExibir] = useState("login");
  const [width, setWidth] = useState(null);
  const [email, setEmail] = useState(null);

  const emailInput = React.createRef();

  const history = useHistory();

  useEffect(() => {
    if (emailInput.current) {
      const width = emailInput.current.offsetWidth;
      setWidth(width);
    }
  }, [emailInput]);

  const onSubmit = (values) => {
    if (exibir === "set-email") {
      atualizarEmail(values).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Email atualizado com sucesso");
          setTimeout(() => {
            history.push("/sem-permissao");
          }, 1500);
        } else {
          toastError(getError(response.data));
        }
      });
    } else if (exibir === "login") {
      const { login, senha } = values;
      if (login && senha) {
        authService.login(login, senha).then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            if (response.data.perfil) {
              localStorage.setItem("perfil", response.data.perfil.nome);
              localStorage.setItem("nome", response.data.nome);
              window.location.href = "/adm-imoveis";
            } else {
              if (!response.data.email) {
                setExibir("set-email");
              } else {
                history.push("/sem-permissao");
              }
            }
          }
        });
      }
    } else {
      recuperaSenha(values.login)
        .then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            setEmail(response.data.email);
            toastSuccess("E-mail de recuperar senha enviado com sucesso");
          } else {
            toastError(getError(response.data));
          }
        })
        .catch(() => {
          toastError("Erro ao tentar recuperar senha");
        });
    }
  };

  return (
    <div>
      <div className="login-bg" />
      <div className="right-half">
        <div className="container my-auto">
          <div className="logo-sigpae">
            <img src={logo} alt="logo" />
          </div>
          <div className="form">
            <Form
              onSubmit={onSubmit}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  {exibir === "login" && (
                    <Fragment>
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="RF"
                        name="login"
                        placeholder={"Seu RF (somente números)"}
                        required
                        type="text"
                        maxLength="7"
                        tooltipMessage={
                          "Digite seu RF. Para usuários externos, insira seus dados de usuário. Caso não possua, procure a SME"
                        }
                        validate={composeValidators(required, numericInteger)}
                      />
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="Senha"
                        name="senha"
                        placeholder={"******"}
                        required
                        type="password"
                        validate={required}
                      />
                      <Botao
                        className="mt-3 col-12"
                        style={BUTTON_STYLE.BLUE}
                        texto="Acessar"
                        type={BUTTON_TYPE.SUBMIT}
                      />
                    </Fragment>
                  )}
                  {exibir === "set-email" && (
                    <Fragment>
                      Você não possui e-mail cadastrado no CoreSSO. Digite
                      abaixo seu e-mail da SME para atualizá-lo junto ao
                      CoreSSO.
                      <div className="row">
                        <div className="input-group email-sme">
                          <div ref={emailInput} className="col-6">
                            <Field
                              component={InputText}
                              placeholder={"Início do seu E-mail SME"}
                              label="E-mail"
                              name="email"
                              required
                              type="text"
                              validate={composeValidators(
                                required,
                                semCaracteresEspeciais
                              )}
                            />
                          </div>
                          <div className="input-group-append col-6">
                            <Field
                              component={Select}
                              name="tipo_email"
                              options={TIPOS_EMAIL_CADASTRO}
                              naoDesabilitarPrimeiraOpcao
                              width={width}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-group email-sme">
                          <div ref={emailInput} className="col-6">
                            <Field
                              component={InputText}
                              placeholder={"Início do seu E-mail SME"}
                              label="Confirme seu e-mail"
                              name="confirmar_email"
                              required
                              type="text"
                              validate={composeValidators(
                                required,
                                semCaracteresEspeciais
                              )}
                            />
                          </div>
                          <div className="input-group-append col-6">
                            <Field
                              component={Select}
                              name="tipo_email"
                              options={TIPOS_EMAIL_CADASTRO}
                              naoDesabilitarPrimeiraOpcao
                              width={width}
                            />
                          </div>
                        </div>
                      </div>
                      <Botao
                        className="mt-3 col-12"
                        style={BUTTON_STYLE.BLUE}
                        texto="Atualizar e-mail"
                        type={BUTTON_TYPE.SUBMIT}
                        disabled={
                          !values.confirmar_email ||
                          values.confirmar_email !== values.email
                        }
                      />
                    </Fragment>
                  )}
                  {exibir === "esqueci-minha-senha" && (
                    <Fragment>
                      Digite abaixo seu RF para ser enviado um e-mail para
                      recuperar sua senha.
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="RF"
                        name="login"
                        placeholder={"Seu RF (somente números)"}
                        required
                        type="text"
                        maxLength="7"
                        tooltipMessage={
                          "Digite seu RF. Para usuários externos, insira seus dados de usuário. Caso não possua, procure a SME"
                        }
                        validate={composeValidators(required, numericInteger)}
                      />
                      {email && (
                        <div>
                          E-mail de reset de senha enviado para: {email}
                        </div>
                      )}
                      <Botao
                        className="mt-3 col-12"
                        style={BUTTON_STYLE.BLUE}
                        texto="Enviar e-mail"
                        type={BUTTON_TYPE.SUBMIT}
                        disabled={submitting || pristine}
                      />
                    </Fragment>
                  )}
                  {exibir !== "esqueci-minha-senha" && (
                    <p className="text-center pt-3">
                      <Link
                        className="hyperlink"
                        to="#"
                        data-cy="esqueci-senha"
                        onClick={() => setExibir("esqueci-minha-senha")}
                      >
                        Esqueci minha senha
                      </Link>
                    </p>
                  )}
                  {exibir === "esqueci-minha-senha" && (
                    <p className="text-center pt-3">
                      <Link
                        className="hyperlink"
                        to="#"
                        data-cy="esqueci-senha"
                        onClick={() => setExibir("login")}
                      >
                        Login
                      </Link>
                    </p>
                  )}
                </form>
              )}
            />
          </div>
          <div className="logo-prefeitura row">
            <div className="col-12 text-center">
              <img src={logoSME} alt="" />
              <br />
              <span>
                - Sistema homologado para navegadores: Google Chrome e Firefox
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
