import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

export class AutoSuggestAddress extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      addressObject: "",
      suggestions: []
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  handleClearInput = () => {
    this.setState({
      value: ""
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.resetarFile && !prevProps.resetarFile) {
      this.handleClearInput();
    }
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length >= 4) {
      const response = await fetch(
        `https://georef.sme.prefeitura.sp.gov.br/v1/autocomplete?text=${value.trim()}&layers=address&boundary.gid=whosonfirst:locality:101965533`
      );
      const json = await response.json();
      this.setState({ suggestions: json.features });
    }
  };

  getSuggestionValue = suggestion => {
    this.setState({ addressObject: suggestion });
    this.props.onAddressSelected(suggestion);
    return `${
      suggestion.properties.street ? suggestion.properties.street + ", " : ""
    }${
      suggestion.properties.housenumber
        ? suggestion.properties.housenumber + ", "
        : ""
    }${
      suggestion.properties.neighbourhood
        ? suggestion.properties.neighbourhood + ", "
        : ""
    }${
      suggestion.properties.postalcode
        ? suggestion.properties.postalcode + ", "
        : ""
    }${
      suggestion.properties.region ? suggestion.properties.region + ", " : ""
    }${
      suggestion.properties.country ? suggestion.properties.country : ""
    }`;
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion(suggestion) {
    return (
      <span>{`${
        suggestion.properties.street ? suggestion.properties.street + ", " : ""
      }${
        suggestion.properties.housenumber
          ? suggestion.properties.housenumber + ", "
          : ""
      }${
        suggestion.properties.neighbourhood
          ? suggestion.properties.neighbourhood + ", "
          : ""
      }${
        suggestion.properties.postalcode
          ? suggestion.properties.postalcode + ", "
          : ""
      }${
        suggestion.properties.region ? suggestion.properties.region + ", " : ""
      }${
        suggestion.properties.country ? suggestion.properties.country : ""
      }`}</span>
    );
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Ex: Rua Doutor Diogo de Faria",
      value,
      type: "search",
      onChange: this.onChange,
      className: `form-control ${this.props.className}`,
      required: this.props.required,
      name: this.props.name,
      onBlur: this.props.onAddressBlur
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
