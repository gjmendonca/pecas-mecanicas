"use client"

import { useState } from "react"
import Sidebar from "../../routes/dashboard/Sidebar"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import { Menu, MoreHorizontal } from "lucide-react"

export default function DashboardPage() {
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

      {/* Main */}
      <main className="flex-1 p-6 md:p-8 space-y-8 w-full">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Total de Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">500,874</p>
              <span className="text-xs text-green-500">
                +1,400 novos adicionados
              </span>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Total de Vendas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">234,888</p>
              <span className="text-xs text-green-500">
                +1,000 vendas hoje
              </span>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Receita
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 120.000</p>
              <span className="text-xs text-green-500">
                +8% esse mês
              </span>
            </CardContent>
          </Card>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* TABELA */}
          <Card className="lg:col-span-2 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Produtos Vendidos</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent>
              <table className="w-full text-sm">
                <thead className="text-muted-foreground border-b">
                  <tr>
                    <th className="text-left py-3">Nome</th>
                    <th className="text-left">Preço</th>
                    <th className="text-left">Pedidos</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Farol Civic 2018</td>
                    <td>R$ 450</td>
                    <td>120</td>
                    <td className="text-right text-green-600">
                      R$ 54.000
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3">Retrovisor Corolla</td>
                    <td>R$ 280</td>
                    <td>80</td>
                    <td className="text-right text-green-600">
                      R$ 22.400
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3">Lanterna HB20</td>
                    <td>R$ 190</td>
                    <td>60</td>
                    <td className="text-right text-green-600">
                      R$ 11.400
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* ANALYTICS */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Produtos Adicionados por Mês</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                { month: "Jan", value: 23400 },
                { month: "Fev", value: 15000 },
                { month: "Mar", value: 30000 },
                { month: "Abr", value: 22000 },
                { month: "Mai", value: 10000 },
              ].map((item) => (
                <div key={item.month}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{item.month}</span>
                    <span>{item.value}</span>
                  </div>

                  <div className="h-2 bg-muted rounded-full">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{
                        width: `${item.value / 300}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
