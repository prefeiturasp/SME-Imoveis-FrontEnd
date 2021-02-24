import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { SelectText } from "components/Input/SelectText";
import { InputText } from "components/Input/InputText";
import { Field, Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { getCadastros, getDres, getDistritos, getSetores, exportarCadastros } from "services/cadastros.service";
import { normalizarOptions, normalizarSetores } from "helpers/utils";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import Botao from "components/Botao";
import { toastError } from "components/Toast/dialogs";
import { formataPaylaodBuscaCadastros } from "../../helper";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";

export const Filtro = ({
  setCadastros, 
  setTotal,
  setLastSearchParams, 
  setDresProps, 
  setDistritosProps, 
  setSetoresProps,
  setDataToExport
}) => {
  const [dres, setDres] = useState(null);
  const [erro, setErro] = useState(false);
  const [distritos, setDistritos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [status, setStatus] = useState([
    { label: 'Selecione', value: undefined },
    { label: 'Solicitação Realizada', value: 'SOLICITACAO_REALIZADA' },
    { label: 'SME analisou previamente', value: 'AGUARDANDO_ANALISE_PREVIA_SME' },
    { label: 'Enviado à COMAPRE', value: 'ENVIADO_COMAPRE' },
    { label: 'Agendamento da vistoria', value: 'AGENDAMENTO_DA_VISTORIA' },
    { label: 'Aguardando relatório de vistoria', value: 'AGUARDANDO_RELATORIO_DE_VISTORIA' },
    { label: 'Aguardando laudo de valor locatício', value: 'AGUARDANDO_LAUDO_DE_VALOR_LOCATICIO' },
    { label: 'Vistoria aprovada', value: 'VISTORIA_APROVADA' },
    { label: 'Vistoria reprovada', value: 'VISTORIA_REPROVADA' },
    { label: 'Enviado à DRE', value: 'ENVIADO_DRE' },
    { label: 'Finalizado - Área Insuficiente', value: 'FINALIZADO_AREA_INSUFICIENTE' },
    { label: 'Finalizado - Demanda Insuficiente', value: 'FINALIZADO_DEMANDA_INSUFICIENTE' },
    { label: 'Finalizado - Não atende as necessidades da SME', value: 'FINALIZADO_NAO_ATENDE_NECESSIDADES' },
    { label: 'Finalizado - Aprovado', value: 'FINALIZADO_APROVADO' },
    { label: 'Finalizado - Reprovado', value: 'FINALIZADO_REPROVADO' },
    { label: 'Cancelado', value: 'CANCELADO' },
  ])
  const [areas, setAreas] = useState([
    { label: 'Selecione', value: undefined },
    { label: 'Abaixo de 200m²', value: 1 },
    { label: 'Entre 200m² e 500m²', value: 2 },
    { label: 'Acima de 500m²', value: 3 },
  ])
  const [demadas, setDemandas] = useState([
    { label: 'Selecione', value: undefined },
    { label: 'Baixa: até 40 cadastros', value: 1 },
    { label: 'Média: de 40 até 100 cadastros', value: 2 },
    { label: 'Alta: acima de 100 cadastros', value: 3 },
  ])

  useEffect(() => {
    getDres()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setDres(response.data);
          setDresProps(response.data);
        }
      })
      .catch(() => {
        setErro(true);
      });
  }, []);


  const onSubmit = async (values) => {
    const response = await getCadastros(formataPaylaodBuscaCadastros(values));
    if (!response) toastError("Erro ao carregar os dados dos cadastros realizados");
    else if (response.status === HTTP_STATUS.OK) {
      setCadastros(response.data.results);
      setTotal(parseInt(response.data.count));
      setLastSearchParams(values);
    }
    const todosResultados = await exportarCadastros(formataPaylaodBuscaCadastros(values));
    if (!todosResultados) toastError("Erro ao carregar os dados dos cadastros realizados");
    else if (todosResultados.status === HTTP_STATUS.OK) {
      setDataToExport(todosResultados.data);
    }
  };

  const onChangeDRE = async (value) => {
    const queryParams = `dre=${value}`
    const response = await getDistritos(queryParams);
    if (!response) toastError("Erro ao carregar os dados dos distritos");
    else if (response.status === HTTP_STATUS.OK) {
      setDistritos(response.data);
      setDistritosProps(response.data);
    }
  };

  const onChangeDistrito = async (value) => {
    const queryParams = `distrito=${value}`
    const response = await getSetores(queryParams);
    if (!response) toastError("Erro ao carregar os dados dos setores");
    else if (response.status === HTTP_STATUS.OK) {
      setSetores(response.data);
      setSetoresProps(response.data);
    }
  };

  const resetFilters = async (form) => {
    form.reset()
    setDistritos([]);
    setDistritosProps([]);
    setSetores([]);
    setSetoresProps([]);
  };

  const LOADING = !dres || !distritos || !setores;

  return (
    <>
      {LOADING && !erro && <div>Carregando...</div>}
      {erro && <div>Erro ao carregar dados do servidor</div>}
      {!LOADING && (
        <Form onSubmit={onSubmit}>
          {({ handleSubmit, form, submitting, values }) => (
            <Spin spinning={submitting}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-3 col-12">
                    <Field
                      component={InputText}
                      esconderAsterisco
                      label="Protocolo"
                      name="protocolo"
                      placeholder={"N. do protocolo"}
                      type="text"
                      />
                  </div>
                  <div className="col-sm-6 col-12">
                    <Field
                      component={InputText}
                      esconderAsterisco
                      label="Endereço"
                      name="endereco"
                      placeholder={"Insira o endereço"}
                      type="text"
                      />
                  </div>
                  <div className="col-sm-3 col-12">
                    <Field
                      component={SelectText}
                      name="area"
                      label="Área Construída m²"
                      placeholder={"Selecione uma área"}
                      options={areas}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <Field
                      component={SelectText}
                      name="dre"
                      label="DRE"
                      placeholder={"Selecione uma DRE"}
                      options={normalizarOptions(dres)}
                      naoDesabilitarPrimeiraOpcao
                    />
                    <OnChange name="dre">
                      { (value, previous) => {
                        if(value !== undefined && value !== ""){
                          onChangeDRE(value);
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-sm-3 col-12">
                    <Field
                      component={SelectText}
                      name="distrito"
                      label="Distrito"
                      placeholder={distritos.length ? "Selecione um distrito" : "Selecione uma DRE"}
                      options={normalizarOptions(distritos)}
                      naoDesabilitarPrimeiraOpcao
                    />
                    <OnChange name="distrito">
                      { (value, previous) => {
                        if(value !== undefined && value !== ""){
                          onChangeDistrito(value);
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-sm-3 col-12">
                    <Field
                      component={SelectText}
                      name="setor"
                      label="Setor"
                      placeholder={setores.length ? "Selecione um setor" : "Selecione DRE e Distrito"}
                      options={normalizarSetores(setores)}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-sm-3 col-12">
                    <Field
                      component={SelectText}
                      name="status"
                      label="Status"
                      placeholder={"Selecione um status"}
                      options={status}
                      naoDesabilitarPrimeiraOpcao
                      />
                  </div>
                  <div className="col-sm-3 col-12">
                    <Field
                      component={SelectText}
                      label="Demanda"
                      name="demanda"
                      placeholder={"Selecione uma demanda"}
                      options={demadas}
                      naoDesabilitarPrimeiraOpcao
                      />
                  </div>
                  <div className="col-sm-3 col-12">
                    <Field
                      component={InputText}
                      esconderAsterisco
                      label="Data do Cadastro"
                      name="data_inicio"
                      placeholder={"Data início"}
                      type="date"
                      />
                  </div>
                  <div className="col-sm-3 col-12">
                    <Field
                      component={InputText}
                      esconderAsterisco
                      label="Data final"
                      name="data_fim"
                      placeholder={"Data fim"}
                      type="date"
                      />
                  </div>
                </div>
                <div className="row">
                  <div className="offset-sm-8 col-sm-2 mt-2 mb-2 col-12">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      className="col-12"
                      texto="Limpar"
                      onClick={() => resetFilters(form)}
                    />
                  </div>
                  <div className="col-sm-2 mt-auto mb-2 col-12">
                    <Botao
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.BLUE}
                      className="col-12"
                      texto="Filtrar"
                    />
                  </div>
                </div>
              </form>
            </Spin>
          )}
        </Form>
      )}
    </>
  );
};
