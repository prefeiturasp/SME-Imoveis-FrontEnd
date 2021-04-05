export const getOpcoesArea = () => {
  const status = [
    { label: "Selecione a área", value: undefined },
    { label: "Todas", value: "todas" },
    { label: "Abaixo de 200 m²", value: 1 },
    { label: "Entre 200m² e 500m²", value: 2 },
    { label: "Acima de 500m²", value: 3 },
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
  if (filtros.ano !== '') {
    payload += `ano=${filtros.ano}&`;
  }
  if (filtros.areas) {
    for (let index = 0; index < filtros.areas.length; index++) {
      payload += `areas=${filtros.areas[index]}&`;
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
    if (resultado[key] !== 0 && key === 'ate_200') {
      labels.push('Abaixo de 200m²')
      data.push(((resultado[key]/resultado['total_imoveis'])*100).toFixed(2))
      backgroundColor.push('#FF6384')
      hoverBackgroundColor.push('#FF6384')
      somatorio += resultado[key]
    }
    if (resultado[key] !== 0 && key === '200_a_500') {
      labels.push('Entre 200m² e 500m²',)
      data.push(((resultado[key]/resultado['total_imoveis'])*100).toFixed(2))
      backgroundColor.push('#36A2EB')
      hoverBackgroundColor.push('#36A2EB')
      somatorio += resultado[key]

    }
    if (resultado[key] !== 0 && key === 'maior_500') {
      labels.push('Acima de 500m²',)
      data.push(((resultado[key]/resultado['total_imoveis'])*100).toFixed(2))
      backgroundColor.push('#FFCE56')
      hoverBackgroundColor.push('#FFCE56')
      somatorio += resultado[key]

    }
  }
  if(!labels.length && !data.length && !backgroundColor.length && !hoverBackgroundColor.length ){
    chart = {
      labels: ['Cadastros Realizados'],
      datasets: [{
        data: [resultado['total_imoveis']],
        backgroundColor: ["#074F79"],
        hoverBackgroundColor: ["#074F79"]
      }]
    }
  } else {
    if((resultado['total_imoveis'] - somatorio) > 0) {
      labels.push("Cadastros Não Filtrados")
      data.push(((resultado['total_imoveis'] - somatorio)/resultado['total_imoveis'])*100).toFixed(2)
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