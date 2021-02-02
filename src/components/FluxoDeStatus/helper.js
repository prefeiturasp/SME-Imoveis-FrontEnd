export const fluxoImoveis = [
  {
    titulo: "SME analisou previamente",
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
    titulo: "Agendamento da vistoria",
    status: "",
    criado_em: "",
    usuario: null,
  },
  {
    titulo: "Aguardando relatório de vistoria",
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
    titulo: "Aguardando laudo de valor locatício",
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
    case "Agendamento da vistoria":
    case "Aguardando relatório de vistoria":
    case "Aguardando laudo de valor locatício":
      return "prosseguiu";
    case "Finalizado - Área Insuficiente":
    case "Finalizado - Demanda Insuficiente":
    case "Finalizado - Não atende as necessidades da SME":
      return "reprovado";
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
        log.status_evento_explicacao.includes("Terminada") ||
        log.status_evento_explicacao.includes("Finalizado")
    ) === -1
  );
};
