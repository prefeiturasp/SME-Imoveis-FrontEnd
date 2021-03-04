import Home from "pages/Home";
import CadastroImovel from "pages/CadastroImovel";
import ConsultaImovel from "pages/ConsultaImovel";
import { Login } from "pages/Login";
import { SemPermissao } from "pages/SemPermissao";
import { RecuperarSenha } from "pages/RecuperarSenha";
import Emails from "pages/Emails";

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
  {
    path: "/consulta-imovel",
    component: ConsultaImovel,
    exact: true,
  },
  {
    path: "/recuperar-senha",
    component: RecuperarSenha,
    exact: true,
  },
  {
    path: "/email",
    component: Emails,
    exact: true,
  },
];
