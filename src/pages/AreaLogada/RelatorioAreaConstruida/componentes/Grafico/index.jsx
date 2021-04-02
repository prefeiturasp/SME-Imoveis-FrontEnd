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
            <label className="informacoes">Quantidade de imóveis cadastrados: {resultado['total_imoveis']}</label>
          </div>
        </div>
        { resultado['ate_200'] !== 0 && (
          <div className="row mb-2">
            <div className="vistoriaAprovada col-1">
            </div>
            <div className="col-11">
              <label className="valores">{resultado['ate_200']} ({((resultado['ate_200']/resultado['total_imoveis'])*100).toFixed(2)}%)</label>
              <p className="informacoes">Abaixo de 200m²</p>
            </div>
          </div>
        )}
        { resultado['200_a_500'] !== 0 && (
          <div className="row mb-2">
            <div className="emAnalise col-1">
            </div>
            <div className="col-11">
              <label className="valores">{resultado['200_a_500']} ({((resultado['200_a_500']/resultado['total_imoveis'])*100).toFixed(2)}%)</label>
              <p className="informacoes">Entre 200m² e 500m²</p>
            </div>
          </div>
        )}
        { resultado['maior_500'] !== 0 && (
          <div className="row mb-2">
            <div className="finalizadoReprovado col-1">
            </div>
            <div className="col-11">
              <label className="valores">{resultado['maior_500']} ({((resultado['maior_500']/resultado['total_imoveis'])*100).toFixed(2)}%)</label>
              <p className="informacoes">Acima de 500m²</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};