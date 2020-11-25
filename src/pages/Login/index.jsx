import React, { Fragment, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { Link, useHistory } from "react-router-dom";
import {
  composeValidators,
  required,
  somenteNumeros,
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
      const { rf, password } = values;
      if (rf && password) {
        authService.login(rf, password).then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            setUsuario(response.data);
            localStorage.setItem("status", response.data.proponente.status);
            localStorage.setItem(
              "razao_social",
              response.data.proponente.razao_social
            );
            localStorage.setItem("cnpj", response.data.proponente.cnpj);
            localStorage.setItem("uuid", response.data.proponente.uuid);
            if (!response.data.last_login) {
              setExibirResetSenha(true);
            } else {
              history.push("/adm-fornecedor");
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
          <div className="logo-sigpae">Login - Admin do Portal de Imóveis</div>
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
                        name="username"
                        placeholder={"Seu RF (somente números)"}
                        required
                        type="text"
                        maxLength="7"
                        validate={composeValidators(required, somenteNumeros)}
                      />
                      <Field
                        component={InputText}
                        esconderAsterisco
                        label="Senha"
                        name="password"
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
                  <p className="mt-3 text-center">
                    <Link
                      className="hyperlink"
                      to="#"
                      data-cy="esqueci-senha"
                      onClick={() => history.push("/esqueci-minha-senha")}
                    >
                      Primeiro acesso
                    </Link>
                  </p>
                  <p className="text-center">
                    <Link
                      className="hyperlink"
                      to="#"
                      data-cy="esqueci-senha"
                      onClick={() => history.push("/esqueci-minha-senha")}
                    >
                      Esqueci meu usuário
                    </Link>
                  </p>
                  <p className="text-center">
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
