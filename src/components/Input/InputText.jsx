import PropTypes from "prop-types";
import React from "react";
import { InputErroMensagem } from "./InputErroMensagem";
import { HelpText } from "components/HelpText";
import { OverlayTrigger, Popover, Image } from "react-bootstrap";
import "./style.scss";
import imgTooltipQuestion from "img/tooltip-question.svg";
export class InputText extends React.Component {
  popover = msg => (
    <Popover id="popover-basic">
      <Popover.Content>{msg}</Popover.Content>
    </Popover>
  );

  render() {
    const {
      className,
      disabled,
      esconderAsterisco,
      helpText,
      input,
      label,
      labelClassName,
      meta,
      min,
      name,
      placeholder,
      required,
      type,
      maxLength,
      customChange,
      autoFocus,
      tooltipMessage
    } = this.props;
    return (
      <div className="input">
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
        <input
          {...input}
          autoFocus={autoFocus}
          className={`form-control ${className} ${meta &&
            meta.touched &&
            (meta.error || meta.warning) &&
            "invalid-field"}`}
          disabled={disabled}
          min={min}
          name={name}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          {...(() => {
            if (customChange) {
              return {
                onChange: e => {
                  input.onChange(customChange(e.target.value));
                }
              };
            } else {
              return {};
            }
          })()}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}

InputText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  esconderAsterisco: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string
};

InputText.defaultProps = {
  className: "",
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
  type: "text"
};
