import HTTP_STATUS from "http-status-codes";
import React from "react";
import { Form, Field } from "react-final-form";
import { toastSuccess, toastError } from "../../components/Toast/dialogs";
import { HeaderLogo } from "components/HeaderLogo";
import { InputText } from "components/Input/InputText";
import { required } from "helpers/fieldValidators";
import Botao from "components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "components/Botao/constants";
import { atualizarSenha } from "services/perfil.service";
import { getError } from "helpers/utils";

export const RecuperarSenha = () => {
  const onSubmit = (payLoad) => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const confirmationKey = urlParams.get("confirmationKey");
    atualizarSenha(uuid, confirmationKey, payLoad)
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Senha atualizada com sucesso!");
          setTimeout(function() {
            window.location.href = "/login";
          }, 1000);
        } else {
          toastError(getError(response.data));
        }
      })
      .catch(() => {
        toastError("Erro ao atualizar a senha");
      });
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <HeaderLogo />
          <div className="container pt-3">
            <div className="card">
              <div className="card-body alinha-centro">
                <div className="">
                  <div className="card-title font-weight-bold">
                    Troca de senha
                  </div>
                  <Field
                    component={InputText}
                    label="Senha:"
                    required
                    name="senha1"
                    type="password"
                    validate={required}
                    maxlength={20}
                    pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                    title="Pelo menos 8 caracteres, uma letra e um número"
                    helpText="Pelo menos 8 caracteres, uma letra e um número"
                  />
                  <Field
                    component={InputText}
                    label="Repetir senha:"
                    required
                    name="senha2"
                    type="password"
                    validate={required}
                    maxlength={20}
                    helpText={"As senhas devem ser iguais"}
                    pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                    title="Pelo menos 8 caracteres, uma letra e um número"
                  />
                  <div className="pt-3 text-center">
                    <Botao
                      texto="Confirmar senha"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      disabled={values.senha1 !== values.senha2 || pristine}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    />
  );
};
