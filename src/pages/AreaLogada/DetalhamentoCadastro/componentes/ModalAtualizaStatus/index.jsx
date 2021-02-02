import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { InputText } from "components/Input/InputText";
import { TextArea } from "components/TextArea/TextArea";
import { SelectText } from "components/Input/SelectText";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { SITUACAO, OPCOES_ANALISE } from "pages/CadastroImovel/components/Imovel/constants";
import { codigoEscolaMask } from "helpers/textMask";
import HTTP_STATUS from "http-status-codes";
import { getEscola, updateStatus, enviaComapre, finalizaAnalise, 
          agendaVistoria } from "services/cadastros.service";
import { formataPaylaodAtualizaCadastro, formataPaylaodEnviarComapre, 
          formataPaylaodFinalizaAnalise, formataPaylaodAgendarVistoria } from "../../helper";
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
  const [finalizado, setFinalizado] = useState(false);
  const [enviadoComapre, setEnviadoComapre] = useState(false);
  const [agendamentoDaVistoria, setAgendamentoDaVistoria] = useState((cadastroProps.status === "Enviado à COMAPRE"));
  const [opcoesFinalizacao, setOpcoesFinalizacao] = useState([{ label: 'Selecione um status', value: undefined },]);
  const [resultadoAnalise, setResultadoAnalise ] = useState(); 
  const [statusCadastro, setStatusCadastro] = useState(cadastroProps.status);
  const [maximoCaracteres, setMaximoCaracteres] = useState(200);
  const [contador, setContador] = useState(0);

  const analisePreviaLog = (cadastroProps && cadastroProps.logs) ? ( 
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "SME analisou previamente")
  ) : [];
  const enviadoComapreLog = (cadastroProps && cadastroProps.logs) ? ( 
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Enviado à COMAPRE")
  ) : [];

  const vistoriaAgendadaLog = (cadastroProps && cadastroProps.logs) ? ( 
    cadastroProps.logs.filter((log) => log.status_evento_explicacao === "Agendamento da vistoria")
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
  }, []);

  const onSubmit = async (values) => {
    if (enviadoComapre) {
      enviarComapre(values, false);
    } else if (finalizado) {
      finalizarAnalise(values, false);
    } else if (agendamentoDaVistoria) {
      agendarVistoria(values, false);
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
        toastError("A data não pode ser menor que a data de hoje.");
      }
    } else {
      toastError("É necessário preencher a data de envio.");
    }
  };
  
  const finalizarAnalise = async (values, enviar_email) => {
    if(values.status_final !== undefined) {
      values.enviar_email=enviar_email;
      const response = await finalizaAnalise(formataPaylaodFinalizaAnalise(values));
      if (!response) toastError("Erro ao atualizar cadastro");
      else if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Cadastro finalizado sucesso")
        setStatusCadastro(response.data.status);
        setCadastroProps(response.data);
        setResultadoAnalise(values.resultado_da_analise);
      }
    } else {
      toastError("É necessário preencher o status final.");
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
        toastError("A data não pode ser menor que a data de hoje.");
      }
    } else {
      toastError("É necessário preencher a data de envio.");
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
                      defaultValue={enviadoComapreLog.length ? 3 : (analiseFinalizadaLog.length ? resultadoAnalise : undefined ) }
                      options={OPCOES_ANALISE}
                      labelClassName="font-weight-bold color-black"
                      disabled={(cadastro.status !== "Solicitação Realizada") || (statusCadastro !== "Solicitação Realizada")}
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
                      name="observacoes_analise"
                      maxLength={`${maximoCaracteres}`}
                      defaultValue={ analisePreviaLog.length ? (analisePreviaLog[0].justificativa) : '' }
                      style={{minHeight: "100px", height: "100px", maxHeight: '100px'}}
                      labelClassName="font-weight-bold color-black"
                      disabled={(cadastro.status !== "Solicitação Realizada") || (statusCadastro !== "Solicitação Realizada")}
                      />
                    <OnChange name="observacoes_analise">
                      {async (value, previous) => {
                        if(value.length && value.length <= maximoCaracteres) {
                          setContador(value.length);
                        } else {
                          setContador(0);
                        }
                      }}
                    </OnChange>
                  </div>
                  <div className="col-12">
                      <p className="contador">
                        {`${contador}/${maximoCaracteres}`}
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
                          - ${new Date(enviadoComapreLog[0].criado_em).toLocaleString('br-BR')} 
                          - Email enviado`
                        )}
                        { (enviadoComapreLog.length > 0 && !enviadoComapreLog[0].email_enviado) && (
                          `${enviadoComapreLog[0].usuario.nome} RF: ${enviadoComapreLog[0].usuario.username} 
                          - ${new Date(enviadoComapreLog[0].criado_em).toLocaleString('br-BR')} 
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
                      disabled={(cadastro.status !== "Solicitação Realizada" || !enviadoComapre)}
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
                      checked={(cadastro.status === 'Enviado à COMAPRE') || (statusCadastro === 'Enviado à COMAPRE') || (statusCadastro === "Aguardando relatório de vistoria")}
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
                      disabled={(cadastro.status !== 'Enviado à COMAPRE') && (statusCadastro !== 'Enviado à COMAPRE')}
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
                          - ${new Date(vistoriaAgendadaLog[0].criado_em).toLocaleString('br-BR')} 
                          - Email enviado`
                        )}
                        { (vistoriaAgendadaLog.length > 0 && !vistoriaAgendadaLog[0].email_enviado) && (
                          `${vistoriaAgendadaLog[0].usuario.nome} RF: ${vistoriaAgendadaLog[0].usuario.username} 
                          - ${new Date(vistoriaAgendadaLog[0].criado_em).toLocaleString('br-BR')} 
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
                      disabled={(cadastro.status !== 'Enviado à COMAPRE') && (statusCadastro !== 'Enviado à COMAPRE')}
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
                      checked={finalizado || analiseFinalizadaLog.length }
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
                      defaultValue={analiseFinalizadaLog.length ? resultadoAnalise : undefined}
                      labelClassName="font-weight-bold color-black"
                      disabled={!finalizado || analiseFinalizadaLog.length }
                    />
                  </div>
                  <div className="col-8"></div>
                  <div className="col-7">
                    <p className="mt-3"style={{color: '#42474A'}}>
                      Deseja enviar e-mail com retorno ao proprietário?
                    </p>
                    <p className="mt-1 emailEnviado"style={{color: '#42474A'}}>
                      <i>
                        { (analiseFinalizadaLog.length > 0 && analiseFinalizadaLog[0].email_enviado) && (
                          `${analiseFinalizadaLog[0].usuario.nome} RF: ${analiseFinalizadaLog[0].usuario.username} 
                          - ${new Date(analiseFinalizadaLog[0].criado_em).toLocaleString('br-BR')} 
                          - Email enviado`
                        )}
                        { (analiseFinalizadaLog.length > 0 && !analiseFinalizadaLog[0].email_enviado) && (
                          `${analiseFinalizadaLog[0].usuario.nome} RF: ${analiseFinalizadaLog[0].usuario.username} 
                          - ${new Date(analiseFinalizadaLog[0].criado_em).toLocaleString('br-BR')} 
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
                      disabled={!finalizado || analiseFinalizadaLog.length}
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
};
