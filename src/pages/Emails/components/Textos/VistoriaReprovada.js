import React from "react";
import "./styles.scss";

const VistoriaReprovada = (imovel) => {
  return(
    <>
      <div className="title-email">
        <label className="title-content-email">
          Prezado(a) Sr(a). {imovel.imovel.proponente_nome} (proprietário/representante legal)
        </label>
      </div>
      <div className="textarea-email">
          <p>
            Conforme as legislações que norteiam a implantação de Centros de Educação 
              Infantil, os imóveis necessitam de um mínimo de espaço para contemplar 
              todos os ambientes obrigatórios:
            <ul>
              <li>
                ambientes internos: sala de atividades, fraldário, refeitório, banheiro 
                  infantil;
              </li>
              <li>
                ambientes externos: áreas ao ar livre (em média 20% do total da área construída);
              </li>
              <li>
                ambientes de apoio ao trabalho pedagógico: secretaria, sala de direção, 
                  coordenação pedagógica e professores;
              </li>
              <li>
                ambientes de serviços: cozinha, lactário, despensa, almoxarifado, depósito 
                  de lixo, banheiro adulto, lavanderia.
              </li>
            </ul>
              Para comportar essa exigência, se faz necessário que o imóvel tenha, pelo menos 200m² de área construída. Cabe destacar, também, que são imprescindíveis janelas que permitam a ventilação e iluminação natural e visibilidade para o ambiente externo, com peitoril de acordo com a altura das crianças, garantindo segurança.
              Nesse sentido, a Secretaria Municipal de Educação concluiu que o imóvel de <b>protocolo nº {imovel.imovel.protocolo}</b>, conforme dados a seguir, não apresenta condições para implantação de CEI - Centro de Educação Infantil.
          </p>
      </div>
    </>
  );
}

export default VistoriaReprovada;
