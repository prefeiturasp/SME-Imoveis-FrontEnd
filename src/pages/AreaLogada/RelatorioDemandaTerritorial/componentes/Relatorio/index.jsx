import React from "react";
import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import { formataPayloadFiltros } from "../../helper"
import { exportarPDF, exportarCSV } from "services/relatorios.service";
import { RelatorioPorDRE } from "./componentes/RelatorioPorDRE";
import { RelatorioPorDistrito } from "./componentes/RelatorioPorDistrito";
import { RelatorioPorSetor } from "./componentes/RelatorioPorSetor";
import HTTP_STATUS from "http-status-codes";
import "./style.scss";

export const Relatorio = ({
  resultado,
  filtros,
  setCarregando,
  tipoResultado,
  todasDemandas,
}) => {

  const downloadArquivo = (e, response, filename) => {
    if (!window.confirm('Deseja gerar arquivo?')) {
      e.stopPropagation();
    } else {
      var url = window.URL.createObjectURL(response.data);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }

  const exportarRelatorioPDF = (e) => {
    setCarregando(true);
    e.preventDefault();
    const params = formataPayloadFiltros(filtros);
    exportarPDF(params)
      .then((response) => {
        downloadArquivo(e, response, "relatorio-por-demanda-territorial.pdf")
        setCarregando(false);
      })
  }

  const exportarRelatorioCSV = (e) => {
    setCarregando(true);
    e.preventDefault();
    const params = formataPayloadFiltros(filtros);
    exportarCSV(params, 'imoveis/relatorio-por-demanda-xls')
      .then((response) => {
        if (response.status === HTTP_STATUS.OK){
          downloadArquivo(e, response, "relatorio-por-demanda-territorial.xlsx")
          setCarregando(false);
        }
      })
  }

  return (
    <div className="mb-3">
      {(tipoResultado === 'dre') && (
        <RelatorioPorDRE
          resultado={resultado}
          todasDemandas={todasDemandas}
        />
      )}
      {(tipoResultado === 'distrito') && (
        <RelatorioPorDistrito
          resultado={resultado}
          todasDemandas={todasDemandas}
        />
      )}
      {(tipoResultado === 'setor') && (
        <RelatorioPorSetor
          resultado={resultado}
          todasDemandas={todasDemandas}
        />
      )}
      <div className="row p-3">
        <div className="offset-sm-6 col-sm-3 mb-3">
          <Botao
            icon={BUTTON_ICON.FILE_ALT}
            style={BUTTON_STYLE.BLUE_OUTLINE}
            className="col-12"
            texto="Exportar PDF"
            onClick={(e) => exportarRelatorioPDF(e)}
          />
        </div>
        <div className="col-sm-3 mb-3">
          <Botao
            icon={BUTTON_ICON.FILE_ALT}
            style={BUTTON_STYLE.BLUE_OUTLINE}
            className="col-12"
            texto="Exportar Excel"
            onClick={(e) => exportarRelatorioCSV(e)}
          />
        </div>
      </div>
    </div>
  );
};