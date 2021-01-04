export const fluxoImoveis = [
  {
    titulo: "Análise prévia da SME",
    status: "",
    criado_em: "",
    usuario: null,
  },
  {
    titulo: "Solicitação COMAPRE",
    status: "",
    criado_em: "",
    usuario: null,
  },
  {
    titulo: "Relatório de vistoria",
    status: "",
    criado_em: "",
    usuario: null,
  },
  {
    titulo: "Laudo valor locatício",
    status: "",
    criado_em: "",
    usuario: null,
  },
  {
    titulo: "Retorno do cadastro",
    status: "",
    criado_em: "",
    usuario: null,
  },
  {
    titulo: "Envio DRE",
    status: "",
    criado_em: "",
    usuario: null,
  },
  {
    titulo: "Finalização",
    status: "",
    criado_em: "",
    usuario: null,
  },
];

export const tipoDeStatus = (status) => {
  switch (status) {
    case "SME analisou previamente":
    case "Enviado à COMAPRE":
      return "prosseguiu";
    case "CODAE não homologou":
      return "cancelado";
    case "CODAE pediu correção":
      return "questionado";
    case "Terceirizada tomou ciência":
    case "Escola solicitou inativação":
    case "CODAE autorizou inativação":
    case "Terceirizada tomou ciência da inativação":
      return "prosseguiu";
    case "Escola cancelou":
    case "DRE cancelou":
    case "Terminada por atingir data de término":
      return "cancelado";
    case "DRE não validou":
    case "CODAE negou":
    case "CODAE negou inativação":
    case "Terceirizada recusou":
      return "reprovado";
    case "Questionamento pela CODAE":
      return "questionado";
    case "CODAE pediu análise sensorial":
      return "questionado";
    default:
      return "";
  }
};

export const tipoDeStatusClasse = (status) => {
  return tipoDeStatus(status.status_evento_explicacao) === "prosseguiu"
    ? "active"
    : tipoDeStatus(status.status_evento_explicacao) === "reprovado"
    ? "disapproved"
    : tipoDeStatus(status.status_evento_explicacao) === "questionado"
    ? "questioned"
    : tipoDeStatus(status.status_evento_explicacao) === "cancelado"
    ? "cancelled"
    : "pending";
};

export const existeAlgumStatusFimDeFluxo = (logs) => {
  return (
    logs.findIndex(
      (log) =>
        log.status_evento_explicacao.includes("neg") ||
        log.status_evento_explicacao.includes("não") ||
        log.status_evento_explicacao.includes("cancel") ||
        log.status_evento_explicacao.includes("Terminada")
    ) === -1
  );
};
