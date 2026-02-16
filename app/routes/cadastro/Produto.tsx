"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router"
import Sidebar from "../../routes/dashboard/Sidebar"
import { addPart } from "../../lib/store"


import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Menu, X, Star } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"

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
import { Card, CardContent } from "../../components/ui/card"

const MAX_IMAGES = 10

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  description: z.string().min(1, "Descrição é obrigatória."),
  images: z.array(z.instanceof(File)).optional(),
  price: z.string().min(1, "Preço é obrigatório."),
})

type ProdutoFormData = z.infer<typeof schema>

export default function ProdutoPage() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<
    { file: File; preview: string; isMain: boolean }[]
  >([])

  const form = useForm<ProdutoFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      price: "",
    },
  })

  function addFiles(files: FileList | null) {
    if (!files) return

    const allowedTypes = ["image/png", "image/jpeg"]
    const remainingSlots = MAX_IMAGES - images.length

    if (remainingSlots <= 0) {
      toast.error("Limite máximo de 10 imagens atingido.")
      return
    }

    const validFiles = Array.from(files)
      .filter((file) => allowedTypes.includes(file.type))
      .slice(0, remainingSlots)

    if (validFiles.length !== files.length) {
      toast.error("Somente PNG e JPG são permitidos.")
    }

    const newImages = validFiles.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      isMain: images.length === 0 && index === 0,
    }))

    const updatedImages = [...images, ...newImages]

    setImages(updatedImages)
    form.setValue(
      "images",
      updatedImages.map((img) => img.file)
    )
  }


  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    addFiles(e.dataTransfer.files)
  }


  function removeImage(index: number) {
    let updatedImages = images.filter((_, i) => i !== index)

    if (!updatedImages.some((img) => img.isMain) && updatedImages.length > 0) {
      updatedImages[0].isMain = true
    }

    setImages(updatedImages)
    form.setValue(
      "images",
      updatedImages.map((img) => img.file)
    )
  }


  function setMainImage(index: number) {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isMain: i === index,
    }))

    setImages(updatedImages)
  }


    async function onSubmit(data: ProdutoFormData) {

      const imagesBase64 = await Promise.all(
        images.map(async (img) => ({
          url: await fileToBase64(img.file),
          isMain: img.isMain,
        }))
      )

      const result = addPart({
        name: data.name,
        description: data.description,
        price: data.price,
        images: imagesBase64,
        userId: "",
      })

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success("Produto salvo com sucesso!")
      navigate("/dashboard")
    }

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}



  const remainingSlots = MAX_IMAGES - images.length

  return (
    <div className="flex min-h-screen bg-muted/40">
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

      <main className="flex-1 p-6 md:p-8 space-y-8 w-full">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Produtos</h1>
        </div>

        <Card className="w-full rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  <div className="md:col-span-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <p className="text-sm text-muted-foreground">
                    Arraste imagens aqui ou clique para selecionar
                  </p>
                  <p className="text-xs mt-1">
                    {images.length}/{MAX_IMAGES} imagens
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Você pode adicionar mais {remainingSlots}
                  </p>

                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    multiple
                    className="hidden"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                </div>

                <div className="flex gap-4 flex-wrap">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.preview}
                        alt="preview"
                        className={`w-28 h-28 object-cover rounded-md border-2 ${
                          img.isMain
                            ? "border-yellow-400"
                            : "border-transparent"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setMainImage(index)}
                        className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow"
                      >
                        <Star
                          size={14}
                          className={
                            img.isMain ? "text-yellow-400" : "text-gray-400"
                          }
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <Button type="submit" className="md:w-fit">
                  Salvar
                </Button>

              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
