import React from "react";
import { Field } from "react-final-form";
import { FormSpy } from "react-final-form";
import { FileUpload } from "components/Input/FileUpload";
import { Alert } from "react-bootstrap";
import { required } from "helpers/fieldValidators";
import "./styles.scss";

const Anexos = () => {
  return (
    <FormSpy>
      {({ values }) => (
        <>
          <Field
            name={"limiteTamanhoError"}
            subscribe={{ visited: true, error: true }}
            render={({ meta: { visited, error } }) =>
              error ? (
                <Alert variant="danger" transation={true}>
                  Você ultrapassou o limite de 15MB.
                </Alert>
              ) : null
            }
          />

          <div className="row">
            <div className="col">
              <Field
                component={FileUpload}
                name="anexos_fachada"
                id="anexos_fachada"
                accept=".jpeg, .pdf"
                customAccept={["image/jpeg", "application/pdf"]}
                className="form-control-file"
                tooltipMessage="Extensões permitidas: jpeg e pdf"
                required
                initialFiles={
                  values.anexos_fachada
                    ? values.anexos_fachada.map(anexo => anexo.originalFile)
                    : undefined
                }
                title={"Fotos da fachada"}
                tipoDocumento={0}
                tipoArquivo={1}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <Field
                component={FileUpload}
                name="anexos_ambiente_interno"
                id="anexos_ambiente_interno"
                accept=".jpeg, .pdf"
                customAccept={["image/jpeg", "application/pdf"]}
                tooltipMessage="Extensões permitidas: jpeg e pdf"
                className="form-control-file"
                required
                initialFiles={
                  values.anexos_ambiente_interno
                    ? values.anexos_ambiente_interno.map(
                        anexo => anexo.originalFile
                      )
                    : undefined
                }
                title={"Fotos de ambientes internos"}
                tipoDocumento={1}
                tipoArquivo={1}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Field
                component={FileUpload}
                name="anexos_area_externa"
                id="anexos_area_externa"
                accept=".jpeg, .pdf"
                customAccept={["image/jpeg", "application/pdf"]}
                tooltipMessage="Extensões permitidas: jpeg e pdf"
                className="form-control-file"
                required
                initialFiles={
                  values.anexos_area_externa
                    ? values.anexos_area_externa.map(
                        anexo => anexo.originalFile
                      )
                    : undefined
                }
                title={"Fotos de área externa"}
                tipoDocumento={2}
                tipoArquivo={1}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Field
                component={FileUpload}
                name="anexos_iptu"
                id="anexos_iptu"
                accept=".jpeg, .pdf"
                customAccept={["image/jpeg", "application/pdf"]}
                tooltipMessage="Extensões permitidas: jpeg e pdf"
                className="form-control-file"
                required
                initialFiles={
                  values.anexos_iptu
                    ? values.anexos_iptu.map(anexo => anexo.originalFile)
                    : undefined
                }
                title={"Certidão de Dados Cadastrais do Imóvel - IPTU"}
                tipoDocumento={3}
                tipoArquivo={0}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Field
                component={FileUpload}
                name="anexos_planta"
                id="anexos_planta"
                accept=".jpeg, .pdf"
                customAccept={["image/jpeg", "application/pdf"]}
                tooltipMessage="Extensões permitidas: jpeg e pdf"
                className="form-control-file"
                required
                initialFiles={
                  values.anexos_planta
                    ? values.anexos_planta.map(anexo => anexo.originalFile)
                    : undefined
                }
                title={"Planta do imóvel ou croqui"}
                tipoDocumento={4}
                tipoArquivo={0}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <div className="text-left">
                <Field
                  component={"input"}
                  name="declaracao_responsabilidade"
                  type="checkbox"
                  className="mr-1"
                  validate={required}
                />
                <label className="form-check-label check-align ">
                  * Declaro responsabilidade pelas informações prestadas,
                  estando ciente de que a falsidade implicará nas penalidades
                  cabíveis.
                </label>
                <br />
                <Field
                  name={"declaracao_responsabilidade"}
                  subscribe={{ touched: true, error: true }}
                  render={({ meta: { touched, error } }) =>
                    touched && error ? (
                      <span className="error-message">{error}</span>
                    ) : null
                  }
                />
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Field
                name={"limiteTamanhoError"}
                subscribe={{ touched: true, error: true }}
                render={({ meta: { touched, error } }) =>
                  error ? (
                    <span className="error-message float-right">{error}</span>
                  ) : null
                }
              />
            </div>
          </div>
        </>
      )}
    </FormSpy>
  );
};

export default Anexos;
