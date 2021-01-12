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
    </>
  );
};
