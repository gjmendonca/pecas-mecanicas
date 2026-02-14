"use client"


import { useState } from "react"
import { useNavigate, Link } from "react-router"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Wrench, Eye, EyeOff, Loader2, ArrowLeft} from "lucide-react"

import { useAuth } from "../../lib/auth-context"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

const cadastrarUsuarioSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório."),
  email: z
    .string()
    .min(1, "E-mail é obrigatório.")
    .email("Informe um e-mail válido."),
  emailConfirm: z
    .string()
    .min(1, "E-mail é obrigatório.")
    .email("Informe um e-mail válido."),
  password: z
    .string()
    .min(1, "Senha é obrigatória.")
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .refine(
    (value) =>
      value.length < 8 ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(value),
    {
      message:
        "A senha deve conter letra maiúscula, minúscula, número e caractere especial.",
    }
  ),
  passwordConfirm: z
    .string()
    .min(1, "Senha é obrigatória.")
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .refine(
    (value) =>
      value.length < 8 ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(value),
    {
      message:
        "A senha deve conter letra maiúscula, minúscula, número e caractere especial.",
    }
  ),
})
.refine((data) => data.email === data.emailConfirm, {
    message: "Os e-mails não são iguais",
    path: ["emailConfirm"],
})
.refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais",
    path: ["passwordConfirm"],
})

type CadastrarUsuarioFormData = z.infer<typeof cadastrarUsuarioSchema>

export default function CadastroUsuarioPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CadastrarUsuarioFormData>({
    resolver: zodResolver(cadastrarUsuarioSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      emailConfirm: "",
      password: "",
      passwordConfirm: "",
    },
  })

  function onSubmit(data: CadastrarUsuarioFormData) {
    setIsSubmitting(true)

    setTimeout(() => {
        
     const result = register({
        name: data.name,
        email: data.email,
        emailConfirm: data.emailConfirm,
        password: data.password,
        passwordConfirm: data.passwordConfirm

     })


      if (result.success) {
        toast.success("Cadastro realizado com sucesso!")
        navigate("/")
      } else {
        toast.error(result.error || "Erro ao realizar cadastro.")
      }

      setIsSubmitting(false)
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
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Cadastro de Usuário</CardTitle>
            <CardDescription>
              Faça já o cadastro de sua conta!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome"
                          type="name"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="seu@email.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="seu@email.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Senha</FormLabel>
                      </div>

                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Sua senha"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            className="pr-10"
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>

                    
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Confirmar Senha</FormLabel>
                      </div>

                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Confirmar sua senha"
                            type={showPasswordConfirm ? "text" : "password"}
                            autoComplete="current-password"
                            className="pr-10"
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                          >
                            {showPasswordConfirm ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>

                    
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </form>
            </Form>

            <Link to="/" className="w-full ">
                <Button variant="ghost" className="w-full mt-2 gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Login
                </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
