import { Notificacoes } from "pages/AreaLogada/Notificacoes";
import Permissionamento from "pages/AreaLogada/Permissionamento";
import Cadastros from "pages/AreaLogada/Cadastros";
import { DetalhamentoCadastro } from "pages/AreaLogada/DetalhamentoCadastro";
import RelatorioPorStatus from "pages/AreaLogada/RelatorioPorStatus";
import RelatorioDemandaTerritorial from "pages/AreaLogada/RelatorioDemandaTerritorial";
import RelatorioAreaConstruida from "pages/AreaLogada/RelatorioAreaConstruida";

export const privateRoutes = [
  {
    path: "/adm-imoveis",
    component: Notificacoes,
    exact: true,
  },
  {
    path: "/adm-imoveis/permissionamento",
    component: Permissionamento,
    exact: true,
  },
  {
    path: "/adm-imoveis/cadastros-realizados",
    component: Cadastros,
    exact: true,
  },
  {
    path: "/adm-imoveis/detalhamento-cadastro",
    component: DetalhamentoCadastro,
    exact: true,
  },
  {
    path: "/adm-imoveis/relatorio-por-status",
    component: RelatorioPorStatus,
    exact: true,
  },
  {
    path: "/adm-imoveis/relatorio-demanda-territorial",
    component: RelatorioDemandaTerritorial,
    exact: true,
  },
  {
    path: "/adm-imoveis/relatorio-area-construida",
    component: RelatorioAreaConstruida,
    exact: true,
  },
];
