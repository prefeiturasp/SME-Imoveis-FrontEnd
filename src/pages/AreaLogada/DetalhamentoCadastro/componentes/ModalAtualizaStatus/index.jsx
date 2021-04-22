import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { InputText } from "components/Input/InputText";
import { TextArea } from "components/TextArea/TextArea";
import { SelectText } from "components/Input/SelectText";
import Botao from "components/Botao";
import InputFile from "components/InputFile";
import { TIPO_DOCUMENTO} from "./constants";
import { getImovel } from "services/Imovel.service";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "components/Botao/constants";
import { SITUACAO, OPCOES_ANALISE, OPCOES_VISTORIA } from "pages/CadastroImovel/components/Imovel/constants";
import { codigoEscolaMask, processoSeiMask } from "helpers/textMask";
import HTTP_STATUS from "http-status-codes";
import { getEscola, updateStatus, enviaComapre, finaliza, 
          agendaVistoria, setAnexo, deleteAnexo, enviaRelatorio,
          enviaLaudo, enviaResultadoVistoria, enviaDre, cancela,
          reativa } from "services/cadastros.service";
import { formataPaylaodAtualizaCadastro, formataPaylaodEnviarComapre, 
          formataPaylaodFinaliza, formataPaylaodAgendarVistoria,
          formataPaylaodEnviaRelatorio, formataPaylaodEnviaLaudo,
          formataPaylaodResultadoVistoria, formataPaylaodEnviarDre } from "../../helper";
import { toastError, toastSuccess } from "components/Toast/dialogs";
import { EH_PERFIL_DRE, EH_PERFIL_CONSULTA_SECRETARIA } from "helpers/utils";
import "./style.scss";

export const ModalAtualizaStatus = ({
  cadastroProps,
  showModal,
  setCadastroProps,
  setShowModal,
}) => {
  const [cadastro, setCadastro] = useState(null);
  const [finalizado, setFinalizado] = useState(
                                                cadastroProps.status === "Enviado à DRE" || 
                                                cadastroProps.status === "Vistoria reprovada" ||
                                                cadastroProps.status === "Finalizado - Reprovado"
                                              );
  const [enviadoComapre, setEnviadoComapre] = useState(false);
  const [agendamentoDaVistoria, setAgendamentoDaVistoria] = useState((cadastroProps.status === "Enviado à COMAPRE"));
  const [opcoesFinalizacao, setOpcoesFinalizacao] = useState([{ label: 'Selecione um status', value: undefined },]);
  const [resultadoAnalise, setResultadoAnalise ] = useState();
  const [statusCadastro, setStatusCadastro] = useState(cadastroProps.status);
  const [maximoCaracteres] = useState(200);
  const [contadorAnalise, setContadorAnalise] = useState(0);
  const [contadorComapre, setContadorComapre] = useState(0);
  const [aguardandoVistoria] = useState(
                                          (cadastroProps.status === "Aguardando relatório de vistoria") || 
                                          (cadastroProps.status === "Relatório da vistoria")
                                        );
  const analisePreviaLog = (cadastroProps && cadastroProps.logs) ? ( 
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "SME analisou previamente")
  ) : [];
  const enviadoComapreLog = (cadastroProps && cadastroProps.logs) ? ( 
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Enviado à COMAPRE")
  ) : [];

  const vistoriaAgendadaLog = (cadastroProps && cadastroProps.logs) ? ( 
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Agendamento da vistoria")
  ) : [];

  const aguardandoRelatorioLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Aguardando relatório de vistoria")
  ) : [];

  const relatorioVistoriaLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Relatório da vistoria")
  ) : [];
   
  const laudoValorLocaticioLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Laudo de valor locatício")
  ) : [];

  const vistoriaAprovadaLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Vistoria aprovada")
  ) : [];

  const vistoriaReprovadaLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Vistoria reprovada")
  ) : [];

  const enviadoDreLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Enviado à DRE")
  ) : [];

  const finalizadoAprovadoLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Finalizado - Aprovado")
  ) : [];

  const finalizadoReporvadoLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Finalizado - Reprovado")
  ) : [];

  const canceladoLog = (cadastroProps && cadastroProps.logs) ? (
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Cancelado")
  ) : [];

  const relatorioFotografico = ((cadastroProps && cadastroProps.logs) &&
                                (aguardandoRelatorioLog.length > 0)) ? (
    aguardandoRelatorioLog[0].anexos.filter((anexo) => anexo.get_tipo_documento_display === "Relatório fotográfico")
  ) : [];

  const plantaAtual = ((cadastroProps && cadastroProps.logs) &&
                                (aguardandoRelatorioLog.length > 0)) ? (
    aguardandoRelatorioLog[0].anexos.filter((anexo) => anexo.get_tipo_documento_display === "Planta atual")
  ) : [];

  const plantaAdequacoes = ((cadastroProps && cadastroProps.logs) &&
                                (aguardandoRelatorioLog.length > 0)) ? (
    aguardandoRelatorioLog[0].anexos.filter((anexo) => anexo.get_tipo_documento_display === "Planta com adequações")
  ) : [];

  const planoAdequacoes = ((cadastroProps && cadastroProps.logs) &&
                                (aguardandoRelatorioLog.length > 0)) ? (
    aguardandoRelatorioLog[0].anexos.filter((anexo) => anexo.get_tipo_documento_display === "Plano de adequação")
  ) : [];

  const relatorioVistoria = ((cadastroProps && cadastroProps.logs) &&
                                (relatorioVistoriaLog.length > 0)) ? (
    relatorioVistoriaLog[0].anexos.filter((anexo) => anexo.get_tipo_documento_display === "Relatório de vistoria")
  ) : [];

  const laudoValorLocaticio = ((cadastroProps && cadastroProps.logs) &&
                                (laudoValorLocaticioLog.length > 0)) ? (
    laudoValorLocaticioLog[0].anexos.filter((anexo) => anexo.get_tipo_documento_display === "Laudo de valor locatício")
  ) : [];

  const analiseFinalizadaLog = (cadastroProps && cadastroProps.logs) ? ( 
    cadastroProps.logs.filter((log) =>  {
      if (log.status_evento_explicacao === 'Finalizado - Área Insuficiente') {
        return log
      }
      if (log.status_evento_explicacao === 'Finalizado - Demanda Insuficiente') {
        return log
      }
      if (log.status_evento_explicacao === "Finalizado - Não atende as necessidades da SME") {
        return log
      }
    })
  ) : [];

  useEffect(() => {
    setCadastro(cadastroProps);
    if (cadastroProps.status === 'Finalizado - Área Insuficiente') {
      setResultadoAnalise(0);
      setOpcoesFinalizacao([
        { label: 'Selecione um status', value: undefined },
        { label: 'Finalizado - Área insuficiente', value: 0 }
      ]);
    }
    if (cadastroProps.status === 'Finalizado - Demanda Insuficiente') {
      setResultadoAnalise(1);
      setOpcoesFinalizacao([
        { label: 'Selecione um status', value: undefined },
        { label: 'Finalizado - Demanda insuficiente', value: 1 }
      ]);
    }
    if (cadastroProps.status === "Finalizado - Não atende as necessidades da SME") {
      setResultadoAnalise(2);
      setOpcoesFinalizacao([
        { label: 'Selecione um status', value: undefined },
        { label: 'Finalizado - Não atende as necessidades da SME', value: 2 }
      ]);
    }
    if (cadastroProps.status === 'Finalizado - Aprovado' || cadastroProps.status === 'Enviado à DRE') {
      setResultadoAnalise(3);
      setOpcoesFinalizacao([
        { label: 'Selecione um status', value: undefined },
        { label: 'Aprovado', value: 3 }
      ]);
    }
    if (cadastroProps.status === "Finalizado - Reprovado" || cadastroProps.status === "Vistoria reprovada") {
      setResultadoAnalise(4);
      setOpcoesFinalizacao([
        { label: 'Selecione um status', value: undefined },
        { label: "Finalizado - Reprovado", value: 4 }
      ]);
    }
    if (cadastroProps.status === "Cancelado") {
      setResultadoAnalise(5);
      setOpcoesFinalizacao([
        { label: 'Selecione um status', value: undefined },
        { label: "Cancelado", value: 5 }
      ]);
    }
  }, []);

  const onSubmit = async (values) => {
    if (enviadoComapre) {
      enviarComapre(values, false);
    } else if (finalizado && 
               (cadastroProps.status === "Solicitação Realizada" || 
                cadastroProps.status === "Enviado à DRE" || 
                cadastroProps.status === "Vistoria reprovada")
              ) {
      finalizarAnalise(values, false);
    } else if (agendamentoDaVistoria) {
      agendarVistoria(values, false);
    } else if (planoAdequacoes && plantaAdequacoes && 
               plantaAtual && relatorioVistoria && 
               laudoValorLocaticio && relatorioFotografico && 
               cadastroProps.status !== "Vistoria aprovada" &&
               cadastroProps.status !== "Vistoria reprovada" &&
               cadastroProps.status === "Laudo de valor locatício"
              ) {
      enviarResultadoVistoria(values, false);
    }else if (cadastroProps.status === "Vistoria aprovada") {
      enviarDre(values, false);
    }else {
      const response = await updateStatus(formataPaylaodAtualizaCadastro(values));
      if (!response) toastError("Erro ao atualizar cadastro");
      else if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Cadastro atualizado com sucesso")
        setStatusCadastro(response.data.status);
        setCadastroProps(response.data)
      }
    }
  };

  const enviarComapre = async (values, enviar_email) => {
    if(values.data_envio_comapre) {
      if(values.data_envio_comapre <= (new Date().toISOString().slice(0, 10))) {
        values.enviar_email=enviar_email;
        const response = await enviaComapre(formataPaylaodEnviarComapre(values));
        if (!response) toastError("Erro ao atualizar cadastro");
        else if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Enviado para COMAPRE com sucesso")        
          setStatusCadastro(response.data.status);
          setCadastroProps(response.data);
          setEnviadoComapre(false);
          setAgendamentoDaVistoria(true);
        }
      }else {
        toastError("A data não pode ser posterior a atual");
      }
    } else {
      toastError("É necessário preencher a data de envio");
    }
  };
  
  const finalizarAnalise = async (values, enviar_email) => {
    if(values.status_final !== undefined) {
      values.enviar_email=enviar_email;
      const response = await finaliza(formataPaylaodFinaliza(values));
      if (!response) toastError("Erro ao atualizar cadastro");
      else if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Cadastro finalizado sucesso")
        setStatusCadastro(response.data.status);
        setCadastroProps(response.data);
        setResultadoAnalise(values.status_final);
      }
    } else {
      toastError("É necessário preencher o status final");
    }
  };

  const agendarVistoria = async (values, enviar_email) => {
    if(values.data_vistoria) {
      if(values.data_vistoria >= (new Date().toISOString().slice(0, 10))) {
        values.enviar_email=enviar_email;
        const response = await agendaVistoria(formataPaylaodAgendarVistoria(values));
        if (!response) toastError("Erro ao atualizar cadastro");
        else if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Vistoria agendada com sucesso")        
          setStatusCadastro(response.data.status);
          setCadastroProps(response.data);
          setAgendamentoDaVistoria(false);
        }
      }else {
        toastError("A data não pode ser anterior a atual");
      }
    } else {
      toastError("É necessário preencher a data da vistoria");
    }
  };

  const enviarResultadoVistoria = async (values, enviar_email) => {
      if(values.resultado_vistoria !== undefined) {
        values.enviar_email=enviar_email;
        const response = await enviaResultadoVistoria(formataPaylaodResultadoVistoria(values));
        if (!response) toastError("Erro ao atualizar cadastro");
        else if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Resultado salvo com sucesso")        
          setStatusCadastro(response.data.status);
          setCadastroProps(response.data);
          if(values.resultado_vistoria === 1) {
            setFinalizado(true)
            setOpcoesFinalizacao([
              { label: 'Selecione um status', value: undefined },
              { label: 'Finalizado - Reprovado', value: 4 }
            ]);
          }
        }
      }else {
        toastError("É necessário preencher o resultado da vistoria");
      }
  };

  const enviarRelatorio = async (values, e, tipo, log) => {
    if (log.length > 0) {
      await uploadAnexo(e, tipo, log);
      const response = await getImovel(cadastroProps.id)
      await setCadastroProps(response.data);
      await setStatusCadastro(response.data.status);
      toastSuccess("Cadastro atualizado com sucesso");
    } else {
      let response = await enviaRelatorio(formataPaylaodEnviaRelatorio(values));
      if (!response) toastError("Erro ao atualizar cadastro");
      else if (response.status === HTTP_STATUS.OK) {
        response = await getImovel(cadastroProps.id)
        await setCadastroProps(response.data);
        await setStatusCadastro(response.data.status);
        const log_vistoria = response.data.logs.filter((log) => log.status_evento_explicacao === "Relatório da vistoria")
        await uploadAnexo(e, tipo, log_vistoria);
        toastSuccess("Cadastro atualizado com sucesso");
      }
    }
  };

  const enviarLaudo = async (values, e, tipo, log) => {
    if (log.length > 0) {
      await uploadAnexo(e, tipo, log);
      const response = await getImovel(cadastroProps.id)
      await setCadastroProps(response.data);
      await setStatusCadastro(response.data.status);
      toastSuccess("Cadastro atualizado com sucesso");
    } else {
      let response = await enviaLaudo(formataPaylaodEnviaLaudo(values));
      if (!response) toastError("Erro ao atualizar cadastro");
      else if (response.status === HTTP_STATUS.OK) {
        response = await getImovel(cadastroProps.id)
        await setCadastroProps(response.data);
        await setStatusCadastro(response.data.status);
        const log_vistoria = response.data.logs.filter((log) => log.status_evento_explicacao === "Laudo de valor locatício")
        await uploadAnexo(e, tipo, log_vistoria);
        toastSuccess("Cadastro atualizado com sucesso");
      }
    }
  };
 
  const removerAnexo = async (uuidAnexo) => {
    if (window.confirm("Deseja remover este anexo?")) {
      deleteAnexo(uuidAnexo).then((response) => {
        if (response.status === HTTP_STATUS.NO_CONTENT) {
          toastSuccess("Arquivo removido com sucesso!");
          getImovel(cadastroProps.id)
            .then((response) => {
              if (response.status === HTTP_STATUS.OK) {
                setCadastroProps(response.data);
              } else {
                toastError("Erro ao atualizar cadastro");
              }
            });
        } else {
          toastError("Erro ao remover arquivo");
        }
      });
    }
  };

  const uploadAnexo = async (e, tipo, log) => {
    if (log.length) {
      const arquivoAnexo = {
        ...e[0],
        tipo_documento: tipo,
        log: log[0].id,
        nome: e[0].nome,
      };
      setAnexo(arquivoAnexo).then((response) => {
        if (response.status === HTTP_STATUS.CREATED) {
          getImovel(cadastroProps.id)
            .then((response) => {
              if (response.status === HTTP_STATUS.OK) {
                setCadastroProps(response.data);
              } else {
                toastError("Erro ao atualizar cadastro");
              }
            });
        } else {
          toastError("Erro durante upload no arquivo");
        }
      });
    }
  };

  const enviarDre = async (values, enviar_email) => {
    if(values.data_envio_dre) {
      if(values.data_envio_dre <= (new Date().toISOString().slice(0, 10))) {
        if(values.numero_processo_sei){
          if(values.numero_processo_sei.length === 19){
            if(values.nome_da_unidade) {
              values.enviar_email=enviar_email;
              const response = await enviaDre(formataPaylaodEnviarDre(values));
              if (!response) toastError("Erro ao atualizar cadastro");
              else if (response.status === HTTP_STATUS.OK) {
                toastSuccess("Enviado para DRE com sucesso")        
                setStatusCadastro(response.data.status);
                setCadastroProps(response.data);
                setFinalizado(true);
                setOpcoesFinalizacao([
                  { label: 'Selecione um status', value: undefined },
                  { label: 'Aprovado', value: 3 }
                ]);
              }
            } else {
              toastError("O nome da unidade não pode ficar em branco");
            }
          } else {
            toastError("O número do processo SEI deve conter 16 dígitos");
          }
        } else {
          toastError("É necessário preencher o número do processo SEI");
        }
      }else {
        toastError("A data não pode ser posterior a atual");
      }
    } else {
      toastError("É necessário preencher a data de envio");
    }
  };

  const cancelar = async (values) => {
    const response = await cancela(values.id);
    if (!response) toastError("Erro ao atualizar cadastro");
    else if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Cadastro cancelado")        
      setStatusCadastro(response.data.status);
      setCadastroProps(response.data);
      setResultadoAnalise(5);
      setOpcoesFinalizacao([
        { label: 'Selecione um status', value: undefined },
        { label: 'Cancelado', value: 5 }
      ]);
    }
  };

  const reativar = async (values) => {
    const response = await reativa(values.id);
    if (!response) toastError("Erro ao atualizar cadastro");
    else if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Cadastro reativado")        
      setStatusCadastro(response.data.status);
      setCadastroProps(response.data);
      setOpcoesFinalizacao([{ label: 'Selecione um status', value: undefined },])
      setResultadoAnalise(undefined);
    }
  };

  return (
    <Modal
      dialogClassName="modal-70w"
      show={showModal}
      onHide={() => setShowModal(false)}
      dialog='true'
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modalTitle">
            Atualização de Status
          </div>
        </Modal.Title>
      </Modal.Header>
      {cadastro && (
        <Modal.Body>
          <Form
            initialValues={cadastro}
            onSubmit={onSubmit}
            render={({
              handleSubmit,
              form,
              submitting,
              pristine,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      texto="Salvar Alteração"
                      className="float-right mr-2"
                      onClick={() => onSubmit(values)}
                      disabled={EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA}
                    />
                  </div>
                  <div className="col-12 title mb-3">
                    Informações
                  </div>
                  <Field
                      component={InputText}
                      name="id"
                      type="hidden"
                  />
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Número de protocolo"
                      name="protocolo"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-8">
                    <Field
                      component={InputText}
                      label="Endereço"
                      name="endereco"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-2">
                    <Field
                      component={InputText}
                      label="Número"
                      name="numero"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Bairro"
                      name="bairro"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={InputText}
                      label="Área Construída m²"
                      name="area_construida"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={InputText}
                      label="Demanda Total"
                      name="demandaimovel.total"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      disabled
                    />
                  </div>
                  <div className="col-3">
                    <Field
                      component={SelectText}
                      name="situacao"
                      label="Situação"
                      options={SITUACAO}
                      labelClassName="font-weight-bold color-black"
                      disabled={EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA}
                    />
                  </div>
                  <div className="col-9"></div>
                  { values.situacao === "Substituição" && (
                    <>
                      <div className="col-3">
                        <Field
                          component={InputText}
                          name="codigo_eol"
                          customChange={codigoEscolaMask}
                          label="Código EOL"
                          type="text"
                          labelClassName="font-weight-bold color-black"
                          disabled={EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA}
                        />
                        <OnChange name="codigo_eol">
                          {async (value, previous) => {
                            if (value.length == 6) {
                              const response = await getEscola(value);
                              if(response.data.nomesc && response.data.tipoesc) {
                                form.change(
                                  "escola",
                                  `${response.data.tipoesc} ${response.data.nomesc}`
                                );
                              } else {
                                toastError("Escola não encontrada");
                                form.change("codigo_eol", "");
                                form.change("escola", "");
                              }
                            }
                          }}
                        </OnChange>
                      </div>
                      <div className="col-9">
                        <Field
                          component={InputText}
                          label="Escola"
                          name="escola"
                          type="text"
                          labelClassName="font-weight-bold color-black"
                          disabled
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className='row'>
                  <div className="col-12 title mb-3 mt-3">
                    <Field
                      component='input'
                      className="analisePrevia"
                      name="analise_previa"
                      type="checkbox"
                      checked={true}
                    />
                    <label htmlFor='analise_previa' className="ml-2" >Análise Prévia</label>
                  </div>
                  <div className="col-4">
                    <Field
                      component={SelectText}
                      name="resultado_da_analise"
                      label="Resultado da Análise"
                      placeholder={"Selecione um status"}
                      defaultValue={enviadoComapreLog.length ? 3 : (analiseFinalizadaLog.length ? resultadoAnalise : `` ) }
                      options={OPCOES_ANALISE}
                      labelClassName="font-weight-bold color-black"
                      disabled={(statusCadastro !== "Solicitação Realizada")}
                    />
                    <OnChange name="resultado_da_analise">
                      {async (value, previous) => {
                        if(value !== 3) {
                          if(value === "") {
                            setFinalizado(false)
                            setEnviadoComapre(false)
                          } else {
                            setFinalizado(true)
                            setEnviadoComapre(false)
                            if (value === 0) {
                              setOpcoesFinalizacao([
                                { label: 'Selecione um status', value: undefined },
                                { label: 'Finalizado - Área insuficiente', value: 0 }
                              ]);
                            } 
                            if(value === 1) {
                              setOpcoesFinalizacao([
                                { label: 'Selecione um status', value: undefined },
                                { label: 'Finalizado - Demanda insuficiente', value: 1 }
                              ]);
                            }
                            if(value === 2){
                              setOpcoesFinalizacao([
                                { label: 'Selecione um status', value: undefined },
                                { label: 'Finalizado - Não atende as necessidades da SME', value: 2 }
                              ]);
                            }
                          }
                        } else {
                          setEnviadoComapre(true)
                          setFinalizado(false)
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Data de envio para COMAPRE"
                      name="data_envio_comapre"
                      defaultValue={enviadoComapreLog.length ? (enviadoComapreLog[0].data_agendada) : (enviadoComapre ? (new Date().toISOString().slice(0, 10)) : null )}
                      type="date"
                      disabled={!enviadoComapre || (statusCadastro !== "Solicitação Realizada")}
                      />
                  </div>
                  <div className="col-2"></div>
                  <div className="observacoes col-12 mb-4">
                    <Field
                      component={TextArea}
                      label="Observações"
                      name="observacoes_comapre"
                      maxLength={`${maximoCaracteres}`}
                      defaultValue={ enviadoComapreLog.length ? (enviadoComapreLog[0].justificativa) : '' }
                      style={{minHeight: "100px", height: "100px", maxHeight: '100px'}}
                      labelClassName="font-weight-bold color-black"
                      disabled={!enviadoComapre || (statusCadastro !== "Solicitação Realizada")}
                      />
                    <OnChange name="observacoes_comapre">
                      {async (value, previous) => {
                        if(value.length && value.length <= maximoCaracteres) {
                          setContadorComapre(value.length);
                        } else {
                          setContadorComapre(0);
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-12">
                      <p className="contador">
                        {`${contadorComapre}/${maximoCaracteres}`}
                      </p>
                  </div>
                  <div className="col-7">
                    <p className="mt-1"style={{color: '#42474A'}}>
                      Deseja enviar e-mail com retorno ao proprietário?
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (enviadoComapreLog.length > 0 && enviadoComapreLog[0].email_enviado) && (
                          `${enviadoComapreLog[0].usuario.nome} RF: ${enviadoComapreLog[0].usuario.username} 
                          - ${enviadoComapreLog[0].criado_em} 
                          - Email enviado`
                        )}
                        { (enviadoComapreLog.length > 0 && !enviadoComapreLog[0].email_enviado) && (
                          `${enviadoComapreLog[0].usuario.nome} RF: ${enviadoComapreLog[0].usuario.username} 
                          - ${enviadoComapreLog[0].criado_em} 
                          - Email não enviado`
                        )}
                      </i>
                    </p>
                  </div>
                  <div className="col-5">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      texto="Enviar E-mail"
                      className="enviarEmail"
                      onClick={() => enviarComapre(values, true)}
                      disabled={(statusCadastro !== "Solicitação Realizada" || !enviadoComapre || statusCadastro === "Cancelado")}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-12 title mb-3 mt-3">
                    <Field
                      component='input'
                      className="agendamentoVistoria"
                      name="agendamento_vistoria"
                      type="checkbox"
                      checked={
                                (cadastro.status === 'Enviado à COMAPRE') || 
                                (statusCadastro === 'Enviado à COMAPRE') || 
                                (statusCadastro === "Aguardando relatório de vistoria") || 
                                (statusCadastro === "Relatório da vistoria") ||
                                (statusCadastro === "Aguardando laudo de valor locatício") ||
                                (statusCadastro === "Laudo de valor locatício") ||
                                (statusCadastro === "Vistoria aprovada") ||
                                (statusCadastro === "Vistoria reprovada") ||
                                (statusCadastro === "Finalizado - Aprovado") ||
                                (statusCadastro === "Enviado à DRE") ||
                                (statusCadastro === "Cancelado") ||
                                (statusCadastro === "Finalizado - Reprovado")
                              }
                    />
                    <label htmlFor='agendamento_vistoria' className="ml-2" >Agendamento da vistoria</label>
                  </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      label="Data da vistoria"
                      name="data_vistoria"
                      defaultValue={vistoriaAgendadaLog.length ? (vistoriaAgendadaLog[0].data_agendada) : (agendamentoDaVistoria ? (new Date().toISOString().slice(0, 10)) : null )}
                      type="date"
                      disabled={statusCadastro !== 'Enviado à COMAPRE'}
                    />
                  </div>
                  <div className="col-8"></div>
                  <div className="col-7">
                    <p className="mt-4"style={{color: '#42474A'}}>
                      Deseja enviar e-mail com retorno ao proprietário?
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (vistoriaAgendadaLog.length > 0 && vistoriaAgendadaLog[0].email_enviado) && (
                          `${vistoriaAgendadaLog[0].usuario.nome} RF: ${vistoriaAgendadaLog[0].usuario.username} 
                          - ${vistoriaAgendadaLog[0].criado_em} 
                          - Email enviado`
                        )}
                        { (vistoriaAgendadaLog.length > 0 && !vistoriaAgendadaLog[0].email_enviado) && (
                          `${vistoriaAgendadaLog[0].usuario.nome} RF: ${vistoriaAgendadaLog[0].usuario.username} 
                          - ${vistoriaAgendadaLog[0].criado_em} 
                          - Email não enviado`
                        )}
                      </i>
                    </p>
                  </div>
                  <div className="col-5">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      texto="Enviar E-mail"
                      className="enviarEmail mt-3"
                      onClick={() => agendarVistoria(values, true)}
                      disabled={statusCadastro !== 'Enviado à COMAPRE'}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-12 title mb-3 mt-3">
                    <Field
                      component='input'
                      className="relatorioVistoria"
                      name="relatorioVistoria"
                      type="checkbox"
                      checked={aguardandoVistoria || vistoriaAgendadaLog.length }
                    />
                    <label htmlFor='relatorioVistoria' className="ml-2" >Relatório da Vistoria</label>
                  </div>
                  <div className="col-3">
                    <p className="anexoLabel">Resultado de vistoria</p>
                    { (relatorioVistoria.length > 0) ? (
                      <>
                        <Botao
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          type={BUTTON_TYPE.BUTTON}
                          icon={BUTTON_ICON.TRASH}
                          className="w-50 br-none"
                          onClick={() => removerAnexo(relatorioVistoria[0].uuid)}
                          disabled={(statusCadastro === "Vistoria aprovada") || 
                                    (statusCadastro === "Vistoria reprovada") ||
                                    (statusCadastro === "Enviado à DRE") ||
                                    (statusCadastro === "Finalizado - Aprovado") ||
                                    (statusCadastro === "Cancelado")
                                   }
                        />
                        <a href={relatorioVistoria[0].arquivo} target="_blank" rel="noopener noreferrer">
                          <Botao
                            style={BUTTON_STYLE.BLUE_OUTLINE}
                            type={BUTTON_TYPE.BUTTON}
                            icon={BUTTON_ICON.DOWNLOAD}
                            className="w-50"
                          />
                        </a>
                      </>
                    ) : (
                      (statusCadastro === "Aguardando relatório de vistoria") || 
                      (statusCadastro === "Relatório da vistoria") || 
                      (statusCadastro === "Aguardando laudo de valor locatício") ||
                      (statusCadastro === "Laudo de valor locatício") ?
                      (
                        <Field
                          component={InputFile}
                          className="inputfile"
                          texto="Adicionar"
                          name="relatorio_vistoria"
                          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                          setFiles={(files) => enviarRelatorio(values, files, TIPO_DOCUMENTO.RELATORIO_VISTORIA, relatorioVistoriaLog)}
                        />
                      ) : (
                        <Botao
                          texto="Adicionar"
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          icon={BUTTON_ICON.PLUS}
                          type={BUTTON_TYPE.BUTTON}
                          disabled={true}
                        />
                      )
                    )} 
                  </div>
                  <div className="col-3">
                    <p className="anexoLabel">Relatório fotográfico</p>
                    { (relatorioFotografico.length > 0) ? (
                      <>
                        <Botao
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          type={BUTTON_TYPE.BUTTON}
                          icon={BUTTON_ICON.TRASH}
                          className="w-50 br-none"
                          onClick={() => removerAnexo(relatorioFotografico[0].uuid)}
                          disabled={(statusCadastro === "Vistoria aprovada") || 
                                    (statusCadastro === "Vistoria reprovada") ||
                                    (statusCadastro === "Enviado à DRE") ||
                                    (statusCadastro === "Finalizado - Aprovado") ||
                                    (statusCadastro === "Cancelado")
                                   }
                        />
                        <a href={relatorioFotografico[0].arquivo} target="_blank" rel="noopener noreferrer">
                          <Botao
                            style={BUTTON_STYLE.BLUE_OUTLINE}
                            type={BUTTON_TYPE.BUTTON}
                            icon={BUTTON_ICON.DOWNLOAD}
                            className="w-50"
                          />
                        </a>
                      </>
                    ) : (
                      (statusCadastro === "Aguardando relatório de vistoria") || 
                      (statusCadastro === "Relatório da vistoria") || 
                      (statusCadastro === "Aguardando laudo de valor locatício") ||
                      (statusCadastro === "Laudo de valor locatício") ?
                      (
                        <Field
                          component={InputFile}
                          className="inputfile"
                          texto="Adicionar"
                          name="relatorio_fotografico"
                          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                          setFiles={(files) =>
                            uploadAnexo(files, TIPO_DOCUMENTO.RELATORIO_FOTOGRAFICO, aguardandoRelatorioLog)
                          }
                        />
                      ) : (
                        <Botao
                          texto="Adicionar"
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          icon={BUTTON_ICON.PLUS}
                          type={BUTTON_TYPE.BUTTON}
                          disabled={true}
                        />
                      )
                    )}  
                  </div>
                  <div className="col-3">
                  <p className="anexoLabel">Planta atual</p>
                  { (plantaAtual.length > 0) ? (
                      <>
                        <Botao
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          type={BUTTON_TYPE.BUTTON}
                          icon={BUTTON_ICON.TRASH}
                          className="w-50 br-none"
                          onClick={() => removerAnexo(plantaAtual[0].uuid)}
                          disabled={(statusCadastro === "Vistoria aprovada") || 
                                    (statusCadastro === "Vistoria reprovada") ||
                                    (statusCadastro === "Enviado à DRE") ||
                                    (statusCadastro === "Finalizado - Aprovado") ||
                                    (statusCadastro === "Cancelado")
                                   }
                        />
                        <a href={plantaAtual[0].arquivo} target="_blank" rel="noopener noreferrer">
                          <Botao
                            style={BUTTON_STYLE.BLUE_OUTLINE}
                            type={BUTTON_TYPE.BUTTON}
                            icon={BUTTON_ICON.DOWNLOAD}
                            className="w-50"
                          />
                        </a>
                      </>
                    ) : (
                      (statusCadastro === "Aguardando relatório de vistoria") || 
                      (statusCadastro === "Relatório da vistoria") || 
                      (statusCadastro === "Aguardando laudo de valor locatício") ||
                      (statusCadastro === "Laudo de valor locatício") ?
                      (
                        <Field
                          component={InputFile}
                          className="inputfile"
                          texto="Adicionar"
                          name="planta_atual"
                          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                          setFiles={(files) =>
                            uploadAnexo(files, TIPO_DOCUMENTO.PLANTA_ATUAL, aguardandoRelatorioLog)
                          }
                        />
                      ) : (
                        <Botao
                          texto="Adicionar"
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          icon={BUTTON_ICON.PLUS}
                          type={BUTTON_TYPE.BUTTON}
                          disabled={true}
                        />
                      )
                    )}
                  </div>
                  <div className="col-3"></div>
                  <div className="col-3">
                    <p className="anexoLabel">Planta com adequações</p>
                    { (plantaAdequacoes.length > 0) ? (
                      <>
                        <Botao
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          type={BUTTON_TYPE.BUTTON}
                          icon={BUTTON_ICON.TRASH}
                          className="w-50 br-none"
                          onClick={() => removerAnexo(plantaAdequacoes[0].uuid)}
                          disabled={(statusCadastro === "Vistoria aprovada") || 
                                    (statusCadastro === "Vistoria reprovada") ||
                                    (statusCadastro === "Enviado à DRE") ||
                                    (statusCadastro === "Finalizado - Aprovado") ||
                                    (statusCadastro === "Cancelado")
                                   }
                        />
                        <a href={plantaAdequacoes[0].arquivo} target="_blank" rel="noopener noreferrer">
                          <Botao
                            style={BUTTON_STYLE.BLUE_OUTLINE}
                            type={BUTTON_TYPE.BUTTON}
                            icon={BUTTON_ICON.DOWNLOAD}
                            className="w-50"
                          />
                        </a>
                      </>
                    ) : (
                      (statusCadastro === "Aguardando relatório de vistoria") || 
                      (statusCadastro === "Relatório da vistoria") || 
                      (statusCadastro === "Aguardando laudo de valor locatício") ||
                      (statusCadastro === "Laudo de valor locatício") ?
                      (
                        <Field
                          component={InputFile}
                          className="inputfile"
                          texto="Adicionar"
                          name="planta_adequacoes"
                          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                          setFiles={(files) =>
                            uploadAnexo(files, TIPO_DOCUMENTO.PLANTA_ADEQUACOES, aguardandoRelatorioLog)
                          }
                        />
                      ) : (
                        <Botao
                          texto="Adicionar"
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          icon={BUTTON_ICON.PLUS}
                          type={BUTTON_TYPE.BUTTON}
                          disabled={true}
                        />
                      )
                    )} 
                  </div>
                  <div className="col-3">
                    <p className="anexoLabel">Plano de adequações</p>
                    { (planoAdequacoes.length > 0) ? (
                      <>
                        <Botao
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          type={BUTTON_TYPE.BUTTON}
                          icon={BUTTON_ICON.TRASH}
                          className="w-50 br-none"
                          onClick={() => removerAnexo(planoAdequacoes[0].uuid)}
                          disabled={(statusCadastro === "Vistoria aprovada") || 
                                    (statusCadastro === "Vistoria reprovada") ||
                                    (statusCadastro === "Enviado à DRE") ||
                                    (statusCadastro === "Finalizado - Aprovado") ||
                                    (statusCadastro === "Cancelado")
                                   }
                        />
                        <a href={planoAdequacoes[0].arquivo} target="_blank" rel="noopener noreferrer">
                          <Botao
                            style={BUTTON_STYLE.BLUE_OUTLINE}
                            type={BUTTON_TYPE.BUTTON}
                            icon={BUTTON_ICON.DOWNLOAD}
                            className="w-50"
                          />
                        </a>
                      </>
                    ) : (
                      (statusCadastro === "Aguardando relatório de vistoria") || 
                      (statusCadastro === "Relatório da vistoria") || 
                      (statusCadastro === "Aguardando laudo de valor locatício") ||
                      (statusCadastro === "Laudo de valor locatício") ?
                      (
                        <Field
                          component={InputFile}
                          className="inputfile"
                          texto="Adicionar"
                          name="plano_adequacoes"
                          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                          setFiles={(files) =>
                            uploadAnexo(files, TIPO_DOCUMENTO.PLANO_ADEQUACOES, aguardandoRelatorioLog)
                          }
                        />
                      ) : (
                        <Botao
                          texto="Adicionar"
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          icon={BUTTON_ICON.PLUS}
                          type={BUTTON_TYPE.BUTTON}
                          disabled={true}
                        />
                      )
                    )} 
                  </div>
                  <div className="col-3">
                  <p className="anexoLabel">Laudo de valor locatício</p>
                  { (laudoValorLocaticio.length > 0) ? (
                      <>
                        <Botao
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          type={BUTTON_TYPE.BUTTON}
                          icon={BUTTON_ICON.TRASH}
                          className="w-50 br-none"
                          onClick={() => removerAnexo(laudoValorLocaticio[0].uuid)}
                          disabled={(statusCadastro === "Vistoria aprovada") || 
                                    (statusCadastro === "Vistoria reprovada") ||
                                    (statusCadastro === "Enviado à DRE") ||
                                    (statusCadastro === "Finalizado - Aprovado") ||
                                    (statusCadastro === "Cancelado")
                                   }
                        />
                        <a href={laudoValorLocaticio[0].arquivo} target="_blank" rel="noopener noreferrer">
                          <Botao
                            style={BUTTON_STYLE.BLUE_OUTLINE}
                            type={BUTTON_TYPE.BUTTON}
                            icon={BUTTON_ICON.DOWNLOAD}
                            className="w-50"
                          />
                        </a>
                      </>
                    ) : (
                      (statusCadastro === "Aguardando laudo de valor locatício") ||
                      (statusCadastro === "Laudo de valor locatício") ?
                      (
                        <Field
                          component={InputFile}
                          className="inputfile"
                          texto="Adicionar"
                          name="laudo_valor_locaticio"
                          accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                          setFiles={(files) => enviarLaudo(values, files, TIPO_DOCUMENTO.LAUDO_VALOR_LOCATICIO, laudoValorLocaticioLog)}
                        />
                      ) : (
                        <Botao
                          texto="Adicionar"
                          style={BUTTON_STYLE.BLUE_OUTLINE}
                          icon={BUTTON_ICON.PLUS}
                          type={BUTTON_TYPE.BUTTON}
                          disabled={true}
                        />
                      )
                    )} 
                  </div>
                  <div className="col-3"></div>
                  <div className="col-4 mt-3">
                    <Field
                      component={SelectText}
                      name="resultado_vistoria"
                      label="Resultado da vistoria"
                      placeholder={"Selecione um resultado"}
                      defaultValue={(vistoriaAprovadaLog.length > 0) ? 0 : (vistoriaReprovadaLog.length ? 1 : ``)}
                      options={OPCOES_VISTORIA}
                      labelClassName="font-weight-bold color-black"
                      disabled={(relatorioVistoria.length === 0) || (laudoValorLocaticio.length === 0) ||
                                (vistoriaAprovadaLog.length > 0) || (vistoriaReprovadaLog.length > 0) || 
                                (statusCadastro === "Cancelado")
                               }
                    />
                  </div>
                  <div className="col-8"></div>
                  <div className="col-7">
                    <p className="mt-3"style={{color: '#42474A'}}>
                      Deseja enviar e-mail com retorno ao proprietário?
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (vistoriaAprovadaLog.length > 0 && vistoriaAprovadaLog[0].email_enviado) && (
                          `${vistoriaAprovadaLog[0].usuario.nome} RF: ${vistoriaAprovadaLog[0].usuario.username} 
                          - ${vistoriaAprovadaLog[0].criado_em} 
                          - Email enviado`
                        )}
                        { (vistoriaAprovadaLog.length > 0 && !vistoriaAprovadaLog[0].email_enviado) && (
                          `${vistoriaAprovadaLog[0].usuario.nome} RF: ${vistoriaAprovadaLog[0].usuario.username} 
                          - ${vistoriaAprovadaLog[0].criado_em} 
                          - Email não enviado`
                        )}
                      </i>
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (vistoriaReprovadaLog.length > 0 && vistoriaReprovadaLog[0].email_enviado) && (
                          `${vistoriaReprovadaLog[0].usuario.nome} RF: ${vistoriaReprovadaLog[0].usuario.username} 
                          - ${vistoriaReprovadaLog[0].criado_em} 
                          - Email enviado`
                        )}
                        { (vistoriaReprovadaLog.length > 0 && !vistoriaReprovadaLog[0].email_enviado) && (
                          `${vistoriaReprovadaLog[0].usuario.nome} RF: ${vistoriaReprovadaLog[0].usuario.username} 
                          - ${vistoriaReprovadaLog[0].criado_em} 
                          - Email não enviado`
                        )}
                      </i>
                    </p>
                  </div>
                  <div className="col-5 mt-3">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      texto="Enviar E-mail"
                      className="enviarEmail"
                      onClick={() => enviarResultadoVistoria(values, true)}
                      disabled={(relatorioVistoria.length === 0) || (laudoValorLocaticio.length === 0) ||
                                (vistoriaAprovadaLog.length > 0) || (vistoriaReprovadaLog.length > 0) || 
                                (statusCadastro === "Cancelado")
                               }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 title mb-3 mt-3">
                    <Field
                      component='input'
                      className="envioDre"
                      name="envioDre"
                      type="checkbox"
                      checked={(statusCadastro === "Vistoria aprovada") ||
                               (statusCadastro === "Enviado à DRE") ||
                               (statusCadastro === "Finalizado - Aprovado") ||
                               (vistoriaAprovadaLog.length > 0) || 
                               (vistoriaReprovadaLog.length > 0)}
                    />
                    <label htmlFor='envioDre' className="ml-2" >Envio DRE</label>
                  </div>
                  <div className="col-3">
                      <Field
                        component={InputText}
                        label="Enviado em"
                        name="data_envio_dre"
                        disabled={false}
                        type="date"
                        defaultValue={enviadoDreLog.length ? (enviadoDreLog[0].data_agendada) : (statusCadastro === "Vistoria aprovada" ? (new Date().toISOString().slice(0, 10)) : null )}
                        disabled={(statusCadastro !== "Vistoria aprovada")}
                        />
                    </div>
                  <div className="col-4">
                    <Field
                      component={InputText}
                      name="numero_processo_sei"
                      label="Número processo SEI"
                      type="text"
                      labelClassName="font-weight-bold color-black"
                      defaultValue={enviadoDreLog.length ? enviadoDreLog[0].processo_sei : null}
                      customChange={processoSeiMask}
                      disabled={(statusCadastro !== "Vistoria aprovada")}
                    />
                  </div>
                  <div className="col-5">
                    <Field
                      component={InputText}
                      name="nome_da_unidade"
                      label="Nome da Unidade"
                      type="text"
                      defaultValue={enviadoDreLog.length ? enviadoDreLog[0].nome_da_unidade : null}
                      labelClassName="font-weight-bold color-black"
                      disabled={(statusCadastro !== "Vistoria aprovada")}
                    />
                  </div>
                  <div className="col-7">
                    <p className="mt-3"style={{color: '#42474A'}}>
                      Deseja enviar e-mail com retorno ao proprietário?
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (enviadoDreLog.length > 0 && enviadoDreLog[0].email_enviado) && (
                          `${enviadoDreLog[0].usuario.nome} RF: ${enviadoDreLog[0].usuario.username} 
                          - ${enviadoDreLog[0].criado_em} 
                          - Email enviado`
                        )}
                        { (enviadoDreLog.length > 0 && !enviadoDreLog[0].email_enviado) && (
                          `${enviadoDreLog[0].usuario.nome} RF: ${enviadoDreLog[0].usuario.username} 
                          - ${enviadoDreLog[0].criado_em} 
                          - Email não enviado`
                        )}
                      </i>
                    </p>
                  </div>
                  <div className="col-5 mt-3">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      texto="Enviar E-mail"
                      className="enviarEmail"
                      onClick={() => enviarDre(values, true)}
                      disabled={statusCadastro !== "Vistoria aprovada" || statusCadastro === "Cancelado"}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-12 title mb-3 mt-3">
                    <Field
                      component='input'
                      className="finalizaStatus"
                      name="finalizacao"
                      type="checkbox"
                      checked={finalizado || analiseFinalizadaLog.length || 
                               enviadoDreLog.length || cadastroProps.status === "Cancelado"
                              }
                    />
                    <label htmlFor='finalizacao' className="ml-2" >Finalização</label>
                  </div>
                  <div className="col-4">
                    <Field
                      component={SelectText}
                      name="status_final"
                      label="Status final do cadastro"
                      placeholder={"Selecione um status"}
                      options={opcoesFinalizacao}
                      defaultValue={analiseFinalizadaLog.length ? resultadoAnalise : 
                                    (finalizadoAprovadoLog.length ? resultadoAnalise : 
                                      (finalizadoReporvadoLog.length ? resultadoAnalise : 
                                        ( canceladoLog.length ? resultadoAnalise : undefined)
                                      )
                                    )
                                   }
                      labelClassName="font-weight-bold color-black"
                      disabled={!finalizado || analiseFinalizadaLog.length || 
                                finalizadoAprovadoLog.length || finalizadoReporvadoLog.length || 
                                statusCadastro === "Cancelado" 
                               }
                    />
                  </div>
                  <div className="col-8"></div>
                  <div className="observacoes col-12 mb-4">
                    <Field
                      component={TextArea}
                      label="Observações"
                      name="observacoes_analise"
                      maxLength={`${maximoCaracteres}`}
                      defaultValue={analiseFinalizadaLog.length ? analisePreviaLog[0].justificativa : 
                        (finalizadoAprovadoLog.length ? finalizadoAprovadoLog[0].justificativa : 
                          (finalizadoReporvadoLog.length ? finalizadoReporvadoLog[0].justificativa : '')
                        )
                       }
                      style={{minHeight: "100px", height: "100px", maxHeight: '100px'}}
                      labelClassName="font-weight-bold color-black"
                      disabled={!finalizado || analiseFinalizadaLog.length || 
                                finalizadoAprovadoLog.length || finalizadoReporvadoLog.length || 
                                statusCadastro === "Cancelado" 
                               }
                      />
                      {console.log(finalizadoAprovadoLog)}
                    <OnChange name="observacoes_analise">
                      {async (value, previous) => {
                        if(value.length && value.length <= maximoCaracteres) {
                          setContadorAnalise(value.length);
                        } else {
                          setContadorAnalise(0);
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-12">
                      <p className="contador">
                        {`${contadorAnalise}/${maximoCaracteres}`}
                      </p>
                  </div>
                  <div className="col-7">
                    <p className="mt-3"style={{color: '#42474A'}}>
                      Deseja enviar e-mail com retorno ao proprietário?
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (analiseFinalizadaLog.length > 0 && analiseFinalizadaLog[0].email_enviado) && (
                          `${analiseFinalizadaLog[0].usuario.nome} RF: ${analiseFinalizadaLog[0].usuario.username} 
                          - ${analiseFinalizadaLog[0].criado_em} 
                          - Email enviado`
                        )}
                        { (analiseFinalizadaLog.length > 0 && !analiseFinalizadaLog[0].email_enviado) && (
                          `${analiseFinalizadaLog[0].usuario.nome} RF: ${analiseFinalizadaLog[0].usuario.username} 
                          - ${analiseFinalizadaLog[0].criado_em} 
                          - Email não enviado`
                        )}
                      </i>
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (finalizadoAprovadoLog.length > 0 && finalizadoAprovadoLog[0].email_enviado) && (
                          `${finalizadoAprovadoLog[0].usuario.nome} RF: ${finalizadoAprovadoLog[0].usuario.username} 
                          - ${finalizadoAprovadoLog[0].criado_em} 
                          - Email enviado`
                        )}
                        { (finalizadoAprovadoLog.length > 0 && !finalizadoAprovadoLog[0].email_enviado) && (
                          `${finalizadoAprovadoLog[0].usuario.nome} RF: ${finalizadoAprovadoLog[0].usuario.username} 
                          - ${finalizadoAprovadoLog[0].criado_em} 
                          - Email não enviado`
                        )}
                      </i>
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (finalizadoReporvadoLog.length > 0 && finalizadoReporvadoLog[0].email_enviado) && (
                          `${finalizadoReporvadoLog[0].usuario.nome} RF: ${finalizadoReporvadoLog[0].usuario.username} 
                          - ${finalizadoReporvadoLog[0].criado_em} 
                          - Email enviado`
                        )}
                        { (finalizadoReporvadoLog.length > 0 && !finalizadoReporvadoLog[0].email_enviado) && (
                          `${finalizadoReporvadoLog[0].usuario.nome} RF: ${finalizadoReporvadoLog[0].usuario.username} 
                          - ${finalizadoReporvadoLog[0].criado_em} 
                          - Email não enviado`
                        )}
                      </i>
                    </p>
                  </div>
                  <div className="col-5 mt-3">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      texto="Enviar E-mail"
                      className="enviarEmail"
                      onClick={() => finalizarAnalise(values, true)}
                      disabled={!finalizado || analiseFinalizadaLog.length ||
                                finalizadoAprovadoLog.length || finalizadoReporvadoLog.length || 
                                statusCadastro === "Cancelado"}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-3 mb-3">
                    <Botao
                      type={BUTTON_TYPE.BUTTON}
                      style={BUTTON_STYLE.BLUE}
                      texto="Salvar Alteração"
                      className="float-right mr-2"
                      onClick={() => onSubmit(values)}
                      disabled={EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA}
                    />
                    {((cadastroProps.status === "Cancelado") || 
                      (cadastroProps.status === "Finalizado - Área Insuficiente") || 
                      (cadastroProps.status === "Finalizado - Demanda Insuficiente") || 
                      (cadastroProps.status === "Finalizado - Não atende as necessidades da SME")|| 
                      (cadastroProps.status === "Finalizado - Reprovado")) ? 
                          (
                            <Botao
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.GREEN}
                              texto="Reativar Cadastro"
                              className="float-right mr-2"
                              onClick={() => reativar(values)}
                              disabled={EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA}
                            />
                          ) : (
                            <Botao
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.RED}
                              texto="Cancelar Cadastro"
                              className="float-right mr-2"
                              onClick={() => cancelar(values)}
                              disabled={ EH_PERFIL_DRE || EH_PERFIL_CONSULTA_SECRETARIA }
                            />
                          )
                    }
                  </div>
                </div>
              </form>
            )}
          />
        </Modal.Body>
      )}
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}
