import React from "react";
import { formataGraficoDRE } from "../../../../helper"
import { HorizontalBar } from 'react-chartjs-2';

export const GraficoPorDRE = ({
  resultado,
  todasDemandas,
  totalCadastrados,
}) => {

  const data = formataGraficoDRE(resultado, todasDemandas)
  const options = {
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
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };
  return (
    <div className="row mt-5 mb-3">
      <div className="col-12">
        {data && (
          <HorizontalBar
            data={data}
            options={options}
          />
        )}
      </div>
      {todasDemandas ? (
        <>
          <div className="col-12 mt-3 mb-3">
            <label className="informacoes">Quantidade de imóveis cadastrados: {totalCadastrados}</label>
          </div>
          { Object.keys(resultado).map((dre) => {
            return (
              <div className="col-md-3 col-sm-3 col-xl-3 col-lg-3 mt-2">
                {typeof resultado[dre] === 'object' ? (
                  <>
                    <label className="informacoes w-100">DRE - {dre}</label>
                    <label className="valores w-100">Total: {resultado[`${dre}`]['demanda_1'] + resultado[`${dre}`]['demanda_2'] + resultado[`${dre}`]['demanda_3']}</label>
                    <label className="valores w-100">Baixa: {resultado[`${dre}`]['demanda_1']} ({((resultado[`${dre}`]['demanda_1'] / totalCadastrados) * 100).toFixed(2)}%)</label>
                    <label className="valores w-100">Média: {resultado[`${dre}`]['demanda_2']} ({((resultado[`${dre}`]['demanda_2'] / totalCadastrados) * 100).toFixed(2)}%)</label>
                    <label className="valores w-100">Alta: {resultado[`${dre}`]['demanda_3']} ({((resultado[`${dre}`]['demanda_3'] / totalCadastrados) * 100).toFixed(2)}%)</label>
                  </>
                ) : (
                  <>
                  </>
                )}
              </div>
            )
          })}
        </>
      ) : (
        <>
          <div className="col-12 mt-3 mb-3">
            <label className="informacoes">Quantidade de imóveis cadastrados: {totalCadastrados}</label>
          </div>
          { Object.keys(resultado).map((dre) => {
            return (
              <div className="col-md-3 col-sm-3 col-xl-3 col-lg-3 mt-2">
                {typeof resultado[dre] === 'object' ? (
                  <>
                  </>
                ) : (
                  <>
                    <label className="valores">{resultado[`${dre}`]} ({((resultado[`${dre}`] / totalCadastrados) * 100).toFixed(2)}%)</label>
                    <label className="informacoes  w-100">DRE - {dre}</label>
                  </>
                )}
              </div>
            )
          })}
        </>
      )}
    </div>
  );
};