import { HelpText } from "components/Input/HelpText";
import { InputErroMensagem } from "components/Input/InputErroMensagem";
import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

export const Select = props => {
  const {
    className,
    labelClassName,
    disabled,
    helpText,
    input,
    label,
    meta,
    name,
    naoDesabilitarPrimeiraOpcao,
    onChange,
    options,
    required,
    width
  } = props;
  return (
    <div className="select">
      {label && [
        required && !disabled && (
          <span key={0} className="required-asterisk">
            *
          </span>
        ),
        <label
          key={1}
          htmlFor={name}
          className={`${labelClassName || "col-form-label"}`}
        >
          {label}
        </label>
      ]}
      <select
        {...input}
        className={`form-control ${className} ${meta &&
          meta.touched &&
          meta.error &&
          "invalid-field"}`}
        disabled={disabled}
        data-cy={label}
        onChange={input ? input.onChange : onChange}
        name={name}
        style={width && { width: width - 12 }}
      >
        {options.map((e, key) => {
          return (
            <option
              key={key}
              value={e.uuid}
              disabled={
                e.disabled || (key === 0 && !naoDesabilitarPrimeiraOpcao)
              }
            >
              {e.nome}
            </option>
          );
        })}
      </select>
      <HelpText helpText={helpText} />
      <InputErroMensagem meta={meta} />
    </div>
  );
};

Select.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string,
      uuid: PropTypes.string,
      disable: PropTypes.bool,
      selected: PropTypes.bool
    })
  ),
  name: PropTypes.string
};
Select.defaultProps = {
  naoDesabilitarPrimeiraOpcao: false,
  options: [{ nome: "Selecione", uuid: "" }],
  disabled: false
};

export default Select;
