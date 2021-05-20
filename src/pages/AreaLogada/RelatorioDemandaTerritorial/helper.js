export const getOpcoesDemandas = () => {
  const demandas = [
    { label: "Selecione as demandas", value: undefined },
    { label: "Todos", value: "todos" },
    { label: "Baixa (até 40 cadastros)", value: 1 },
    { label: "Média (de 40 a 100 cadastros)", value: 2 },
    { label: "Alta (acima de 100 cadastros)", value: 3 },
  ];
  return demandas;
};

export const normalizaOpcoesAnos = (data) => {
  var anos = [{ label: "Selecione os status", value: undefined },
  { label: "Todos", value: "todos" }];
  for (let idx = 0; idx < data.length; idx++) {
    anos.push({ label: data[idx], value: data[idx] });
  }
  return anos;
};

export const normalizaOpcoesDres = (data) => {
  const dres_ = [{ label: "Selecione as DREs", value: undefined },
  { label: "Todas", value: "todas" }];
  data.forEach((option) => {
    dres_.push({ label: option.nome, value: option.id });
  });
  return dres_;
};

export const normalizaOpcoesDistritos = (data) => {
  const distritos_ = [{ label: "Selecione os Distritos", value: undefined },
  { label: "Todos", value: "todos" }];
  data.forEach((option) => {
    distritos_.push({ label: option.nome, value: option.id });
  });
  return distritos_;
};

export const normalizaOpcoesSetores = (data) => {
  const setores_ = [{ label: "Selecione os Setores", value: undefined },
  { label: "Todos", value: "todos" }];
  data.forEach((option) => {
    setores_.push({ label: option.codigo, value: option.codigo });
  });
  return setores_;
};

export const formataPayloadFiltros = (filtros) => {
  var payload = "&";
  if (filtros.anos) {
    for (let index = 0; index < filtros.anos.length; index++) {
      payload += `anos=${filtros.anos[index]}&`;
    }
  }
  if (filtros.dres !== '') {
    payload += `dres=${filtros.dres}&`;
  }
  if (filtros.distritos) {
    for (let index = 0; index < filtros.distritos.length; index++) {
      payload += `distritos=${filtros.distritos[index]}&`;
    }
  }
  if (filtros.setores) {
    for (let index = 0; index < filtros.setores.length; index++) {
      payload += `setores=${filtros.setores[index]}&`;
    }
  }
  if (filtros.demandas) {
    for (let index = 0; index < filtros.demandas.length; index++) {
      payload += `demandas=${filtros.demandas[index]}&`;
    }
  }
  if (filtros.tipo_resultado) {
    payload += `tipo_resultado=${filtros.tipo_resultado}&`;
  }
  return payload;
}

export const formataPayloadDistritos = (dres) => {
  var payload = "&";
  for (let index = 0; index < dres.length; index++) {
    payload += `dre=${dres[index]}&`;
  }
  return payload;
}

export const formataPayloadSetores = (distritos) => {
  var payload = "&";
  for (let index = 0; index < distritos.length; index++) {
    payload += `distrito=${distritos[index]}&`;
  }
  return payload;
}

export const formataGraficoDRE = (resultado, todasDemandas) => {
  if (todasDemandas) {
    var data_demanda_baixa = []
    var data_demanda_media = []
    var data_demanda_alta = []
    var labels = []
    for (var key in resultado) {
      labels.push(key);
      data_demanda_baixa.push(resultado[key]['demanda_1'])
      data_demanda_media.push(resultado[key]['demanda_2'])
      data_demanda_alta.push(resultado[key]['demanda_3'])
    }
    var chart = {
      labels: labels,
      datasets: [
        {
          label: "Demanda Baixa",
          data: data_demanda_baixa,
          backgroundColor: '#4472C4',
        },
        {
          label: "Demanda Média",
          data: data_demanda_media,
          backgroundColor: '#ED7D31',
        },
        {
          label: "Demanda Alta",
          data: data_demanda_alta,
          backgroundColor: '#548235',
        },
      ]
    }
  } else {
    var labels = Object.keys(resultado).map((dre) => dre);
    var backgroundColor = labels.map(() => '#4472C4');
    var hoverBackgroundColor = backgroundColor;
    var data = labels.map((label) => resultado[label]);
    var chart = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor
      }]
    }
  }
  return chart
}

export const formataGraficoDistrito = (resultado, todasDemandas) => {
  if (todasDemandas) {
    var data_demanda_baixa = []
    var data_demanda_media = []
    var data_demanda_alta = []
    var labels = []
    for (var dre in resultado) {
      for (var distrito in resultado[dre]) {
        labels.push(distrito);
        data_demanda_baixa.push(resultado[dre][distrito]['demanda_1'])
        data_demanda_media.push(resultado[dre][distrito]['demanda_2'])
        data_demanda_alta.push(resultado[dre][distrito]['demanda_3'])
      }
    }
    var chart = {
      labels: labels,
      datasets: [
        {
          label: "Demanda Baixa",
          data: data_demanda_baixa,
          backgroundColor: '#4472C4',
        },
        {
          label: "Demanda Média",
          data: data_demanda_media,
          backgroundColor: '#ED7D31',
        },
        {
          label: "Demanda Alta",
          data: data_demanda_alta,
          backgroundColor: '#548235',
        },
      ]
    }
  } else {
    var labels = [];
    var data = [];
    for (var dre in resultado) {
      for (var distrito in resultado[dre]) {
        labels.push(distrito);
        data.push(resultado[dre][distrito])
      }
    }
    var backgroundColor = labels.map(() => '#4472C4');
    var hoverBackgroundColor = backgroundColor;
    var chart = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor
      }]
    }
  }
  return chart
}

export const formataGraficoSetor = (resultado, todasDemandas) => {
  if (todasDemandas) {
    var data_demanda_baixa = []
    var data_demanda_media = []
    var data_demanda_alta = []
    var labels = []
    for (var dre in resultado) {
      for (var distrito in resultado[dre]) {
        for (var setor in resultado[dre][distrito]) {
          labels.push(distrito);
          data_demanda_baixa.push(resultado[dre][distrito][setor]['demanda_1'])
          data_demanda_media.push(resultado[dre][distrito][setor]['demanda_2'])
          data_demanda_alta.push(resultado[dre][distrito][setor]['demanda_3'])
        }
      }
    }
    var chart = {
      labels: labels,
      datasets: [
        {
          label: "Demanda Baixa",
          data: data_demanda_baixa,
          backgroundColor: '#4472C4',
        },
        {
          label: "Demanda Média",
          data: data_demanda_media,
          backgroundColor: '#ED7D31',
        },
        {
          label: "Demanda Alta",
          data: data_demanda_alta,
          backgroundColor: '#548235',
        },
      ]
    }
  } else {
    var labels = [];
    var data = [];
    for (var dre in resultado) {
      for (var distrito in resultado[dre]) {
        for (var setor in resultado[dre][distrito]) {
          labels.push(setor);
          data.push(resultado[dre][distrito][setor])
        }
      }
    }
    var backgroundColor = labels.map(() => '#4472C4');
    var hoverBackgroundColor = backgroundColor;
    var chart = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor
      }]
    }
  }
  return chart
}