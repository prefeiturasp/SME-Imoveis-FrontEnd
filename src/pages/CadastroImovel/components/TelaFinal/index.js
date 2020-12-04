import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const TelaFinal = ({ protocoloCadastro }) => {
  const history = useHistory();

  return (
    <div className="tela-final-cadastro-imovel">
      <h5>Cadastro realizado com sucesso!</h5>
      <p>
        {" "}
        Recebemos o cadastro do imóvel. Você receberá um e-mail com essa
        informação. A área técnica da Secretaria Municipal de Educação analisará
        as condições do imóvel e demanda cadastrada na região e enviará parecer
        neste mesmo e-mail.
      </p>
      <br />
      <b>Segue o número de protocolo:</b>
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <div className="protocolo-box">{protocoloCadastro}</div>
      </div>
      <br />
      <br />

      <div className="row">
        <div className="col">
          <Button
            type="button"
            variant="primary"
            className="ml-3 float-right mb-3"
            onClick={() => history.go(0)}
          >
            Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TelaFinal;
