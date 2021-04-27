import React from "react";
import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import { formataPayloadFiltros } from "../../helper"
import { exportarPDF, exportarCSV } from "services/relatorios.service";
import HTTP_STATUS from "http-status-codes";
import "./style.scss";

export const Relatorio = ({
  resultado,
  filtros,
  setCarregando,
  legenda,
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
    exportarPDF(params, 'imoveis/relatorio-por-status-pdf')
      .then((response) => {
        downloadArquivo(e, response, "relatorio-por-status.pdf")
        setCarregando(false);
      })
  }

  const exportarRelatorioCSV = (e) => {
    setCarregando(true);
    e.preventDefault();
    const params = formataPayloadFiltros(filtros);
    exportarCSV(params, 'imoveis/relatorio-por-status-xls')
      .then((response) => {
        if (response.status === HTTP_STATUS.OK){
          downloadArquivo(e, response, "relatorio-por-status.xlsx")
          setCarregando(false);
        }
      })
  }

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
      <div className="row mt-3 p-3">
        {legenda}
        <div className="col-6"></div>
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