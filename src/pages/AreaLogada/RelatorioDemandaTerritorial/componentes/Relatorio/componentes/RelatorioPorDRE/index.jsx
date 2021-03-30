import React from "react";

export const RelatorioPorDRE = ({
    resultado,
    todasDemandas,
  }) => {
  
  return (
    <div>
      <table className="relatorio">
        <thead>
          {todasDemandas ? (
            <tr>
              <th>DRE</th>
              <th>Demanda Baixa 0 - 40</th>
              <th>Demanda Média 41 - 100</th>
              <th>Demanda Alta + 100</th>
            </tr>
          ) : (
            <tr>
              <th>DRE</th>
              <th>Cadastros</th>
            </tr>
          )}
        </thead>
        <tbody>
            { resultado && Object.keys(resultado).map((dre) =>  {
              return(
                todasDemandas ? (
                  <tr>
                    <td>{dre}</td>
                    <td>{`${resultado[dre]['demanda_1']}`}</td>
                    <td>{`${resultado[dre]['demanda_2']}`}</td>
                    <td>{`${resultado[dre]['demanda_3']}`}</td>
                  </tr>
                ) : (
                  <tr>
                    <td>{dre}</td>
                    <td>{`${resultado[dre]}`}</td>
                  </tr> 

                )
              )
            })}
        </tbody>
      </table>
    </div>
  )
}