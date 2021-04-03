import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getOpcoesArea, normalizaOpcoesAnos, formataPayloadFiltros } from "../../helper"
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
  const [opcoesArea] = useState(getOpcoesArea)

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
    filtrar(params, '/cadastro-imovel/imoveis/filtrar-por-area-construida/')
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
    if (event.target.value !== '' && event.target.value !== undefined) {
      setFiltros({
        ...filtros,
        ano: event.target.value,
      });
    }
  };
 
  const changeArea = (event) => {
    var areas = []
    var todas = opcoesArea.map((opcao) => opcao.value)
                  .filter((value) => value !== undefined && value !== "todas")
    if (event.target.value.includes("todas")) {
      if (todas.length === (event.target.value.length - 1)){
        areas = []
      } else {
        areas = todas
      }
    } else {
      areas = event.target.value.filter((value) => value !== undefined)      
    }
    setFiltros({
      ...filtros,
      areas: areas,
    });
  };

  const limpar = () => {
    setFiltros({areas: [], ano: ''})
    setResultado(null)
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
                    className='selectFiltros'
                    value={filtros['ano']}
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
                <InputLabel>Área Construída m²</InputLabel>
                <FormControl variant="outlined">
                  <Select
                    id="demo-simple-select-outlined"
                    multiple
                    className='selectFiltros'
                    value={filtros['areas']}
                    onChange={changeArea}
                  >
                    { opcoesArea.map((opcao, index)=>{
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