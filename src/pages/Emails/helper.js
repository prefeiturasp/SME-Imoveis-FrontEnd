import React  from 'react';
import CadastroRealizado from './components/Textos/CadastroRealizado'
import NaoAtendeNecessidade from './components/Textos/NaoAtendeNecessidade'
import DemandaInsuficiente from './components/Textos/DemandaInsuficiente'
import AreaInsuficiente from './components/Textos/AreaInsuficiente'
import EnviadoComapre from './components/Textos/EnviadoComapre'
import VistoriaAgendada from './components/Textos/VistoriaAgendada'
import VistoriaReprovada from './components/Textos/VistoriaReprovada'
import VistoriaAprovada from './components/Textos/VistoriaAprovada'
import EnviadoDre from './components/Textos/EnviadoDre'
import Cancelado from './components/Textos/Cancelado'

export const setTextContent = (tipoEmail, imovel) => {
  let content = <div></div>;
  if (tipoEmail === "cadastro_realizado") {
    content =	<CadastroRealizado imovel={imovel}/>
  }
  if (tipoEmail === "finalizado_nao_atende_necessidade") {
    content =	<NaoAtendeNecessidade imovel={imovel}/>
  }
  if (tipoEmail === "finalizado_demanda_insuficiente") {
    content =	<DemandaInsuficiente imovel={imovel}/>
  }
  if (tipoEmail === "finalizado_area_insuficiente") {
    content =	<AreaInsuficiente imovel={imovel}/>
  }
  if (tipoEmail === "enviado_comapre") {
    content =	<EnviadoComapre imovel={imovel}/>
  }
  if (tipoEmail === "vistoria_agendada") {
    content =	<VistoriaAgendada imovel={imovel}/>
  }
  if (tipoEmail === "vistoria_aprovada") {
    content =	<VistoriaReprovada imovel={imovel}/>
  }
  if (tipoEmail === "vistoria_reprovada") {
    content =	<VistoriaAprovada imovel={imovel}/>
  }
  if (tipoEmail === "enviado_dre") {
    content =	<EnviadoDre imovel={imovel}/>
  }
  if (tipoEmail === "cancelado") {
    content =	<Cancelado imovel={imovel}/>
  }
  return content
};