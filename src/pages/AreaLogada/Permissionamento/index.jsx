import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import {
  getDres,
  getPerfis,
  getSecretarias,
  getUsuarios,
} from "services/permissionamento.service";
import { Field, Form } from "react-final-form";
import Spin from "antd/es/spin";
import "antd/es/spin/style/css";
import { SelectText } from "components/Input/SelectText";
import { normalizarOptions, normalizarPerfis } from "helpers/utils";
import Botao from "components/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Botao/constants";
import { InputText } from "components/Input/InputText";
import { formataPaylaodBuscaUsuarios } from "./helper";
import { toastError } from "components/Toast/dialogs";
import "./style.scss";

const Permissionamento = () => {
  const [perfis, setPerfis] = useState(null);
  const [dres, setDres] = useState(null);
  const [secretarias, setSecretarias] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getPerfis()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setPerfis(response.data.results);
        }
      })
      .catch(() => {
        setErro(true);
      });
    getDres()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setDres(response.data.results);
        }
      })
      .catch(() => {
        setErro(true);
      });
    getSecretarias()
      .then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setSecretarias(response.data.results);
        }
      })
      .catch(() => {
        setErro(true);
      });
  }, []);

  const onSubmit = async (values) => {
    const response = await getUsuarios(formataPaylaodBuscaUsuarios(values));
    if (!response) toastError("Erro ao carregar os dados dos usuários");
    else if (response.status === HTTP_STATUS.OK) {
      setUsuarios(response.data);
    }
  };

  const LOADING = !dres || !perfis || !secretarias;

  return (
    <PaginaHeaderSidebar>
      <div className="permissionamento">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Gestão de Permissões</h1>
            {LOADING && !erro && <div>Carregando...</div>}
            {erro && <div>Erro ao carregar dados do servidor</div>}
            {!LOADING && (
              <Form onSubmit={onSubmit}>
                {({ handleSubmit, form, submitting, values }) => (
                  <Spin spinning={submitting}>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <Field
                            component={SelectText}
                            name="secretaria"
                            label="Pesquisa por Secretaria"
                            options={normalizarOptions(secretarias)}
                            naoDesabilitarPrimeiraOpcao
                          />
                        </div>
                        <div className="col-sm-6 col-12">
                          <Field
                            component={SelectText}
                            name="dre"
                            label="Pesquisa por DRE"
                            options={normalizarOptions(dres)}
                            naoDesabilitarPrimeiraOpcao
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 col-12">
                          <Field
                            component={InputText}
                            esconderAsterisco
                            label="Nome do usuário"
                            name="nome"
                            placeholder={"Digite o nome do usuário"}
                            type="text"
                          />
                        </div>
                        <div className="col-sm-4 col-12">
                          <Field
                            component={SelectText}
                            name="perfil"
                            label="Tipo de permissão"
                            options={normalizarPerfis(perfis)}
                            naoDesabilitarPrimeiraOpcao
                          />
                        </div>
                        <div className="col-sm-2 mt-auto mb-2 col-12">
                          <Botao
                            type={BUTTON_TYPE.BUTTON}
                            style={BUTTON_STYLE.BLUE}
                            className="col-12"
                            texto="Limpar"
                            onClick={() => form.reset()}
                          />
                        </div>
                        <div className="col-sm-2 mt-auto mb-2 col-12">
                          <Botao
                            type={BUTTON_TYPE.SUBMIT}
                            style={BUTTON_STYLE.BLUE}
                            className="col-12"
                            texto="Filtrar"
                          />
                        </div>
                      </div>
                    </form>
                  </Spin>
                )}
              </Form>
            )}
            {usuarios && usuarios.length === 0 && (
              <div className="mt-3">
                Não há usuários para os filtros utilizados.
              </div>
            )}
            {usuarios && usuarios.length > 0 && (
              <table className="mt-5 usuarios">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Secretaria</th>
                    <th>DRE</th>
                    <th>Setor</th>
                    <th>Tipo de Permissão</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => {
                    return (
                      <tr>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.secretaria && usuario.secretaria.nome}</td>
                        <td>{usuario.setor && usuario.setor.dre}</td>
                        <td>{usuario.setor && usuario.setor.codigo}</td>
                        <td>
                          {usuario.perfil
                            ? usuario.perfil.nome
                            : "SEM PERMISSAO"}
                        </td>
                        <td>
                          <Botao
                            style={BUTTON_STYLE.BLUE}
                            icon={BUTTON_ICON.EDIT}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </PaginaHeaderSidebar>
  );
};

export default Permissionamento;
