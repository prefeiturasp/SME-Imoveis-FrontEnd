import PropTypes from "prop-types";
import React, { Component } from "react";
import { readerFile } from "./helper";
import { DEZ_MB } from "./constants";
import { toastError, toastSuccess } from "components/Toast/dialogs";
import "./style.scss";
import Botao from "components/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Botao/constants";
import { truncarString } from "helpers/utils";
import { HelpText } from "components/Input/HelpText";
import { InputErroMensagem } from "components/Input/InputErroMensagem";

export class InputFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  openFile(file) {
    if (file.nome.includes(".doc")) {
      const link = document.createElement("a");
      link.href = file.base64;
      link.download = file.nome;
      link.click();
    } else {
      let pdfWindow = window.open("");
      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='" + file.base64 + "'></iframe>"
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.submitted !== prevProps.submitted) {
      this.setState({ files: [] });
    }
  }

  deleteFile(index) {
    let files = this.state.files;
    files.splice(index, 1);
    this.props.removeFile(index);
    this.setState({ files });
  }

  async onInputChange(event) {
    let valido = true;
    const QUANTIDADE_ARQUIVOS = event.target.files.length;
    Array.from(event.target.files).forEach((file) => {
      const extensao = file.name.split(".")[file.name.split(".").length - 1];
      if (
        !["doc", "docx", "png", "pdf", "jpg", "jpeg"].includes(
          extensao.toLowerCase()
        )
      ) {
        toastError(`Extensão do arquivo não suportada: ${extensao}`);
        valido = false;
      } else if (file.size > DEZ_MB) {
        toastError(`Tamanho máximo: 10MB`);
        valido = false;
      }
    });
    if (valido) {
      let files = [];
      let data = [];
      Array.from(event.target.files).forEach((file) => {
        readerFile(file)
          .then((anexo) => {
            data.push(anexo);
            files.push({
              nome: this.props.nomeNovoArquivo || file.name,
              base64: anexo.arquivo,
            });
          })
          .then(() => {
            if (files.length === QUANTIDADE_ARQUIVOS) {
              toastSuccess(
                this.props.toastSuccess || "Anexo(s) incluso(s) com sucesso"
              );
              if (this.props.concatenarNovosArquivos) {
                const allFiles = this.state.files.concat(files);
                this.props.setFiles(allFiles);
                this.setState({ files: allFiles });
              } else {
                this.props.setFiles(data);
                this.setState({ files });
              }
            }
          });
      });
    }
  }

  render() {
    const { files } = this.state;
    const {
      accept,
      className,
      disabled,
      helpText,
      icone,
      input,
      meta,
      multiple,
      name,
      required,
      title,
      texto,
    } = this.props;
    return (
      <span className={`input input-file ${icone && "icon"}`}>
        <input
          {...input}
          accept={accept}
          ref={(i) => (this.inputRef = i)}
          className={`form-control ${className} ${meta &&
            meta.touched &&
            (meta.error || meta.warning) &&
            "invalid-field"}`}
          disabled={disabled}
          name={name}
          onChange={(event) => this.onInputChange(event)}
          data-cy={input.name}
          required={required}
          type="file"
          multiple={multiple}
          title={title}
        />
        <Botao
          onClick={() => this.inputRef.click()}
          htmlFor={name}
          texto={texto}
          style={BUTTON_STYLE.BLUE_OUTLINE}
          icon={BUTTON_ICON.PLUS}
          type={BUTTON_TYPE.BUTTON}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </span>
    );
  }
}

InputFile.propTypes = {
  className: PropTypes.string,
  concatenarNovosArquivos: PropTypes.bool,
  disabled: PropTypes.bool,
  esconderAsterisco: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  nomeNovoArquivo: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

InputFile.defaultProps = {
  className: "",
  concatenarNovosArquivos: false,
  disabled: false,
  esconderAsterisco: false,
  helpText: "",
  input: {},
  label: "",
  labelClassName: "",
  meta: {},
  name: "",
  placeholder: "",
  required: false,
  type: "text",
};

export default InputFile;
