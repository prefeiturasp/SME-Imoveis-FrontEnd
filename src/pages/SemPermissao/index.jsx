import { HeaderLogo } from "components/HeaderLogo";
import { Link, useHistory } from "react-router-dom";
import React from "react";

export const SemPermissao = () => {
  const history = useHistory();

  return (
    <div>
      <HeaderLogo />
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card mt-3">
            <div className="card-body">
              Você ainda não possui permissão para o Ambiente Administrativo do
              Portal de Imóveis. Aguarde um administrador do sistema liberar o
              acesso.
              <p className="text-center pt-3">
                <Link
                  className="hyperlink"
                  to="#"
                  data-cy="login"
                  onClick={() => history.push("/login")}
                >
                  voltar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
