"use client"

import { useState } from "react"
import { Outlet } from "react-router"
import Sidebar from "./Sidebar"

import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import { Button } from "../../components/ui/button"
import { Menu } from "lucide-react"

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/40">

      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="p-0 w-64">
          <Sidebar closeSidebar={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Conteúdo */}
      <main className="flex-1 p-6 md:p-8 w-full">
        <Outlet />
      </main>
    </div>
  )
}
