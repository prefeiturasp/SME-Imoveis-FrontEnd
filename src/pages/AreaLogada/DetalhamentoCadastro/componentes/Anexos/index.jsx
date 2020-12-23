import React from "react";
import Botao from "components/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Botao/constants";

export const Anexos = ({ cadastro, editar }) => {
  return (
    <>
      <div className="title mb-3">Anexos e relatórios</div>
      <div className="title color-black mb-3">Fotos da fachada</div>
      {cadastro.anexos
        .filter(
          (anexo) => anexo.get_tipo_documento_display === "Fotos da Fachada"
        )
        .map((anexo, key) => {
          return (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                className="mr-3"
                texto={`Anexo ${key + 1}`}
              />
            </a>
          );
        })}
      <div className="title color-black mt-3 mb-3">
        Fotos do ambiente interno
      </div>
      {cadastro.anexos
        .filter(
          (anexo) =>
            anexo.get_tipo_documento_display === "Fotos do Ambiente Interno"
        )
        .map((anexo, key) => {
          return (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                className="mr-3"
                texto={`Anexo ${key + 1}`}
              />
            </a>
          );
        })}
      <div className="title color-black mt-3 mb-3">
        Fotos do ambiente externo
      </div>
      {cadastro.anexos
        .filter(
          (anexo) =>
            anexo.get_tipo_documento_display === "Fotos de Área Externa"
        )
        .map((anexo, key) => {
          return (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                className="mr-3"
                texto={`Anexo ${key + 1}`}
              />
            </a>
          );
        })}
      <div className="title color-black mt-3 mb-3">
        Certidão de dados cadastrais do imóvel - IPTU
      </div>
      {cadastro.anexos
        .filter(
          (anexo) => anexo.get_tipo_documento_display === "Cópia do IPTU ou ITR"
        )
        .map((anexo, key) => {
          return (
            <a href={anexo.arquivo} target="_blank" rel="noopener noreferrer">
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                texto={`Anexo ${key + 1}`}
                className="mr-3"
              />
            </a>
          );
        })}
      {editar && (
        <Botao
          icon={BUTTON_ICON.PLUS}
          style={BUTTON_STYLE.BLUE}
          texto="Adicionar"
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
              />
              <Botao
                style={BUTTON_STYLE.BLUE_OUTLINE}
                type={BUTTON_TYPE.BUTTON}
                icon={BUTTON_ICON.DOWNLOAD}
                className="mr-3"
              />
            </>
          );
        })}
      {editar && (
        <Botao
          icon={BUTTON_ICON.PLUS}
          style={BUTTON_STYLE.BLUE}
          texto="Adicionar"
        />
      )}
    </>
  );
};
