import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import CorreiosService from "../../../services/Correios.service";

export class AutoSuggestAddress extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      addressObject: "",
      suggestions: [],
      loading: false,
      tentativasViaCep: 0
    };
    this.correiosService = new CorreiosService();
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

  fetchSuggestions = async (value, endpoint) => {
    let response = await fetch(
      `https://georef.sme.prefeitura.sp.gov.br/v1/${endpoint}?text=${value.trim()}&layers=address&boundary.gid=whosonfirst:locality:101965533`
    );
    let json = await response.json();
    return json.features;
  };

  fetchSuggestionsSearch = async (value, numberFound) => {
    const suggestions = await this.fetchSuggestions(value, "search");
    const promises = suggestions.filter(s => {
      let { housenumber, street, ...rest } = s.properties;
      if (!street) return s;
      if (!housenumber && numberFound) {
        housenumber = numberFound;
      }
      s.properties = { housenumber, street, ...rest };
      return s;
    });
    return await Promise.all(promises);
  };

  onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length >= 4) {
      this.setState({
        loading: true
      });
      const execResp = /\d+/.exec(value);
      let suggestions;
      if (execResp) {
        const numeroBuscado = execResp[0];
        suggestions = await this.fetchSuggestionsSearch(value, numeroBuscado);
        if (suggestions.length === 0) {
          suggestions = await this.fetchSuggestions(value, "autocomplete");
        }
        if (suggestions.length !== 0) {
          //Verifica se pelo menos uma das sugestões tem o número buscado
          let sugestaoBoa;
          suggestions = suggestions.filter(s => {
            if (s.properties.housenumber === numeroBuscado) {
              sugestaoBoa = s;
              return s;
            } else {
              return s;
            }
          });
          if (suggestions.length > 0 && !sugestaoBoa) {
            const novaSugestao = suggestions[0];
            let { housenumber, label, name, ...rest } = novaSugestao.properties;
            housenumber = numeroBuscado;
            label = label.replace(/\d+/, numeroBuscado);
            name = name.replace(/\d+/, numeroBuscado);
            sugestaoBoa = {
              ...novaSugestao,
              properties: { housenumber, label, name, ...rest }
            };
          }
          suggestions.unshift(sugestaoBoa);
        }
      } else {
        suggestions = await this.fetchSuggestions(value, "autocomplete");
        if (suggestions.length === 0) {
          suggestions = await this.fetchSuggestionsSearch(value);
        }
      }
      if (this.state.tentativasViaCep < 3) {
        const promises = suggestions.map(async s => {
          let { postalcode, neighbourhood, ...rest } = s.properties;
          let info;
          try {
            info = await this.correiosService.buscaInfo(
              s.properties.street,
              s.properties.housenumber
            );
          } catch (e) {
            console.error("Viacep provavelmente está fora do ar");
            console.error(e);
            this.setState({
              tentativasViaCep: this.state.tentativasViaCep + 1
            });
            return s;
          }
          postalcode = info.cep;
          neighbourhood = info.bairro;
          s.properties = { postalcode, neighbourhood, ...rest };
          return s;
        });
        suggestions = await Promise.all(promises);
      }
      this.setState({ suggestions, loading: false });
    }
  };

  suggestionToString = suggestion => {
    const {
      street,
      housenumber,
      neighbourhood,
      postalcode,
      region,
      country
    } = suggestion.properties;
    let value = "";
    if (street) {
      value += street;
    }
    if (street && housenumber) {
      value += ` ${housenumber}`;
    }
    value += ", ";
    if (neighbourhood) value += `${neighbourhood}, `;
    if (postalcode) value += `${postalcode}, `;
    if (region) value += `${region}, `;
    if (country) value += country;
    return value;
  };

  getSuggestionValue = suggestion => {
    if (this.state.loading) return;
    this.setState({ addressObject: suggestion });
    this.props.onAddressSelected(suggestion);
    return this.suggestionToString(suggestion);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = suggestion => {
    if (this.state.loading) {
      return <span>Carregando...</span>;
    }
    return <span>{this.suggestionToString(suggestion)}</span>;
  };

  render() {
    const { value, suggestions, loading } = this.state;
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
      <div>
        <Autosuggest
          suggestions={loading ? [] : suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        {loading ? <span>Carregando...</span> : ""}
      </div>
    );
  }
}
