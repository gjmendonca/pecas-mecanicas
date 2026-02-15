"use client"

import { NavLink, useNavigate } from "react-router"
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
} from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "../../lib/auth-context"

interface Props {
  closeSidebar?: () => void
}

export default function Sidebar({ closeSidebar }: Props) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    toast.success("Logout realizado com sucesso!")
    navigate("/")
    closeSidebar?.()
  }

  return (
    <aside className="h-full w-64 bg-card border-r p-6 flex flex-col">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold">AutoParts</h1>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
          to="/app"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/app/produtos"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm"
        >
          <Package className="h-4 w-4" />
          Produto
        </NavLink>

        <NavLink
          to="/app/configuracoes"
          onClick={closeSidebar}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm"
        >
          <Settings className="h-4 w-4" />
          Configurações
        </NavLink>
      </nav>

      <div className="pt-6 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 w-full"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
