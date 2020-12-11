import React, { Fragment, useState } from "react";
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
} from "helpers/fieldValidators";
import { InputText } from "components/Input/InputText";
import logoSME from "img/logo-sme.svg";
import authService from "services/auth.service";
import { atualizarSenha } from "services/perfil.service";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import { getError } from "helpers/utils";
import "./style.scss";

export const Login = () => {
  const [exibirResetSenha, setExibirResetSenha] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const history = useHistory();

  const onSubmit = (values) => {
    if (values.senha1) {
      atualizarSenha(usuario.id, usuario.token, values).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Senha atualizada com sucesso");
          setTimeout(() => {
            history.push("/adm-fornecedor");
          }, 1500);
        } else {
          toastError(getError(response.data));
        }
      });
    } else {
      const { login, senha } = values;
      if (login && senha) {
        authService.login(login, senha).then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            if (response.data.perfil) {
              localStorage.setItem("perfil", response.data.perfil.nome);
              localStorage.setItem("nome", response.data.nome);
              history.push("/adm-imoveis");
            } else {
              history.push("/sem-permissao");
            }
          }
        });
      }
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
                  {!exibirResetSenha && (
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
                          "Digite seu RF. Para usuários externos, insira seus dados de usuário. Caso não possua, procure a SMEs"
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
                  {exibirResetSenha && (
                    <Fragment>
                      É necessário alterar sua senha para o primeiro acesso.
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="Senha"
                        name="senha1"
                        placeholder={"******"}
                        required
                        type="password"
                        validate={required}
                        pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                        title="Pelo menos 8 caracteres, uma letra e um número"
                        helpText="Pelo menos 8 caracteres, uma letra e um número"
                      />
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="Confirmar senha"
                        name="senha2"
                        placeholder={"******"}
                        required
                        type="password"
                        validate={required}
                      />
                      <Botao
                        className="mt-3 col-12"
                        style={BUTTON_STYLE.BLUE}
                        texto="Resetar senha"
                        type={BUTTON_TYPE.SUBMIT}
                      />
                    </Fragment>
                  )}
                  <p className="text-center pt-3">
                    <Link
                      className="hyperlink"
                      to="#"
                      data-cy="esqueci-senha"
                      onClick={() => history.push("/esqueci-minha-senha")}
                    >
                      Esqueci minha senha
                    </Link>
                  </p>
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
