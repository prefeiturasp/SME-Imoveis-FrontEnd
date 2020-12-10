import { PaginaInicialAdministrador } from "pages/CadastroAdmin/PaginaInicialAdministrador";

export const privateRoutes = [
  {
    path: "/adm-imoveis",
    component: PaginaInicialAdministrador,
    exact: true,
  },
];
