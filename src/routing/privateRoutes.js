import Permissionamento from "pages/AreaLogada/Permissionamento";
import Cadastros from "pages/AreaLogada/Cadastros";
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
  {
    path: "/adm-imoveis/cadastros-realizados",
    component: Cadastros,
    exact: true,
  },
];
