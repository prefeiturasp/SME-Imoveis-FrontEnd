import React from "react";
import { formataGraficoSetor } from "../../../../helper"
import { Bar } from 'react-chartjs-2';

export const GraficoPorSetor = ({
  resultado,
  todasDemandas,
  totalCadastrados,
}) => {
  const data = formataGraficoSetor(resultado, todasDemandas)
  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
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
            return (
              <>
                {Object.keys(resultado[dre]).map((distrito) => {
                  return (
                    <>
                      <div className="col-12 mt-3 mb-3">
                        <label className="informacoes">
                          Quantidade de imóveis cadastrados no Distrito - {distrito}: {" "}
                          {Object.keys(resultado[dre][distrito]).map((setor, idx) => resultado[dre][distrito][setor][`demanda_${idx + 1}`]).reduce((a, b) => a + b, 0)}
                        </label>
                      </div>
                      {Object.keys(resultado[dre][distrito]).map((setor) => {
                        return (
                          <div className="col-md-3 col-sm-3 col-xl-3 col-lg-3 mt-2">
                            {typeof resultado[dre][distrito][setor] === 'object' ? (
                              <>
                                <label className="informacoes w-100">Setor - {setor}</label>
                                <label className="valores w-100">Total: {resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_1'] + resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_2'] + resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_3']}</label>
                                <label className="valores w-100">Baixa: {resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_1']} ({((resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_1'] / totalCadastrados) * 100).toFixed(2)}%)</label>
                                <label className="valores w-100">Média: {resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_2']} ({((resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_2'] / totalCadastrados) * 100).toFixed(2)}%)</label>
                                <label className="valores w-100">Alta: {resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_3']} ({((resultado[`${dre}`][`${distrito}`][`${setor}`]['demanda_3'] / totalCadastrados) * 100).toFixed(2)}%)</label>
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
            )
          })}
        </>
      ) : (
        <>
          { Object.keys(resultado).map((dre) => {
            return (
              <>
                {Object.keys(resultado[dre]).map((distrito) => {
                  return (
                    <>
                      <div className="col-12 mt-3 mb-3">
                        <label className="informacoes">
                          Quantidade de imóveis cadastrados no Distrito - {distrito}:{" "}
                          {Object.keys(resultado[dre][distrito]).map((setor) => resultado[dre][distrito][setor]).reduce((a, b) => a + b, 0)}
                        </label>
                      </div>
                      {Object.keys(resultado[dre][distrito]).map((setor) => {
                        return (
                          <div className="col-md-3 col-sm-3 col-xl-3 col-lg-3 mt-2">
                            {typeof resultado[dre][distrito][setor] === 'object' ? (
                              <>
                              </>
                            ) : (
                              <>
                                <label className="valores">{resultado[`${dre}`][`${distrito}`][`${setor}`]} ({((resultado[`${dre}`][`${distrito}`][`${setor}`] / totalCadastrados) * 100).toFixed(2)}%)</label>
                                <label className="informacoes  w-100">Setor - {setor}</label>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </>
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
