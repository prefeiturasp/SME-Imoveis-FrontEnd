import { Notificacoes } from "pages/AreaLogada/Notificacoes";
import Permissionamento from "pages/AreaLogada/Permissionamento";
import Cadastros from "pages/AreaLogada/Cadastros";

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
];
