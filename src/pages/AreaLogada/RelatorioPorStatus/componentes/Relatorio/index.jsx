import React, { useState } from "react";
import "./style.scss";


export const Relatorio = ({
  resultado,
}) => {
  return (
    <div>
      <table className="relatorio">
        <thead>
          <tr>
            <th></th>
            <th>Cadastrados</th>
            { resultado.em_analise !== 0 && (<th>Em análise</th>)}
            { resultado.finalizados_reprovados !== 0 && (<th>Finalizados reprovado</th>)}
            { resultado.aprovados_na_vistoria !== 0 && (<th>Aprovados vistoria</th>)}
            { resultado.reprovados_na_vistoria !== 0 && (<th>Reprovados vistoria</th>)}
            { resultado.cancelados !== 0 && (<th>Cancelados</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Quantidade de Imóveis</td>
            <td>{resultado.total}</td>
            { resultado.em_analise !== 0 && (<td>{resultado.em_analise}</td>)}
            { resultado.finalizados_reprovados !== 0 && (<td>{resultado.finalizados_reprovados}</td>)}
            { resultado.aprovados_na_vistoria !== 0 && (<td>{resultado.aprovados_na_vistoria}</td>)}
            { resultado.reprovados_na_vistoria !== 0 && (<td>{resultado.reprovados_na_vistoria}</td>)}
            { resultado.cancelados !== 0 && (<td>{resultado.cancelados}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};