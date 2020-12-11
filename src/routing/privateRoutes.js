import Permissionamento from "pages/AreaLogada/Permissionamento";
import { PaginaInicialAdministrador } from "pages/CadastroAdmin/PaginaInicialAdministrador";

export const privateRoutes = [
  {
    path: "/adm-imoveis",
    component: PaginaInicialAdministrador,
    exact: true,
  },
  {
    path: "/adm-imoveis/permissionamento",
    component: Permissionamento,
    exact: true,
  },
];
