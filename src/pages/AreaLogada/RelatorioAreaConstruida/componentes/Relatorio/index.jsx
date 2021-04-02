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
    exportarPDF(params, 'imoveis/relatorio-area-construida-pdf')
      .then((response) => {
        downloadArquivo(e, response, "relatorio-area-construida.pdf")
        setCarregando(false);
      })
  }

  const exportarRelatorioCSV = (e) => {
    setCarregando(true);
    e.preventDefault();
    const params = formataPayloadFiltros(filtros);
    exportarCSV(params, 'imoveis/relatorio-area-construida-xls')
      .then((response) => {
        if (response.status === HTTP_STATUS.OK){
          downloadArquivo(e, response, "relatorio-area-construida.xlsx")
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
            { resultado['ate_200'] !== 0 && (<th>Abaixo de 200m²</th>)}
            { resultado['200_a_500'] !== 0 && (<th>Entre 200m² e 500m²</th>)}
            { resultado['maior_500'] !== 0 && (<th>Acima de 500m²</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Quantidade de Imóveis</td>
            <td>{resultado['total_imoveis']}</td>
            { resultado['ate_200'] !== 0 && (<td>{resultado['ate_200']}</td>)}
            { resultado['200_a_500'] !== 0 && (<td>{resultado['200_a_500']}</td>)}
            { resultado['maior_500'] !== 0 && (<td>{resultado['maior_500']}</td>)}
          </tr>
        </tbody>
      </table>
      <div className="row mt-3 p-3">
        {/* <div className="offset-sm-6 col-sm-3 mb-3">
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
        </div> */}
      </div>
    </div>
  );
};