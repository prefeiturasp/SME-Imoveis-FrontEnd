import React, { Component } from "react";

import { Field } from "redux-form";
import { InputText } from "components/Input/InputText";
import { required } from "helpers/fieldValidators";

import { FileUpload } from "components/Input/FileUpload";
import { SelectText } from "components/Input/SelectText";
import { AutoComplete } from "components/Input/AutoComplete";
import { Card } from "primereact/card";
import API_FILACRECHE from "constants/apiFilaCreche.constants";

export class Imovel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endereco: "",
      bairro: "",
      selectCEP: [],
      cep: "",
    };
    this.grupo = [
      ["1", "Bercario I"],
      ["4", "Bercario II"],
      ["27", "Mini Grupo I"],
      ["28", "Mini grupo II"],
    ]

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.onFetchCEP = this.onFetchCEP.bind(this);
    this.onFetchGrupoCreche = this.onFetchGrupoCreche.bind(this);
  }

  onFetchCEP = dataAddress => {
    const value = dataAddress.endereco
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
        this.grupo.map(item => 
          this.onFetchGrupoCreche(item[0], dataAddress)
        )
      });
  };

  onFetchGrupoCreche(grupo, endereco) {
    const { longitude, latitude } = endereco;
    fetch(`${API_FILACRECHE.demanda_endoint}/${longitude}/${latitude}/${grupo}`)
    .then(response => response.json())
    .then(json => {
      let data = {};
      data[grupo] = json.results.wait
      this.setState( data )
    });
  }

  handleAddressChange(dataAddress) {
    this.onFetchCEP(dataAddress);
    this.setState({
      ...dataAddress
    });
    this.props.setAddressSelected(true);
  }

  render() {
    const { AddressSelected } = this.props;
    const { endereco, bairro } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Dados do Imóvel</h4>

          <div className="row">
            <div className="p-col-12 p-md-6">
              <Field
                component={AutoComplete}
                label="Endereço"
                name="endereco.endereco"
                required
                validate={required}
                handleChange={this.handleAddressChange}
                {...this.props}
              />
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
                component={InputText}
                label="Número do Contribuinte (IPTU)"
                name="endereco.numero_iptu"
              />

              <Field
                component={FileUpload}
                name="planta_fotos"
                id="planta_fotos"
                accept="file/pdf"
                className="form-control-file"
                label="Fotos / Planta Baixa"
                required
                validate={required}
                {...this.props}
              />

            </div>
            <div className="p-col-12 p-md-6">
              {AddressSelected && (<div>
                <Card title="Endereço Selecionado">
                  <b>Endereço:</b> <span>{endereco}</span>
                  <br />
                  <b>Bairro:</b> <span>{bairro}</span>
                  <br />
                  <b>Cidade:</b> <span>São Paulo </span>
                  <b>Estado:</b> <span>SP</span>
                </Card>

                <Card title="Demanda da Região">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Grupo</th>
                        <th scope="col">Fila</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(this.grupo.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item[1]}</td>
                            <td>{this.state[item[0]]}</td>
                          </tr>
                        )
                      })
                      )}
                    </tbody>
                  </table>
                </Card>
              </div>)}
            </div>
          </div>
        
        </div>
      </div>
    );
  }
}
