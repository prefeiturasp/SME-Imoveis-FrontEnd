import React from "react";
import { formataGraficoDistrito } from "../../../../helper"
import { Bar } from 'react-chartjs-2';

export const GraficoPorDistrito = ({
    resultado,
    todasDemandas,
    totalCadastrados,
  }) => {

    const data = formataGraficoDistrito(resultado, todasDemandas)
    const options={
      legend: {
          display: false,
      },
      scales: {
        yAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return (
      <div className="row mt-5 mb-3">
        <div className="col-12">
         <Bar 
          data={data}
          options={options}
        />
        </div>
        {todasDemandas ? (
          <>
            { Object.keys(resultado).map((dre) => {
              return(
                <>
                  <div className="col-12 mt-3 mb-3">
                    <label className="informacoes">
                      Quantidade de imóveis cadastrados na DRE - {dre}:{" "}
                      {Object.keys(resultado[dre]).map((distrito, idx) => resultado[dre][distrito][`demanda_${idx+1}`]).reduce((a, b) => a + b, 0)}
                    </label>
                  </div>
                  {Object.keys(resultado[dre]).map((distrito) => {
                    return(
                      <div className="col-md-3 col-sm-3 col-xl-3 col-lg-3 mt-2">
                        {typeof resultado[dre][distrito] === 'object' ? (
                          <>
                            <label className="informacoes w-100">{distrito}</label>
                            <label className="valores w-100">Total: {resultado[`${dre}`][`${distrito}`]['demanda_1'] + resultado[`${dre}`][`${distrito}`]['demanda_2'] + resultado[`${dre}`][`${distrito}`]['demanda_3']}</label>
                            <label className="valores w-100">Baixa: {resultado[`${dre}`][`${distrito}`]['demanda_1']} ({((resultado[`${dre}`][`${distrito}`]['demanda_1']/totalCadastrados)*100).toFixed(2)}%)</label>
                            <label className="valores w-100">Média: {resultado[`${dre}`][`${distrito}`]['demanda_2']} ({((resultado[`${dre}`][`${distrito}`]['demanda_2']/totalCadastrados)*100).toFixed(2)}%)</label>
                            <label className="valores w-100">Alta: {resultado[`${dre}`][`${distrito}`]['demanda_3']} ({((resultado[`${dre}`][`${distrito}`]['demanda_3']/totalCadastrados)*100).toFixed(2)}%)</label>
                          </>
                        ) : (
                          <>
                          </>
                        )}
                      </div>
                    )
                  })}
                </>
              )
            })}
          </>
        ) : (
          <>
            { Object.keys(resultado).map((dre) => {
              return(
                <>
                  <div className="col-12 mt-3 mb-3">
                    <label className="informacoes">
                      Quantidade de imóveis cadastrados na DRE - {dre}:{""}
                      {Object.keys(resultado[dre]).map((distrito) => resultado[dre][distrito]).reduce((a, b) => a + b, 0)}
                    </label>
                  </div>
                  {Object.keys(resultado[dre]).map((distrito) => {
                    return(
                      <div className="col-md-3 col-sm-3 col-xl-3 col-lg-3 mt-2">
                        {typeof resultado[dre][distrito] === 'object' ? (
                          <>
                          </>
                        ) : (
                          <>
                            <label className="valores">{resultado[`${dre}`][`${distrito}`]} ({((resultado[`${dre}`][`${distrito}`]/totalCadastrados)*100).toFixed(2)}%)</label>
                            <label className="informacoes  w-100">{distrito}</label>
                          </>
                        )}
                      </div>
                    )
                  })}
                </>
              )
            })}
          </>
        )}
      </div>
    );
};