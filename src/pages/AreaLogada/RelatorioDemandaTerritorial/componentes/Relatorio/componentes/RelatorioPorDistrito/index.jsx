import React, { useState } from "react";
import Collapse from '@material-ui/core/Collapse';
import Botao from "components/Botao";
import { BUTTON_STYLE } from "components/Botao/constants";

export const RelatorioPorDistrito = ({
    resultado,
    todasDemandas,
  }) => {
  
  const [collapses, setCollapses] = useState({});

  const collapseResultado = (e, index) => {
    setCollapses({ ...collapses, [index]: !collapses[index]});
  }

  return (
    <>
      {resultado && (
        Object.keys(resultado).map((dre, index) => {
          return (
            <div className=" p-3">
              <div className="card mt-3">
                <div className="card-header">
                  <div className="row">
                    <div className="col-11">
                      <label className="mb-0">DRE - {dre}</label>
                    </div>
                    <div className="col-1">
                      <button className="collapseButton" onClick={(e) => collapseResultado(e, index)}>
                        <i className="fas fa-bars"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <Collapse in={collapses[`${index}`]}>
                  <div className="card-body">
                    <table className="relatorio">
                      <thead>
                        {todasDemandas ? (
                          <tr>
                            <th>Distrito</th>
                            <th>Demanda Baixa 0 - 40</th>
                            <th>Demanda Média 41 - 100</th>
                            <th>Demanda Alta + 100</th>
                          </tr>
                        ) : (
                          <tr>
                            <th>Distrito</th>
                            <th>Cadastros</th>
                          </tr>
                        )}
                      </thead>
                      <tbody>
                          { resultado && Object.keys(resultado[dre]).map((distrito) =>  {
                            return(
                              todasDemandas ? (
                                <tr>
                                  <td>{distrito}</td>
                                  <td>{`${resultado[dre][distrito]['demanda_1']}`}</td>
                                  <td>{`${resultado[dre][distrito]['demanda_2']}`}</td>
                                  <td>{`${resultado[dre][distrito]['demanda_3']}`}</td>
                                </tr>
                              ) : (
                                <tr>
                                  <td>{distrito}</td>
                                  <td>{`${resultado[dre][distrito]}`}</td>
                                </tr>
                              )
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </Collapse>
              </div>
            </div>
          )
        })
      )}
    </>
  )
}