import {
  Outlet,
  Scripts,
  ScrollRestoration,
  Links,
  Meta,
} from "react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "./lib/auth-context";
import "./app.css";

export default function Root() {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {typeof Meta !== "undefined" && <Meta />}
        {typeof Links !== "undefined" && <Links />}
      </head>
      <body>
        <AuthProvider>
          <Outlet />
          {typeof window !== "undefined" && typeof Toaster !== "undefined" && (
            <Toaster richColors position="top-center" />
          )}
        </AuthProvider>
        {typeof ScrollRestoration !== "undefined" && <ScrollRestoration />}
        {typeof Scripts !== "undefined" && <Scripts />}
      </body>
    </html>
  );
}
