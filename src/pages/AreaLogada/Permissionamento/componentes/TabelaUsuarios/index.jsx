import Botao from "components/Botao";
import { BUTTON_ICON, BUTTON_STYLE } from "components/Botao/constants";
import React from "react";

export const TabelaUsuarios = ({ usuarios }) => {
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
                    {usuario.perfil ? usuario.perfil.nome : "SEM PERMISSAO"}
                  </td>
                  <td>
                    <Botao style={BUTTON_STYLE.BLUE} icon={BUTTON_ICON.EDIT} />
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
