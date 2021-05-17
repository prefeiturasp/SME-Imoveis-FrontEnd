import React from "react";
import { GraficoPorDRE } from "./componentes/GraficoPorDRE";
import { GraficoPorDistrito } from "./componentes/GraficoPorDistrito";
import { GraficoPorSetor } from "./componentes/GraficoPorSetor";
import "./style.scss";

export const Grafico = ({
  resultado,
  tipoResultado,
  todasDemandas,
  totalCadastrados,
}) => {

  return (
    <div className="card-body">
      <div className="container">
        <div className="row">
          {(tipoResultado === 'dre') && (
            <GraficoPorDRE
              resultado={resultado}
              todasDemandas={todasDemandas}
              totalCadastrados={totalCadastrados}
            />
          )}
          {(tipoResultado === 'distrito') && (
            <GraficoPorDistrito
              resultado={resultado}
              todasDemandas={todasDemandas}
              totalCadastrados={totalCadastrados}
            />
          )}
          {(tipoResultado === 'setor') && (
            <GraficoPorSetor
              resultado={resultado}
              todasDemandas={todasDemandas}
              totalCadastrados={totalCadastrados}
            />
          )}
        </div>
      </div>
    </div>
  );
};