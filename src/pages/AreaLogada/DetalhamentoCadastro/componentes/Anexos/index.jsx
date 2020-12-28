import React, { useState } from "react";
import HTTP_STATUS from "http-status-codes";
import Botao from "components/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Botao/constants";
import { setAnexo, deleteAnexo } from "services/anexos.service";
import { Field } from "react-final-form";
import { toastError, toastSuccess } from "components/Toast/dialogs";
import { getImovel } from "services/Imovel.service";
import InputFile from "components/InputFile";
import { TIPO_DOCUMENTO } from "./constans";

export const Anexos = ({
  cadastro,
  editar,
  setPropsCadastro,
  setPropsErro,
}) => {
  const removerAnexo = async (uuidAnexo) => {
    if (window.confirm("Deseja remover este anexo?")) {
      deleteAnexo(uuidAnexo).then((response) => {
        if (response.status === HTTP_STATUS.NO_CONTENT) {
          toastSuccess("Arquivo removido com sucesso!");
          getImovel(cadastro.id)
            .then((response) => {
              if (response.status === HTTP_STATUS.OK) {
                setPropsCadastro(response.data);
              } else {
                setPropsErro(true);
              }
            })
            .catch(() => {
              setPropsErro(true);
            });
        } else {
          toastError("Erro ao remover arquivo");
        }
      });
    }
  };

  const uploadAnexo = async (e, tipo) => {
    const arquivoAnexo = {
      ...e[0],
      tipo_documento: tipo,
      imovel: cadastro.id,
    };
    setAnexo(arquivoAnexo).then((response) => {
      if (response.status === HTTP_STATUS.CREATED) {
        getImovel(cadastro.id)
          .then((response) => {
            if (response.status === HTTP_STATUS.OK) {
              setPropsCadastro(response.data);
            } else {
              setPropsErro(true);
            }
          })
          .catch(() => {
            setPropsErro(true);
          });
      } else {
        toastError("Erro ao dar upload no arquivo");
      }
    });
  };

  return (
    <>
      <div className="title mb-3">Anexos e relatórios</div>
      <div className="title color-black mb-3">Fotos da fachada</div>
      {cadastro.anexos
        .filter(
          (anexo) => anexo.get_tipo_documento_display === "Fotos da Fachada"
        )
        .map((anexo, key) => {
          return !editar ? (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                texto={`Anexo ${key + 1}`}
                className="mr-3"
              />
            </a>
          ) : (
            <>
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                icon={BUTTON_ICON.TRASH}
                className="br-none"
                onClick={() => removerAnexo(anexo.uuid)}
              />
              <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  type={BUTTON_TYPE.BUTTON}
                  icon={BUTTON_ICON.DOWNLOAD}
                  className="mr-3"
                />
              </a>
            </>
          );
        })}
      {editar && (
        <Field
          component={InputFile}
          className="inputfile"
          texto="Adicionar"
          name="files"
          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
          setFiles={(files) =>
            uploadAnexo(files, TIPO_DOCUMENTO.FOTOS_DA_FACHADA)
          }
          toastSuccess={"Anexo do documento incluído com sucesso!"}
          multiple
        />
      )}
      <div className="title color-black mt-3 mb-3">
        Fotos do ambiente interno
      </div>
      {cadastro.anexos
        .filter(
          (anexo) =>
            anexo.get_tipo_documento_display === "Fotos do Ambiente Interno"
        )
        .map((anexo, key) => {
          return !editar ? (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                texto={`Anexo ${key + 1}`}
                className="mr-3"
              />
            </a>
          ) : (
            <>
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                icon={BUTTON_ICON.TRASH}
                className="br-none"
                onClick={() => removerAnexo(anexo.uuid)}
              />
              <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  type={BUTTON_TYPE.BUTTON}
                  icon={BUTTON_ICON.DOWNLOAD}
                  className="mr-3"
                />
              </a>
            </>
          );
        })}
      {editar && (
        <Field
          component={InputFile}
          className="inputfile"
          texto="Adicionar"
          name="files"
          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
          setFiles={(files) =>
            uploadAnexo(files, TIPO_DOCUMENTO.FOTOS_DO_AMBIENTE_INTERNO)
          }
          toastSuccess={"Anexo do documento incluído com sucesso!"}
          multiple
        />
      )}
      <div className="title color-black mt-3 mb-3">
        Fotos do ambiente externo
      </div>
      {cadastro.anexos
        .filter(
          (anexo) =>
            anexo.get_tipo_documento_display === "Fotos de Área Externa"
        )
        .map((anexo, key) => {
          return !editar ? (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                texto={`Anexo ${key + 1}`}
                className="mr-3"
              />
            </a>
          ) : (
            <>
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                icon={BUTTON_ICON.TRASH}
                className="br-none"
                onClick={() => removerAnexo(anexo.uuid)}
              />
              <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  type={BUTTON_TYPE.BUTTON}
                  icon={BUTTON_ICON.DOWNLOAD}
                  className="mr-3"
                />
              </a>
            </>
          );
        })}
      {editar && (
        <Field
          component={InputFile}
          className="inputfile"
          texto="Adicionar"
          name="files"
          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
          setFiles={(files) =>
            uploadAnexo(files, TIPO_DOCUMENTO.FOTOS_DE_AREA_EXTERNA)
          }
          toastSuccess={"Anexo do documento incluído com sucesso!"}
          multiple
        />
      )}
      <div className="title color-black mt-3 mb-3">
        Certidão de dados cadastrais do imóvel - IPTU
      </div>
      {cadastro.anexos
        .filter(
          (anexo) => anexo.get_tipo_documento_display === "Cópia do IPTU ou ITR"
        )
        .map((anexo, key) => {
          return !editar ? (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                texto={`Anexo ${key + 1}`}
                className="mr-3"
              />
            </a>
          ) : (
            <>
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                icon={BUTTON_ICON.TRASH}
                className="br-none"
                onClick={() => removerAnexo(anexo.uuid)}
              />
              <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  type={BUTTON_TYPE.BUTTON}
                  icon={BUTTON_ICON.DOWNLOAD}
                  className="mr-3"
                />
              </a>
            </>
          );
        })}
      {editar && (
        <Field
          component={InputFile}
          className="inputfile"
          texto="Adicionar"
          name="files"
          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
          setFiles={(files) =>
            uploadAnexo(files, TIPO_DOCUMENTO.COPIA_DO_IPTU_ITR)
          }
          toastSuccess={"Anexo do documento incluído com sucesso!"}
          multiple
        />
      )}
      <div className="title color-black mt-3 mb-3">
        Cópia da planta do imóvel ou croqui
      </div>
      {cadastro.anexos
        .filter(
          (anexo) =>
            anexo.get_tipo_documento_display === "Cópia da Planta ou Croqui"
        )
        .map((anexo, key) => {
          return !editar ? (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                texto={`Anexo ${key + 1}`}
                className="mr-3"
              />
            </a>
          ) : (
            <>
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                icon={BUTTON_ICON.TRASH}
                className="br-none"
                onClick={() => removerAnexo(anexo.uuid)}
              />
              <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  type={BUTTON_TYPE.BUTTON}
                  icon={BUTTON_ICON.DOWNLOAD}
                  className="mr-3"
                />
              </a>
            </>
          );
        })}
      {editar && (
        <Field
          component={InputFile}
          className="inputfile"
          texto="Adicionar"
          name="files"
          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
          setFiles={(files) =>
            uploadAnexo(files, TIPO_DOCUMENTO.COPIA_DE_PLANTA_OU_CROQUI)
          }
          toastSuccess={"Anexo do documento incluído com sucesso!"}
          multiple
        />
      )}
    </>
  );
};
