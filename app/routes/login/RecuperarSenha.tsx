"use client"


import { useState } from "react"
import {  Link } from "react-router"

import { Wrench, ArrowLeft, Mail } from "lucide-react"

import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"


 export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro("")

    if (!email.trim()) {
      setErro("Informe seu e-mail.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro("E-mail em formato invalido.")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setEnviado(true)
      setLoading(false)
    }, 500)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mt-0.5 mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <Wrench className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">AutoParts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerenciamento de Peças Automotivas
          </p>
        </div>

        <Card className="mb-2">
          <CardHeader className="items-center gap-2 pb-2">
          <div className="mt-0.5 mb-2 flex flex-col items-center">
            <CardTitle className="text-xl">Recuperar Senha</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
                {enviado
                ? "Verifique sua caixa de entrada"
                : "Informe seu e-mail para receber o link de redefinicao"}
            </CardDescription>
          </div>
          </CardHeader>
            <CardContent>
            {enviado ? (
                <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-8 w-8 text-primary" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Se o e-mail <span className="font-medium text-foreground">{email}</span> estiver
                    cadastrado, voce recebera um link para redefinir sua senha.
                </p>
                <Link to="/" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-border text-foreground hover:bg-secondary">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar ao Login
                    </Button>
                </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-foreground">E-mail</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                {erro && (
                    <p className="text-sm text-destructive">{erro}</p>
                )}

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                    <Mail className="h-4 w-4" />
                    {loading ? "Enviando..." : "Enviar Link"}
                </Button>

                <Link to="/" className="w-full">
                    <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar ao Login
                    </Button>
                </Link>
                </form>
            )}
            </CardContent>
        </Card>
      </div>
    </main>
  )
}
