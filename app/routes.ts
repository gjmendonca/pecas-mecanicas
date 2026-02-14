import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login/Login.tsx"),
  route("cadastro", "routes/cadastro/CadastroUsuario.tsx"),
  route("recuperarSenha", "routes/login/RecuperarSenha.tsx"),
  //route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
