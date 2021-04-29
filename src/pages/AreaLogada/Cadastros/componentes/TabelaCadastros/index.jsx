import React, { useState } from "react";
import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import { TabelaDemanadas } from "../TabelaDemandas";
import { formataPaylaodBuscaCadastros } from "../../helper";
import { Paginacao } from "components/Paginacao";
import Spin from "antd/es/spin";
import { getCadastros, exportarCadastros } from "services/cadastros.service";
import { toastError } from "components/Toast/dialogs";
import HTTP_STATUS from "http-status-codes";
import { useHistory } from "react-router-dom";

export const TabelaCadastros = ({
  cadastros,
  total,
  lastSearchParams,
  setCadastros,
  setCarregando,
  carregando,
}) => {
  const [hovered] = useState([]);
  const [, updateState] = React.useState();

  const forceUpdate = React.useCallback(() => updateState({}), []);
  const history = useHistory();

  const changeIcon = (e, idx) => {
    var expanded = document
      .getElementById(`expandButton-${idx}`)
      .getAttribute("aria-expanded");
    var icon = document.getElementById(`icon-${idx}`);
    if (expanded === "true") {
      icon.classList.remove("fa-angle-down");
      icon.classList.add("fa-angle-up");
    }
    if (expanded === "false") {
      icon.classList.remove("fa-angle-up");
      icon.classList.add("fa-angle-down");
    }
  };

  const getCadastrosPorPagina = (pagina, lastSearchParams) => {
    getCadastros(formataPaylaodBuscaCadastros(lastSearchParams), pagina).then(
      (response) => {
        setCadastros(response.data.results);
      }
    );
  };

  const exportarCSV = async (e) => {
    setCarregando(true)
    const response = await exportarCadastros(formataPaylaodBuscaCadastros(lastSearchParams));
    if (!response) toastError("Erro ao carregar os dados dos cadastros realizados");
    else if (response.status === HTTP_STATUS.OK) {
      setCarregando(false);
      confirmarExportacao(e, response.data);
    }
  };

  const confirmarExportacao = (e, data) => {
    e.preventDefault();
    if (!window.confirm('Deseja gerar arquivo?')) {
      e.stopPropagation();
    } else {
      var url = window.URL.createObjectURL(data);
      var a = document.createElement('a');
      a.href = url;
      a.download = "cadastros-realizados.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <>
      {cadastros && cadastros.length === 0 && (
        <div className="mt-3">Não há cadastros para os filtros utilizados.</div>
      )}
      {cadastros && cadastros.length > 0 && (
        <Spin spinning={carregando}>
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
                  return [
                    <tr
                      className={`${hovered.includes(idx) && "hovered"}`}
                      onMouseEnter={() => {
                        hovered.push(idx);
                        forceUpdate();
                      }}
                      onMouseLeave={() => {
                        hovered.pop();
                        forceUpdate();
                      }}
                    >
                      <td
                        onClick={() =>
                          history.push(
                            `/adm-imoveis/detalhamento-cadastro?uuid=${cadastro.id}`
                          )
                        }
                      >
                        {`${cadastro.protocolo}`}
                      </td>
                      <td
                        onClick={() =>
                          history.push(
                            `/adm-imoveis/detalhamento-cadastro?uuid=${cadastro.id}`
                          )
                        }
                      >{`DRE - ${cadastro.setor &&
                        cadastro.setor.dre.sigla}`}</td>
                      <td
                        onClick={() =>
                          history.push(
                            `/adm-imoveis/detalhamento-cadastro?uuid=${cadastro.id}`
                          )
                        }
                      >
                        {cadastro.setor && cadastro.setor.distrito.nome}
                      </td>
                      <td
                        onClick={() =>
                          history.push(
                            `/adm-imoveis/detalhamento-cadastro?uuid=${cadastro.id}`
                          )
                        }
                      >
                        {cadastro.setor && cadastro.setor.codigo}
                      </td>
                      <td
                        onClick={() =>
                          history.push(
                            `/adm-imoveis/detalhamento-cadastro?uuid=${cadastro.id}`
                          )
                        }
                      >{`${cadastro.endereco} ${cadastro.numero}`}</td>
                      <td>
                        {cadastro.demandaimovel && cadastro.demandaimovel.total}
                      </td>
                      <td
                        onClick={() =>
                          history.push(
                            `/adm-imoveis/detalhamento-cadastro?uuid=${cadastro.id}`
                          )
                        }
                      >
                        {cadastro.status}
                      </td>
                      <td
                        onClick={() =>
                          history.push(
                            `/adm-imoveis/detalhamento-cadastro?uuid=${cadastro.id}`
                          )
                        }
                      >
                        {cadastro.criado_em}
                      </td>
                      <td
                        onClick={() =>
                          history.push(
                            `/adm-imoveis/detalhamento-cadastro?uuid=${cadastro.id}`
                          )
                        }
                      >
                        {cadastro.area_construida | 0}
                      </td>
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
                    </tr>,
                    <tr className="collapse" id={`demandaCompleta-${idx}`}>
                      <td colSpan="10" className="p-0">
                        <TabelaDemanadas
                          id={idx}
                          demanda={cadastro.demandaimovel}
                        />
                      </td>
                    </tr>,
                  ];
                })}
              </tbody>
            </table>
            <div className="row mt-2">
              <div className="col-12">
                <p className="results">
                  <i>{`Foram encontrados ${total} resultados para a pesquisa`}</i>
                </p>
              </div>
            </div>
            <div className="row mt-2 ">
              <div className="offset-sm-10 col-sm-2 mb-2 col-12">
                <Botao
                  icon={BUTTON_ICON.FILE_ALT}
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  className="col-12"
                  texto="Exportar"
                  onClick={(e) => exportarCSV(e)}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                {cadastros && total && (
                  <div>
                    <Paginacao
                      onChange={(pagina) =>
                        getCadastrosPorPagina(pagina, lastSearchParams)
                      }
                      total={total}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Spin>
      )}
    </>
  );
};
