export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function readerFile(file) {
  let result_file = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const re = /(?:\.([^.]+))?$/;
      const base64 = reader.result.split("base64,")[1];
      return resolve({
        arquivo: `data:${file.type}/${re.exec(file.name)[1]};base64,${base64}`,
      });
    };
    reader.readAsDataURL(file);
  });
  return result_file;
}

export const getKey = (obj) => {
  return Object.keys(obj)[0];
};

export const getError = (obj) => {
  let result = "Erro ao cadastrar Imóvel";
  if (!obj[getKey(obj)]) {
    return "Erro ao cadastrar Imóvel";
  } else if (
    (obj[getKey(obj)][0] !== undefined &&
      typeof obj[getKey(obj)][0] !== "string") ||
    typeof obj[getKey(obj)] !== "string"
  ) {
    result = getError(obj[getKey(obj)]);
  } else {
    if (typeof obj[getKey(obj)] === "string") return obj[getKey(obj)];
    else return obj[getKey(obj)][0];
  }
  return result;
};

export const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf === "") return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  )
    return false;
  // Valida 1o digito
  let add = 0;
  let i, rev;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};

export const validarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj === "") return false;

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  )
    return false;

  // Valida DVs
  let i;
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;

  return true;
};

export const hasNumber = (myString) => {
  return /\d/.test(myString);
};

export const truncarString = (str, numeroMaximoChars) => {
  if (str.length > numeroMaximoChars) {
    return str.slice(0, numeroMaximoChars) + "...";
  } else {
    return str;
  }
};

export const tamanhoMaximoAnexos = (anexos, tamanho) => {
  let tamanhoAnexos = 0;
  anexos.forEach((anexo) => {
    tamanhoAnexos += anexo.size;
  });
  if (tamanhoAnexos >= tamanho) return true;
  return false;
};

export const getNome = () => {
  return localStorage.getItem("nome");
};

export const getPerfil = () => {
  return localStorage.getItem("perfil");
};

export const normalizarOptions = (options) => {
  const options_ = [{ label: "Selecione", value: undefined }];
  options.forEach((option) => {
    options_.push({ label: option.nome, value: option.id });
  });
  return options_;
};

export const normalizarSetores = (options) => {
  const options_ = [{ label: "Selecione", value: undefined }];
  options.forEach((option) => {
    options_.push({ label: option.codigo, value: option.codigo });
  });
  return options_;
};


export const normalizarPerfis = (options) => {
  const options_ = [
    { label: "Selecione", value: undefined }
  ];
  options.forEach((option) => {
    options_.push({ label: option.nome, value: option.id });
  });
  options_.push({ label: "SEM PERMISSAO", value: "SEM PERMISSAO" })
  return options_;
};

export const EH_PERFIL_ADMIN = localStorage.getItem("perfil") === "ADMIN";
export const EH_PERFIL_SECRETARIA = localStorage.getItem("perfil") === "SECRETARIA";
export const EH_PERFIL_DRE = localStorage.getItem("perfil") === "DRE";
export const EH_PERFIL_CONSULTA_SECRETARIA = localStorage.getItem("perfil") === "CONSULTA_SECRETARIA";