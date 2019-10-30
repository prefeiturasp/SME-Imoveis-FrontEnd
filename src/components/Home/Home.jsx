import React, { Component } from "react";
import BasePage from "components/Base/BasePage";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <BasePage>


      
        <div id="conteudo" className="w-100 desenvolvimento-escolar">
          <div className="container pt-5 pb-5">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className="cor-azul mb-4">
                  Pesquise os principais números da escola
                </h2>
                <p className="mb-0">
                  Na plataforma Escola Aberta você não apenas encontra as
                  escolas municipais de São Paulo mais próximas ou faz uma busca
                  por nome ou por endereço. Para cada escola, é possível
                  consultar também as principais estatísticas: saber, por
                  exemplo, as séries, períodos, quantidade de turmas e de
                  estudantes, vagas oferecidas e atendidas, quantos e quais
                  profissionais trabalham lá, que ambientes a escola possui e
                  como está a avaliação dela no Índice de Desenvolvimento da
                  Educação (IDEP).
                </p>
              </div>
              <div className="col-lg-6">
              </div>
            </div>
          </div>
        </div>


      </BasePage>
    );
  }
}
