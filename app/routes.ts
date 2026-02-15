import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login/Login.tsx"),

  route("cadastroUsuario", "routes/cadastro/Usuario.tsx"),
  route("recuperarSenha", "routes/login/RecuperarSenha.tsx"),

  route("app", "routes/dashboard/DashboardLayout.tsx", [
    index("routes/dashboard/Dashboard.tsx"),

    route("produtos", "routes/cadastro/Produto.tsx"),
    route("configuracoes", "routes/configuracoes/Configuracoes.tsx"),
  ]),
] satisfies RouteConfig;
