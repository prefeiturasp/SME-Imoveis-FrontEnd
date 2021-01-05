export const formataPaylaodBuscaCadastros = (values) => {
  let stringParams = "&";
  if (values.protocolo) {
    stringParams += `protocolo=${values.protocolo}&`;
  }
  if (values.endereco) {
    stringParams += `endereco=${values.endereco}&`;
  }
  if (values.area) {
    stringParams += `area=${values.area}&`;
  }
  if (values.dre) {
    stringParams += `dre=${values.dre}&`;
  }
  if (values.distrito) {
    stringParams += `distrito=${values.distrito}&`;
  }
  if (values.setor) {
    stringParams += `setor=${values.setor}&`;
  }
  if (values.status) {
    stringParams += `status=${values.status}&`;
  }
  if (values.demanda) {
    stringParams += `demanda=${values.demanda}&`;
  }
  if (values.data_inicio) {
    stringParams += `data_inicio=${values.data_inicio}&`;
  }
  if (values.data_fim) {
    stringParams += `data_fim=${values.data_fim}&`;
  }
  return stringParams.slice(0, -1);
};

export const formataCadastrosXLS = (cadastros) => {
  const header_styles = {
    alignment: {vertical: 'center', horizontal: 'center'},
    font: {sz: "12", bold: false},
    fill: {patternType: "solid", fgColor: {rgb: "8EAADC"}},
    border: {
      top: {style: 'thin', color: '24292E'},
      bottom: {style: 'thin', color: '24292E'},
      left: {style: 'thin', color: '24292E'},
      right: {style: 'thin', color: '24292E'},
    }
  };

  const data_styles_1 = {
    alignment: {vertical: 'center', horizontal: 'center'},
    font: {sz: "12", bold: false},
    fill: {patternType: "solid", fgColor: {rgb: "C5C5C5"}},
    border: {
      top: {style: 'thin', color: '24292E'},
      bottom: {style: 'thin', color: '24292E'},
      left: {style: 'thin', color: '24292E'},
      right: {style: 'thin', color: '24292E'},
    }
  };

  const data_styles_2 = {
    alignment: {vertical: 'center', horizontal: 'center'},
    font: {sz: "12", bold: false},
    fill: {patternType: "solid", fgColor: {rgb: "eaeaea"}},
    border: {
      top: {style: 'thin', color: '24292E'},
      bottom: {style: 'thin', color: '24292E'},
      left: {style: 'thin', color: '24292E'},
      right: {style: 'thin', color: '24292E'},
    }
  };

  let multiDataSet = [{columns: [
    {title: "Protocolo", width: {wpx: 200}, style: header_styles},
    {title: "Data do cadastro", width: {wpx: 200}, style: header_styles},
    {title: "Nome", width: {wpx: 200}, style: header_styles},
    {title: "E-mail", width: {wpx: 200}, style: header_styles},
    {title: "Celular", width: {wpx: 200}, style: header_styles},
    {title: "Telefone", width: {wpx: 200}, style: header_styles},
    {title: "CPF/CNPJ", width: {wpx: 200}, style: header_styles},
    {title: "CEP", width: {wpx: 200}, style: header_styles},
    {title: "Número IPTU", width: {wpx: 200}, style: header_styles},
    {title: "Endereço", width: {wpx: 200}, style: header_styles},
    {title: "Bairro", width: {wpx: 200}, style: header_styles},
    {title: "Cidade", width: {wpx: 200}, style: header_styles},
    {title: "UF", width: {wpx: 200}, style: header_styles},
    {title: "Area Construída", width: {wpx: 200}, style: header_styles},
    {title: "DRE", width: {wpx: 200}, style: header_styles},
    {title: "Distrito", width: {wpx: 200}, style: header_styles},
    {title: "Setor", width: {wpx: 200}, style: header_styles},
    {title: "Demanda", width: {wpx: 200}, style: header_styles},
    {title: "Status", width: {wpx: 200}, style: header_styles},
    {title: "Anexos", width: {wpx: 200}, style: header_styles},
  ], data: cadastros.map((cadastro, index) => {
      let anexos = '';
      if (cadastro.anexos.length) {
        for (let idx = 0; idx < cadastro.anexos.length; idx++) {
          anexos = `${anexos} ${cadastro.anexos[idx].arquivo} \n`
        }
      }
      return (
        [
          {value: cadastro.protocolo, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.criado_em, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.contato.nome, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.contato.email, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.contato.celular, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.contato.telefone, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.contato.cpf_cnpj, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.cep, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.numero_iptu || '', style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: `${cadastro.endereco} ${cadastro.numero}`, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.bairro, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.cidade, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.uf, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.area_construida || '', style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.setor ? cadastro.setor.dre.sigla : '', style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.setor ? cadastro.setor.distrito.nome : '', style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.setor ? cadastro.setor.codigo : '', style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.demandaimovel ? `B1: ${cadastro.demandaimovel.bercario_i} - B2: ${cadastro.demandaimovel.bercario_ii} - MG1: ${cadastro.demandaimovel.mini_grupo_i} - MG2: ${cadastro.demandaimovel.mini_grupo_i}` : '', style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: cadastro.status, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
          {value: anexos, style: ((index === 0 || (index % 2) === 0) ? data_styles_1 : data_styles_2)},
        ]
      );
    })
  }];
  return multiDataSet;
};
