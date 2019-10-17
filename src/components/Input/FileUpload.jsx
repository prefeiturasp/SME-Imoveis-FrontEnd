import React from 'react'
import { InputErroMensagem } from "./InputErroMensagem";
import { HelpText } from "components/HelpText";

export class FileUpload extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    const { input: { onChange } } = this.props
    if (e.target.files[0]) {
      onChange(e.target.files[0])
    }
  }

  render () {
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
    } = this.props
    return (
      <div className="input">
        {label && [
          required && !esconderAsterisco && (
            <span className="required-asterisk">*</span>
          ),
          <label
            key={1}
            htmlFor={name}
            className={`col-form-label ${labelClassName}`}
          >
            {label}
          </label>
        ]}
        <input
          {...inputProps}
          className={`form-control ${className} ${meta.touched &&
            meta.error &&
            "invalid-field"}`}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          required={required}
          type='file'
          onChange={this.onChange}
          id={id}
          accept={accept}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    )
  }
}