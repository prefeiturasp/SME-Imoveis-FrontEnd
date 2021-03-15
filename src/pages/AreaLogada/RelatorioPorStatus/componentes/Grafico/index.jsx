import React from "react";
import { Pie } from 'react-chartjs-2';
import { formataGrafico } from "../../helper"
import "./style.scss";

export const Grafico = ({
  resultado,
}) => {
  const data = formataGrafico(resultado)
  return (
    <div className="row mt-5 mb-3">
      <div className="col-6">
         <Pie data={data} />
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-12 p-0">
            <label className="informacoes">Quantidade de imóveis cadastrados: {resultado.total}</label>
          </div>
        </div>
        { resultado.em_analise !== 0 && (
          <div className="row mb-2">
            <div className="emAnalise col-1">
            </div>
            <div className="col-11">
              <label className="valores">{resultado.em_analise} ({(resultado.em_analise/resultado.total)*100}%)</label>
              <p className="informacoes">Em análise</p>
            </div>
          </div>
        )}
        { resultado.finalizados_reprovados !== 0 && (
          <div className="row mb-2">
            <div className="finalizadoReprovado col-1">
            </div>
            <div className="col-11">
              <label className="valores">{resultado.finalizados_reprovados} ({(resultado.finalizados_reprovados/resultado.total)*100}%)</label>
              <p className="informacoes">Finalizados reprovados</p>
            </div>
          </div>
        )}
        { resultado.aprovados_na_vistoria !== 0 && (
          <div className="row mb-2">
            <div className="vistoriaAprovada col-1">
            </div>
            <div className="col-11">
              <label className="valores">{resultado.aprovados_na_vistoria} ({(resultado.aprovados_na_vistoria/resultado.total)*100}%)</label>
              <p className="informacoes">Aprovados vistoria</p>
            </div>
          </div>
        )}
        { resultado.reprovados_na_vistoria !== 0 && (
          <div className="row mb-2">
            <div className="vistoriaReprovada col-1">
            </div>
            <div className="col-11">
              <label className="valores">{resultado.reprovados_na_vistoria} ({(resultado.reprovados_na_vistoria/resultado.total)*100}%)</label>
              <p className="informacoes">Reprovados vistoria</p>
            </div>
          </div>
        )}
        { resultado.cancelados !== 0 && (
          <div className="row mb-2">
            <div className="cancelado col-1">
            </div>
            <div className="col-11">
              <label className="valores">{resultado.cancelados} ({(resultado.cancelados/resultado.total)*100}%)</label>
              <p className="informacoes">Cancelados</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};