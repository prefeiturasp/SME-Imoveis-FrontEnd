import { Notificacoes } from "pages/AreaLogada/Notificacoes";
import Permissionamento from "pages/AreaLogada/Permissionamento";

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
];
