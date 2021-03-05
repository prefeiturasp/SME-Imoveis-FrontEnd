import React from "react";
import "./styles.scss";

const CadastroRealizado = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
        <p>
          Você realizou cadastro de imóvel, <b>protocolo nº {imovel.imovel.protocolo}</b>,
            conforme dados a seguir.
        </p>
        <p>
          A área técnica da Secretaria Municipal de Educação analisará a documentação e
            as condições do imóvel e enviará retorno com o parecer no e-mail cadastrado.
            Favor aguardar nosso contato.
        </p>
      </div>
    </>
  );
}

export default CadastroRealizado;
