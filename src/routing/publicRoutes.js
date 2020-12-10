import Home from "pages/Home";
import CadastroImovel from "pages/CadastroImovel";
import { Login } from "pages/Login";
import { SemPermissao } from "pages/SemPermissao";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/sem-permissao",
    component: SemPermissao,
    exact: true,
  },
  {
    path: "/cadastro-imovel",
    component: CadastroImovel,
    exact: true,
  },
];
