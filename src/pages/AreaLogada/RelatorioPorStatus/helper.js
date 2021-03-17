export const getOpcoesStatus = () => {
  const status = [
    { label: "Selecione os status", value: undefined },
    { label: "Todos", value: "todos" },
    { label: "Em análise", value: 1 },
    { label: "Aprovados vistoria", value: 2 },
    { label: "Reprovados vistoria", value: 3 },
    { label: "Finalizados reprovado", value: 4 },
    { label: "Cancelados", value: 5 },
  ];
  return status;
};

export const normalizaOpcoesAnos = (data) => {
  var anos = [{ label: "Selecione os status", value: undefined }, 
              { label: "Todos", value: "todos" }];
  for (let idx = 0; idx < data.length; idx++) {
    anos.push({label: data[idx], value: data[idx]});
  }
  return anos;
};

export const formataPayloadFiltros = (filtros) => {
  var payload = "&";
  if (filtros.anos) {
    for (let index = 0; index < filtros.anos.length; index++) {
      payload += `anos=${filtros.anos[index]}&`;
    }
  }
  if (filtros.status) {
    for (let index = 0; index < filtros.status.length; index++) {
      payload += `status=${filtros.status[index]}&`;
    }
  }
  return payload;
}

export const formataGrafico = (resultado) => {
  var labels = [];
  var data = [];
  var backgroundColor = [];
  var hoverBackgroundColor = [];
  var somatorio = 0;
  var chart = {};
  for (var key in resultado) {
    if (resultado[key] !== 0 && key === 'em_analise') {
      labels.push('Em análise')
      data.push(((resultado.em_analise/resultado.total)*100).toFixed(2))
      backgroundColor.push('#FF6384')
      hoverBackgroundColor.push('#FF6384')
      somatorio += resultado.em_analise
    }
    if (resultado[key] !== 0 && key === 'finalizados_reprovados') {
      labels.push('Finalizados reprovados',)
      data.push(((resultado.finalizados_reprovados/resultado.total)*100).toFixed(2))
      backgroundColor.push('#36A2EB')
      hoverBackgroundColor.push('#36A2EB')
      somatorio += resultado.finalizados_reprovados

    }
    if (resultado[key] !== 0 && key === 'aprovados_na_vistoria') {
      labels.push('Aprovados vistoria',)
      data.push(((resultado.aprovados_na_vistoria/resultado.total)*100).toFixed(2))
      backgroundColor.push('#FFCE56')
      hoverBackgroundColor.push('#FFCE56')
      somatorio += resultado.aprovados_na_vistoria

    }
    if (resultado[key] !== 0 && key === 'reprovados_na_vistoria') {
      labels.push('Reprovados vistoria',)
      data.push(((resultado.reprovados_na_vistoria/resultado.total)*100).toFixed(2))
      backgroundColor.push('#8ee886')
      hoverBackgroundColor.push('#8ee886')
      somatorio += resultado.reprovados_na_vistoria

    }
    if (resultado[key] !== 0 && key === 'cancelados') {
      labels.push('Cancelados')
      data.push(((resultado.cancelados/resultado.total)*100).toFixed(2))
      backgroundColor.push('#762487')
      hoverBackgroundColor.push('#762487')
      somatorio += resultado.cancelados

    }
  }
  if(!labels.length && !data.length && !backgroundColor.length && !hoverBackgroundColor.length ){
    chart = {
      labels: ['Cadastros Realizados'],
      datasets: [{
        data: [resultado.total],
        backgroundColor: ["#074F79"],
        hoverBackgroundColor: ["#074F79"]
      }]
    }
  } else {
    if((resultado.total - somatorio) > 0) {
      labels.push("Cadastros Não Filtrados")
      data.push(((resultado.total - somatorio)/resultado.total)*100).toFixed(2)
      backgroundColor.push('#8d65bf')
      hoverBackgroundColor.push('#8d65bf')
    }
    chart = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor 
      }]
    }; 
  }
  return chart

}