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

  fetchSuggestions = async (value, endpoint) => {
    let response = await fetch(
      `https://georef.sme.prefeitura.sp.gov.br/v1/${endpoint}?text=${value.trim()}&layers=address&boundary.gid=whosonfirst:locality:101965533`
    );
    let json = await response.json();
    return json.features;
  }

  fetchCep = async (endereco) => {
    const param = endereco.replace(' ', '+');
    let response = await fetch(
      `https://viacep.com.br/ws/SP/Sao%20Paulo/${param}/json/`
    );
    let json = await response.json();
    return json[0].cep;
  }

  fetchSuggestionsSearch = async (value, numberFound) => {
    const labelRegex = /^([^,]+),\s/;
    const features = await this.fetchSuggestions(value, 'search');
    const promises = features.map(async (s) => {
      let { label, housenumber, postalcode, ...rest } = s.properties;
      if (!housenumber && numberFound){
        housenumber = numberFound;
        label = label.replace(labelRegex, `$1 ${numberFound}, `);
      }
      if (!postalcode){
        postalcode = s.properties.street ? await this.fetchCep(s.properties.street) : undefined;
      }
      s.properties = { label, housenumber, postalcode, ...rest };
      return s;
    })
    return await Promise.all(promises);
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length >= 4) {
      const re = /\d+/;
      const execResp = re.exec(value);
      let features;
      if (execResp) {
        const numeroBuscado = execResp[0];
        features = await this.fetchSuggestionsSearch(value, numeroBuscado);
        if (features.length === 0){
          features = await this.fetchSuggestions(value, 'autocomplete');
        }
        //Verifica se pelo menos uma das sugestões tem o número buscado
        let sugestaoBoa;
        features = features.filter((s) => {
          if (s.properties.housenumber === numeroBuscado){
            sugestaoBoa = s;
          } 
          else {
            return s;
          }
        })
        if (!sugestaoBoa){
          const novaSugestao = features[0];
          let { housenumber, label, name, ...rest } = novaSugestao.properties;
          housenumber = numeroBuscado;
          label = label.replace(re, numeroBuscado);
          name = name.replace(re, numeroBuscado);
          sugestaoBoa = {
            ...novaSugestao,
            properties: { housenumber, label, name, ...rest }
          };
        }
        features.unshift(sugestaoBoa);
      }
      else{
        features = await this.fetchSuggestions(value, 'autocomplete');
        if (features.length === 0){
          features = await this.fetchSuggestionsSearch(value);
        }
      }
      this.setState({ suggestions: features });
    }
  };

  suggestionToString = (suggestion) => {
    const { street, housenumber, neighbourhood, postalcode, region, country } = suggestion.properties;
    let value = "";
    if (street){
      value += street;
    } 
    if (street && housenumber){
      value += ` ${housenumber}`;
    }
    value += ", ";
    if (neighbourhood) value += `${neighbourhood}, `;
    if (postalcode) value += `${postalcode}, `;
    if (region) value += `${region}, `;
    if (country) value += country;
    return value;
  }

  getSuggestionValue = suggestion => {
    this.setState({ addressObject: suggestion });
    this.props.onAddressSelected(suggestion);
    return this.suggestionToString(suggestion);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = (suggestion) => {
    return (
      <span>{this.suggestionToString(suggestion)}</span>
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
