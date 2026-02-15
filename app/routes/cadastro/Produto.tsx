"use client"

import { useState } from "react"
import { useNavigate, NavLink } from "react-router"
import Sidebar from "../../routes/dashboard/Sidebar"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Wrench, Eye, EyeOff, Loader2, Menu} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"

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

export default function ProdutoPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
    const [open, setOpen] = useState(false)


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
    <div className="flex min-h-screen bg-muted/40">

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
          <h1 className="text-2xl font-bold">Produtos</h1>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-1  gap-6">
          <Card className="rounded-2xl shadow-sm">
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
                          type="name"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </form>
            </Form>
          </CardContent>
          </Card>

          
        </div>

    
      </main>
    </div>
  )
}
