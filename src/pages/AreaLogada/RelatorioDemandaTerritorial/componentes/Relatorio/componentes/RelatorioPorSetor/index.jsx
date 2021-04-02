import React, { useState } from "react";
import Collapse from '@material-ui/core/Collapse';

export const RelatorioPorSetor = ({
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
                      <label>DRE - {dre}</label>
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
                            <th>Setor</th>
                            <th>Demanda Baixa 0 - 40</th>
                            <th>Demanda Média 41 - 100</th>
                            <th>Demanda Alta + 100</th>
                          </tr>
                        ) : (
                          <tr>
                            <th>Distrito</th>
                            <th>Setor</th>
                            <th>Cadastros</th>
                          </tr>
                        )}
                      </thead>
                      <tbody>
                          { resultado && Object.keys(resultado[dre]).map((distrito) =>  {
                            return(
                              Object.keys(resultado[dre][distrito]).map((setor) => {
                                return(
                                  todasDemandas ? (
                                    <tr>
                                      <td>{distrito}</td>
                                      <td>{setor}</td>
                                      <td>{`${resultado[dre][distrito][setor]['demanda_1']}`}</td>
                                      <td>{`${resultado[dre][distrito][setor]['demanda_2']}`}</td>
                                      <td>{`${resultado[dre][distrito][setor]['demanda_3']}`}</td>
                                    </tr>
                                  ) : (
                                    <tr>
                                      <td>{distrito}</td>
                                      <td>{setor}</td>
                                      <td>{`${resultado[dre][distrito][setor]}`}</td>
                                    </tr>
                                  )
                                )
                              })
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