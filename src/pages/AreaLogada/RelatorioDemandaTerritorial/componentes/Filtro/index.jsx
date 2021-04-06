import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getOpcoesDemandas, normalizaOpcoesAnos, normalizaOpcoesDres, 
          formataPayloadFiltros, normalizaOpcoesDistritos,
          normalizaOpcoesSetores, formataPayloadSetores} from "../../helper"
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import Botao from "components/Botao";
import { getAnos, filtrar } from "services/relatorios.service";
import "./style.scss";

import { Form } from "react-final-form";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getDres, getDistritos, getSetores } from "services/cadastros.service";

export const Filtro = ({
  filtros,
  setFiltros,
  setResultado,
  setCarregando,
  setTipoResultado,
  setTodasDemandas,
  setTotalCadastrados,
}) => {
  
  const [opcoesAnos, setOpcoesAnos] = useState([{ label: "Selecione os anos", value: undefined }])
  const [opcoesDres, setOpcoesDres] = useState([{ label: "Selecione as DREs", value: undefined }])
  const [opcoesDistritos, setOpcoesDistritos] = useState([{ label: "Selecione os Distritos", value: undefined }])
  const [opcoesSetores, setOpcoesSetores] = useState([{ label: "Selecione os Setores", value: undefined }])
  const [opcoesDemandas] = useState(getOpcoesDemandas)
  
  const [distritoDisabled, setDistritoDisabled] = useState(false);
  const [setorDisabled, setSetorDisabled] = useState(false);
  
  useEffect(() => {
    getAnos()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setOpcoesAnos(normalizaOpcoesAnos(response.data));
        }
      })
      .catch(() => {
        console.log("Erro ao buscar anos")
      });
    getDres()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setOpcoesDres(normalizaOpcoesDres(response.data));
        }
      })
      .catch(() => {
        console.log("Erro ao buscar anos")
      });
  }, []);

  const onSubmit = async () => {
    setCarregando(true);
    const params = formataPayloadFiltros(filtros);
    filtrar(params, '/cadastro-imovel/imoveis/filtrar-por-demanda-territorial/')
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setResultado(response.data['data']);
          setTotalCadastrados(response.data['total']);
          setCarregando(false);
          setTipoResultado(filtros['tipo_resultado']);
          if (filtros['demandas'] && filtros['demandas'].length === 3) {
            setTodasDemandas(true);
          } else {
            setTodasDemandas(false);
          }
        }
      })
      .catch(() => {
        console.log("Erro ao filtrar")
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

  const changeDres = async (event) => {
    if (event.target.value === undefined) {
      setDistritoDisabled(false);
      setSetorDisabled(false);
      setOpcoesDistritos([{ label: "Selecione os Distritos", value: undefined }]);
      setOpcoesSetores([{ label: "Selecione os Setores", value: undefined }])
      setFiltros({
        ...filtros,
        dres: '',
        distritos: [],
        setores: [],
        tipo_resultado: 'dre',
      });  
    } else {
      if (event.target.value === 'todas') {
        setDistritoDisabled(true);
        setSetorDisabled(true);
      } else {
        setDistritoDisabled(false);
        setSetorDisabled(false);
        const response = await getDistritos(`&dre=${event.target.value}`);
        if (!response) console.log("Erro ao carregar distritos");
        else if (response.status === HTTP_STATUS.OK) {
          setOpcoesDistritos(normalizaOpcoesDistritos(response.data));
        }
      }
      setFiltros({
        ...filtros,
        dres: event.target.value,
        distritos: [],
        setores: [],
        tipo_resultado: 'dre',
      });
    }
  };

  const changeDistritos = async (event) => {
    var distritos = []
    var todos = opcoesDistritos.map((opcao) => opcao.value)
                            .filter((value) => value !== undefined && value !== "todos")
    if (event.target.value.includes("todos")) {
      if (todos.length === (event.target.value.length - 1)){
        distritos = []
        setSetorDisabled(false);
        setOpcoesSetores([{ label: "Selecione os Setores", value: undefined }]);
      } else {
        distritos = todos
        setSetorDisabled(true);
        const response = await getSetores(formataPayloadSetores(distritos));
        if (!response) console.log("Erro ao carregar setores");
        else if (response.status === HTTP_STATUS.OK) {
          setOpcoesSetores(normalizaOpcoesSetores(response.data));
        }
      }
    } else {
      distritos = event.target.value.filter((value) => value !== undefined)      
      setSetorDisabled(false);
      const response = await getSetores(formataPayloadSetores(distritos));
      if (!response) console.log("Erro ao carregar setores");
      else if (response.status === HTTP_STATUS.OK) {
        setOpcoesSetores(normalizaOpcoesSetores(response.data));
      }
    }
    setFiltros({
      ...filtros,
      distritos: distritos,
      setores: [],
      tipo_resultado: distritos.length ? 'distrito' : 'dre',
    });
  };

  const changeSetores = async (event) => {
    var setores = []
    var todos = opcoesSetores.map((opcao) => opcao.value)
                            .filter((value) => value !== undefined && value !== "todos")
    if (event.target.value.includes("todos")) {
      if (todos.length === (event.target.value.length - 1)){
        setores = []
      } else {
        setores = todos
      }
    } else {
      setores = event.target.value.filter((value) => value !== undefined)
    }
    setFiltros({
      ...filtros,
      setores: setores,
      tipo_resultado: setores.length ? 'setor' : 'distrito',
    });
  };

  const changeDemandas = (event) => {
    var demandas = []
    var todos = opcoesDemandas.map((opcao) => opcao.value)
                            .filter((value) => value !== undefined && value !== "todos")
    if (event.target.value.includes("todos")) {
      demandas = todos
      if (todos.length === (event.target.value.length - 1)){
        demandas = []
      }
    } else {
      demandas = event.target.value.filter((value) => value !== undefined)
    }
    setFiltros({
      ...filtros,
      demandas: demandas,
    });
  };

  const limpar = () => {
    setFiltros({ demandas: [], dres: '', distritos: [],
                 setores: [], anos: [], tipo_resultado: 'dre'});
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
                <FormControl className="fullWidth" variant="outlined">
                  <Select
                    id="demo-simple-select-outlined"
                    multiple
                    className='selectFiltros fullWidth'
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
              <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9">
                <InputLabel>DRE</InputLabel>
                <FormControl className="fullWidth" variant="outlined">
                  <Select
                    id="demo-simple-select-outlined"
                    className='selectFiltros fullWidth'
                    value={filtros['dres']}
                    onChange={changeDres}
                  >
                    { opcoesDres.map((opcao, index)=>{
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
            </div>
            <div className="row mt-3">
              <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <InputLabel>Distrito</InputLabel>
                <FormControl className="fullWidth" variant="outlined">
                  <Select
                    id="demo-simple-select-outlined"
                    multiple
                    className='selectFiltros fullWidth'
                    value={filtros['distritos']}
                    onChange={changeDistritos}
                    disabled={distritoDisabled}
                  >
                    { opcoesDistritos.map((opcao, index)=>{
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
              <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <InputLabel>Setor</InputLabel>
                <FormControl className="fullWidth" variant="outlined">
                  <Select
                    id="demo-simple-select-outlined"
                    multiple
                    className='selectFiltros fullWidth'
                    value={filtros['setores']}
                    onChange={changeSetores}
                    disabled={setorDisabled}
                  >
                    { opcoesSetores.map((opcao, index)=>{
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
              <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <InputLabel>Demanda</InputLabel>
                <FormControl className="fullWidth" variant="outlined">
                  <Select
                    id="demo-simple-select-outlined"
                    className='selectFiltros fullWidth'
                    multiple
                    value={filtros['demandas']}
                    onChange={changeDemandas}
                  >
                    { opcoesDemandas.map((opcao, index)=>{
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
            </div>
            <div className="row">
              <div className="alinhar-botao offset-md-8 offset-lg-8 offset-xl-8 col-sm-12 col-md-2 col-lg-2 col-xl-2">
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