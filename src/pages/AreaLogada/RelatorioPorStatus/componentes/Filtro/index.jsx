import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getOpcoesStatus, normalizaOpcoesAnos, formataPayloadFiltros } from "../../helper"
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import Botao from "components/Botao";
import { getAnos, filtrar } from "services/relatorios.service";
import "./style.scss";

import { Form } from "react-final-form";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const Filtro = ({
  filtros,
  setFiltros,
  setResultado,
  setCarregando,
}) => {
  
  const [opcoesAnos, setOpcoesAnos] = useState([{ label: "Selecione os anos", value: undefined }])
  const [opcoesStatus] = useState(getOpcoesStatus)

  useEffect(() => {
    getAnos()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setOpcoesAnos(normalizaOpcoesAnos(response.data));
        }
      })
      .catch(() => {
        console.log("Problema ao buscar anos")
      });
  }, []);

  const onSubmit = async () => {
    setCarregando(true);
    const params = formataPayloadFiltros(filtros);
    filtrar(params, '/cadastro-imovel/imoveis/filtrar-por-status/')
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setResultado(response.data);
          setCarregando(false);
        }
      })
      .catch(() => {
        console.log("Problema ao filtrar")
      });
  };

  const changeAno = (event) => {
    var anos = []
    var todos = opcoesAnos.map((opcao) => opcao.value)
                            .filter((value) => value !== undefined && value !== "todos")
    if (event.target.value.includes("todos")) {
      anos = todos
      if (todos.length === (event.target.value.length - 1)){
        anos = []
      }
    } else {
      anos = event.target.value.filter((value) => value !== undefined)
    }
    setFiltros({
      ...filtros,
      anos: anos,
    });
  };

  const changeStatus = (event) => {
    var status = []
    var todos = opcoesStatus.map((opcao) => opcao.value)
                            .filter((value) => value !== undefined && value !== "todos")
    if (event.target.value.includes("todos")) {
      status = todos
      if (todos.length === (event.target.value.length - 1)){
        status = []
      }
    } else {
      status = event.target.value.filter((value) => value !== undefined)
    }
    setFiltros({
      ...filtros,
      status: status,
    });
  };

  const limpar = () => {
    setFiltros({status: [], anos: []});
    setResultado(null);
  }

  return (
    <div className="filtro">
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, form, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
              <InputLabel>Ano</InputLabel>
                <FormControl variant="outlined">
                  <Select
                    id="demo-simple-select-outlined"
                    multiple
                    className='selectFiltros'
                    value={filtros['anos']}
                    onChange={changeAno}
                  >
                    { opcoesAnos.map((opcao, index)=>{
                      return (
                        <MenuItem
                          key={index}
                          value={opcao['value']}
                        >
                          {opcao['label']}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                <InputLabel>Status</InputLabel>
                <FormControl variant="outlined">
                  <Select
                    id="demo-simple-select-outlined"
                    multiple
                    className='selectFiltros'
                    value={filtros['status']}
                    onChange={changeStatus}
                  >
                    { opcoesStatus.map((opcao, index)=>{
                      return (
                        <MenuItem
                          key={index}
                          value={opcao['value']}
                        >
                          {opcao['label']}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="alinhar-botao offset-md-2 offset-lg-2 offset-xl-2 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <Botao
                  type={BUTTON_TYPE.BUTTON}
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  className="col-12"
                  texto="Limpar"
                  onClick={() => limpar()}
                />
              </div>
              <div className="alinhar-botao col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <Botao
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.BLUE}
                  className="col-12"
                  texto="Filtrar"
                />
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};