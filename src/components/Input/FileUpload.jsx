import React from "react";
import { FileUpload as FileUploadPR } from "primereact/fileupload";

import { InputErroMensagem } from "./InputErroMensagem";
import { HelpText } from "components/HelpText";
import { asyncForEach, readerFile } from "helpers/utils";
import { OverlayTrigger, Popover, Image } from "react-bootstrap";
import imgTooltipQuestion from "img/tooltip-question.svg";
import { toastError } from "components/Toast/dialogs";

import "./FileUpload.scss";

class CustomFileUploadPR extends FileUploadPR {
  async componentDidMount() {
    const { initialFiles } = this.props;
    if (initialFiles) {
      this.setState(
        {
          files: initialFiles
        },
        this.upload
      );
    }
  }
  async upload() {
    const {
      onUploadChange,
      tipoDocumento,
      tipoArquivo,
      customAccept
    } = this.props;
    const { files } = this.state;
    let data = [];

    await asyncForEach(files, async file => {
      if (customAccept && customAccept.includes(file.type)) {
        await readerFile(file).then(v => {
          data.push({
            ...v,
            originalFile: file,
            tipo_documento: tipoDocumento,
            tipo_arquivo: tipoArquivo
          });
        });
      } else {
        toastError("Formato de arquivo inválido, só são permitidos os formatos .pdf e .jpeg");
        const currentFiles = this.state.files.filter(v => {
          return v.name !== file.name;
        });
        this.setState({
          files: currentFiles
        });
      }
    });
    onUploadChange(data);
  }
  async remove(index) {
    this.clearInputElement();

    const currentFiles = this.state.files.filter((v, i) => {
      return i !== index;
    });

    this.setState(
      {
        files: currentFiles
      },
      this.upload
    );
  }
}

export class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = React.createRef();
  }

  onChange(data) {
    const {
      input: { onChange }
    } = this.props;
    if (data) {
      onChange(data);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetarFile && !prevProps.resetarFile) {
      this.fileUpload.current.clear();
      this.props.setResetarFileFalse();
    }
  }

  popover = msg => (
    <Popover id="popover-basic">
      <Popover.Content>{msg}</Popover.Content>
    </Popover>
  );

  render() {
    const {
      input: { value, ...inputProps },
      className,
      id,
      accept,
      disabled,
      esconderAsterisco,
      helpText,
      label,
      labelClassName,
      meta,
      name,
      placeholder,
      required,
      initialFiles,
      title,
      tipoDocumento,
      tipoArquivo,
      tooltipMessage,
      customAccept
    } = this.props;
    return (
      <div className="input input-file-upload">
        {label && [
          required && !esconderAsterisco && (
            <span key={1} className="required-asterisk">
              *
            </span>
          ),
          <label
            key={2}
            htmlFor={name}
            className={`col-form-label ${labelClassName}`}
          >
            {label}
          </label>
        ]}

        {title && [
          <label key={2} htmlFor={name} className={"title"}>
            {title}
          </label>,
          tooltipMessage && (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={this.popover(tooltipMessage)}
            >
              <Image src={imgTooltipQuestion} fluid className="mb-1 ml-1" />
            </OverlayTrigger>
          )
        ]}

        <CustomFileUploadPR
          ref={this.fileUpload}
          disabled={disabled}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          className={`${className} 
             ${meta.touched && meta.error && "invalid-field"}`}
          {...inputProps}
          accept={accept}
          auto={true}
          multiple={true}
          invalidFileSizeMessageSummary={"Erro ao dar upload:"}
          invalidFileSizeMessageDetail={"O tamanho máximo de um arquivo é 15MB"}
          chooseLabel="Selecione os arquivos"
          cancelLabel="Cancelar"
          onUploadChange={this.onChange}
          initialFiles={initialFiles}
          tipoDocumento={tipoDocumento}
          tipoArquivo={tipoArquivo}
          customAccept={customAccept}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
