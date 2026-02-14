"use client"

import { NavLink, useNavigate } from "react-router"
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "../../lib/auth-context"

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function Sidebar({ open, setOpen }: Props) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    toast.success("Logout realizado com sucesso!")
    navigate("/")
  }

  return (
    <>
      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-card border-r p-6 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
        `}
      >
        {/* Header Mobile */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-xl font-bold">AutoParts</h1>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-2 flex-1">
          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>

          <NavLink
            to="/produtos"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm"
          >
            <Package className="h-4 w-4" />
            Produto
          </NavLink>

          <NavLink
            to="/configuracoes"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-sm"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </NavLink>
        </nav>

        {/* Logout */}
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
    </>
  )
}
