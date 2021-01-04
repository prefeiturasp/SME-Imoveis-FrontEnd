import React, { useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field } from "react-final-form";
import { InputText } from "components/Input/InputText";
import formatStringByPattern from "format-string-by-pattern";
import { FormSpy } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { iptuMask } from "helpers/textMask";
import {
  composeValidators,
  required,
  validaCEP,
} from "helpers/fieldValidators";
import { toastError } from "components/Toast/dialogs";
import { getEnderecoPorCEP } from "services/cep.service";
import { ESTADOS } from "./constants";
import { SelectText } from "components/Input/SelectText";
import { TextArea } from "components/TextArea/TextArea";
import { georef } from "services/step2.service";

const Imovel = () => {
  const [apiFora, setApiFora] = useState(false);
  return (
    <FormSpy>
      {({ form, values }) => (
        <>
          <div className="title mb-3">Dados do imóvel</div>
          <Field component="input" name="latitude" hidden />
          <Field component="input" name="longitude" hidden />
          <div className="row">
            <div className="col-sm-6 col-12">
              <Field
                component={InputText}
                parse={formatStringByPattern("12345-678")}
                label="CEP"
                name="cep"
                required
                validate={composeValidators(required, validaCEP)}
                placeholder="Digite o CEP"
              />
              <OnChange name="cep">
                {async (value, previous) => {
                  if (value.length === 9) {
                    const response = await getEnderecoPorCEP(value);
                    if (response.status === HTTP_STATUS.OK) {
                      if (response.data.resultado === "0") {
                        toastError("CEP não encontrado");
                        form.change("endereco", "");
                        form.change("bairro", "");
                      } else if (
                        response.data.uf !== "SP" ||
                        response.data.cidade !== "São Paulo"
                      ) {
                        toastError("CEP não é do município de São Paulo");
                        form.change("endereco", "");
                      } else {
                        form.change(
                          "endereco",
                          response.data.tipo_logradouro +
                            " " +
                            response.data.logradouro.split(",")[0]
                        );
                        form.change("cidade", response.data.cidade);
                        form.change("uf", response.data.uf);
                        form.change("bairro", response.data.bairro);
                      }
                    } else {
                      setApiFora(true);
                    }
                  }
                }}
              </OnChange>
            </div>
            <div className="col-sm-6 col-12">
              <Field
                component={InputText}
                label="Bairro"
                name="bairro"
                required
                disabled={!apiFora}
                validate={required}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-12">
              <Field
                component={InputText}
                label="Endereço"
                name="endereco"
                required
                disabled={!apiFora}
                validate={required}
              />
            </div>
            <div className="col-sm-2 col-12">
              <Field
                component={InputText}
                maxlength={255}
                label="Número"
                name="numero"
                required
                validate={composeValidators(required)}
              />
              <OnChange name="numero">
                {async (value, previous) => {
                  if (value) {
                    const response = await georef(
                      values.endereco + " " + value
                    );
                    form.change(
                      "longitude",
                      response.data.features[0].geometry.coordinates[0]
                    );
                    form.change(
                      "latitude",
                      response.data.features[0].geometry.coordinates[1]
                    );
                  }
                }}
              </OnChange>
            </div>
            <div className="col-sm-4 col-12">
              <Field
                component={InputText}
                maxlength={20}
                label="Complemento"
                name="complemento"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-10 col-12">
              <Field
                component={InputText}
                maxlength={100}
                label="Cidade"
                name="cidade"
                disabled={!apiFora}
                required
                validate={required}
              />
            </div>
            <div className="col-sm-2 col-12">
              <Field
                component={SelectText}
                name="uf"
                label="UF"
                options={ESTADOS}
                disabled={!apiFora}
                required
                validate={required}
                naoDesabilitarPrimeiraOpcao
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                component={InputText}
                customChange={iptuMask}
                label="Número do IPTU"
                name="numero_iptu"
                required={!values.nao_possui_iptu ? true : false}
                disabled={values.nao_possui_iptu}
                tooltipMessage={"Número de IPTU do imóvel."}
                placeholder="Digite o Número do IPTU"
              />
            </div>
            <div className="col-6">
              <Field
                component={InputText}
                label="Área construída (m²)"
                type="number"
                name="area_construida"
                required
                tooltipMessage={"Área construída do imóvel em m²."}
                validate={composeValidators(required)}
                placeholder="Digite a Área construída do imóvel"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <Field
                component={"input"}
                name="nao_possui_iptu"
                className="form-check-input"
                type="checkbox"
              />
              <OnChange name="nao_possui_iptu">
                {async (value, previous) => {
                  if (value) {
                    values.numero_iptu = undefined;
                  }
                }}
              </OnChange>
              <label className="form-check-label">Imóvel não tem IPTU</label>
            </div>
          </div>
          {values.nao_possui_iptu && (
            <Field
              component={TextArea}
              label="Campo para preenchimento do ITR (Imposto Territorial Rural) ou Observações"
              name="observacoes"
              required
              validate={composeValidators(required)}
              placeholder="Por que o imóvel não possui IPTU?"
            />
          )}
        </>
      )}
    </FormSpy>
  );
};

export default Imovel;
