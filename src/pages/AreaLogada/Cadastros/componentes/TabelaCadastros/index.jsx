import React from "react";
import { formataCadastrosXLS } from "../../helper";
import ReactExport from 'react-data-export';
import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import { TabelaDemanadas } from "../TabelaDemandas";
import { formataPaylaodBuscaCadastros } from "../../helper";
import { Paginacao } from "components/Paginacao";
import { getCadastros } from "services/cadastros.service";

export const TabelaCadastros = ({
  cadastros, 
  dataToExport, 
  total, 
  lastSearchParams,
  setCadastros,
}) => {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const data = dataToExport && (formataCadastrosXLS(dataToExport));
  console.log(cadastros)

  const changeIcon = (e, idx) => {
    var expanded = document.getElementById(`expandButton-${idx}`).getAttribute("aria-expanded");
    var icon = document.getElementById(`icon-${idx}`);
    if (expanded === "true") {
      icon.classList.remove('fa-angle-down')
      icon.classList.add('fa-angle-up')
    } 
    if (expanded === "false") {
      icon.classList.remove('fa-angle-up')
      icon.classList.add('fa-angle-down')
    }
  }

  const getCadastrosPorPagina = (pagina, lastSearchParams) => {
    getCadastros(formataPaylaodBuscaCadastros(lastSearchParams), pagina).then((response) => {
      setCadastros(response.data[1]);
    });
  };

  return (
    <>
      {cadastros && cadastros.length === 0 && (
        <div className="mt-3">Não há cadastros para os filtros utilizados.</div>
      )}

      {cadastros && cadastros.length > 0 && (
        <div>
          <table className="mt-5 cadastros">
            <thead>
              <tr>
                <th>Protocolo</th>
                <th className="dre">DRE</th>
                <th>Distrito</th>
                <th>Setor</th>
                <th className="endereco">Endereço</th>
                <th className="demanda">Demanda Total</th>
                <th>Status</th>
                <th>Cadastro</th>
                <th>Área m²</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              {cadastros.map((cadastro, idx) => {
                return (
                  <>
                    <tr>
                      <td>
                        {`${cadastro.protocolo.split('/')[0]}/${cadastro.protocolo.split('/')[1].charAt(2)}${cadastro.protocolo.split('/')[1].charAt(3)}`}
                      </td>
                      <td>{`DRE - ${cadastro.setor && cadastro.setor.dre.sigla}`}</td>
                      <td>{cadastro.setor && cadastro.setor.distrito.nome}</td>
                      <td>{cadastro.setor && cadastro.setor.codigo}</td>
                      <td>{`${cadastro.endereco} ${cadastro.numero}`}</td>
                      <td>{cadastro.demandaimovel && cadastro.demandaimovel.total}</td>
                      <td>{cadastro.status && cadastro.status}</td>
                      <td>{cadastro.criado_em}</td>
                      <td>{cadastro.area_construida && cadastro.area_construida}</td>
                      <td>
                        <button
                          className={`nav-link collapsed general-button ${BUTTON_STYLE.BLUE} col-12`}
                          type="button"
                          id={`expandButton-${idx}`}
                          data-toggle="collapse"
                          data-target={`#demandaCompleta-${idx}`}
                          aria-controls="collapseTwo"
                          aria-expanded="false"
                          onClick={(e) => changeIcon(e, idx)}
                        >
                          <i id={`icon-${idx}`} className="fas fa-angle-down"></i>
                        </button>
                      </td>
                    </tr>
                    <tr className="collapse" id={`demandaCompleta-${idx}`}>
                      <td colSpan="10" className='p-0'>
                       <TabelaDemanadas id={idx} demanda={cadastro.demandaimovel}/>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="row mt-2">
            <div className="col-12">
              <p className="results"><i>{`Foram encontrados ${total} resultados para a pesquisa`}</i></p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              {(cadastros && total) && (
                <div>
                  <Paginacao
                    onChange={(pagina) => getCadastrosPorPagina(pagina, lastSearchParams)}
                    total={total}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
