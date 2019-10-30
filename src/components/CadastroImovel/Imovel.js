import React, { Component } from "react";

import { Field } from "redux-form";
import { InputText } from "components/Input/InputText";
import { required } from "helpers/fieldValidators";

import { FileUpload } from "components/Input/FileUpload";
import { SelectText } from "components/Input/SelectText";
import { AutoComplete } from "components/Input/AutoComplete";
import { Card } from "primereact/card";

export class Imovel extends Component {
  constructor() {
    super();
    this.state = {
      AddressSelected: false,
      endereco: "",
      bairro: "",
      selectCEP: [],
      cep: ""
    };

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.onFetchCEP = this.onFetchCEP.bind(this);
  }
  onFetchCEP = value => {
    value = value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase()
      .trim();
    fetch(`https://viacep.com.br/ws/SP/sao%20paulo/${value}/json`)
      .then(response => response.json())
      .then(json => {
        const data = json.map(data => {
          return {
            value: data.cep,
            label: `${data.cep} - ${data.logradouro} ${data.complemento}`
          };
        });

        this.setState({ selectCEP: data });
      });
  };

  handleAddressChange(dataAddress) {
    this.onFetchCEP(dataAddress.endereco);
    this.setState({
      AddressSelected: true,
      ...dataAddress
    });
  }

  render() {
    const { AddressSelected, endereco, bairro } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Dados do Imóvel</h4>
          <Field
            component={AutoComplete}
            label="Endereço"
            name="endereco.endereco"
            required
            validate={required}
            handleChange={this.handleAddressChange}
          />
          <div>
            {AddressSelected && (
              <Card title="Endereço Selecionado">
                <b>Endereço:</b> <span>{endereco}</span>
                <br />
                <b>Bairro:</b> <span>{bairro}</span>
                <br />
                <b>Cidade:</b> <span>São Paulo </span>
                <b>Estado:</b> <span>SP</span>
              </Card>
            )}
          </div>
          <Field
            component={SelectText}
            options={this.state.selectCEP}
            onChange={event => this.setState({ cep: event.value })}
            placeholder="Selecione um CEP"
            label="CEP"
            name="endereco.cep"
            required
            validate={required}
          />

          <div className="row">
            <div className="col-4">
              <Field
                component={InputText}
                label="Nº"
                name="endereco.numero"
                required
                validate={required}
              />
            </div>
            <div className="col-8">
              <Field
                component={InputText}
                label="Complemento"
                name="endereco.complemento"
              />
            </div>
          </div>

          <Field
            component={FileUpload}
            name="planta_fotos"
            id="planta_fotos"
            accept="file/pdf"
            className="form-control-file"
            label="Fotos / Planta Baixa"
            required
            validate={required}
          />
        </div>
      </div>
    );
  }
}
