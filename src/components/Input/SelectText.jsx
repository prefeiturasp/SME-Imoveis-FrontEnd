import PropTypes from "prop-types";
import React from "react";
import { InputErroMensagem } from "./InputErroMensagem";
import { HelpText } from "components/HelpText";
import { Dropdown } from "primereact/dropdown";
import imgTooltipQuestion from "img/tooltip-question.svg";
import { OverlayTrigger, Popover, Image } from "react-bootstrap";
import "./style.scss";

export class SelectText extends React.Component {
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
      options,
      name,
      placeholder,
      required,
      tooltipMessage
    } = this.props;
    return (
      <div className="input">
        {label && [
          required && !esconderAsterisco && (
            <span key={2} className="required-asterisk">
              *
            </span>
          ),
          <label
            key={1}
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
        <Dropdown
          {...input}
          options={options}
          autoWidth={false}
          className={`${className} ${meta.touched &&
            meta.error &&
            "invalid-field"}`}
          disabled={disabled}
          placeholder={placeholder}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
SelectText.propTypes = {
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
  type: PropTypes.string,
  options: PropTypes.array
};

SelectText.defaultProps = {
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
  type: "text",
  options: []
};
