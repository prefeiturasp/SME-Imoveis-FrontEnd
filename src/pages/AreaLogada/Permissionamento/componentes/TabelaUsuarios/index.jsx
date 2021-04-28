import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import React from "react";
import { formataUsuario } from "../../helper";

export const TabelaUsuarios = ({ usuarios, setShowModal, setUsuario }) => {
  return (
    <>
      {usuarios && usuarios.length === 0 && (
        <div className="mt-3">Não há usuários para os filtros utilizados.</div>
      )}
      {usuarios && usuarios.length > 0 && (
        <table className="mt-5 usuarios">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Secretaria</th>
              <th>DRE</th>
              <th>Tipo de Permissão</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios
              .filter((usuario) => usuario.nome !== " ")
              .map((usuario) => {
                return (
                  <tr>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.secretaria && usuario.secretaria.nome}</td>
                    <td>{usuario.setor && usuario.setor.dre.sigla}</td>
                    <td>
                      {usuario.perfil ? usuario.perfil.nome : "SEM PERMISSAO"}
                    </td>
                    <td>
                      <Botao
                        onClick={() => {
                          setShowModal(true);
                          setUsuario(formataUsuario(usuario));
                        }}
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
      {usuarios && usuarios.length > 0 && (
        <div className="mt-3 legenda">
          <p>
            Tipos de permissionamento referem-se á:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  ADMIN: refere-se a permissão total do sistema onde a SME terá 
                  no máximo 3 usuários.
                </li>
                <li>
                  SECRETARIA: refere-se a permissão total do sistema, exceto ao 
                  processo de permissionamento onde cada secretaria terá no máximo 
                  3 usuários.
                </li>
                <li>
                  CONSULTA SECRETARIA: refere-se a permissão de consulta do sistema.
                </li>
                <li>
                  DRE: refere-se a permissão de consulta do sistema referente a sua DRE de acesso.
                </li>
                <li>
                  SEM PERMISSÃO: usuário não terá acesso ao sistema.
                </li>
              </ul>
            </div>
            <div className="offset-6"></div>
          </div>
        </div>
      )}
    </>
  );
};
