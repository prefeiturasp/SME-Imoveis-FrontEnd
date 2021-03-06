import React from "react";
import PropTypes from "prop-types";
import "../style.scss";
import { InputErroMensagem } from "components/Input/InputErroMensagem";

export const TextArea = props => {
  const {
    className,
    disabled,
    helpText,
    input,
    label,
    meta,
    maxLength,
    style,
    placeholder,
    required
  } = props;
  return (
    <div className="textarea">
      {label && [
        required && (
          <span key={1} className="required-asterisk">
            *
          </span>
        ),
        <label key={2} htmlFor={input.name} className="col-form-label">
          {label}
        </label>
      ]}
      <textarea
        {...input}
        className={`form-control ${className} ${meta.touched &&
          meta.error &&
          "invalid-field"}`}
        disabled={disabled}
        placeholder={placeholder}
        style={style}
        maxLength={maxLength}
      />
      <div className="help-text">{helpText}</div>
      <InputErroMensagem meta={meta} />
    </div>
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  style: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

TextArea.defaultProps = {
  className: "",
  disabled: false,
  helpText: "",
  input: {},
  label: "",
  meta: {},
  name: "",
  style: {},
  placeholder: "",
  required: false
};
