import React from "react";
import "./style.scss";

export class HelpText extends React.Component {
  render() {
    const { helpText } = this.props;
    return <div className="help-text">{helpText}</div>;
  }
}
