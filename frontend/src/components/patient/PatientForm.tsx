import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from 'sonner'
import { useNavigate } from "react-router-dom"

import { postPatient } from '@/services/patientService'

const patientSchema = z.object({
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  name: z.string().min(1, "Nome é obrigatório").max(150),
  birth_date: z.string().min(1, "Data de nascimento é obrigatória"),
  phone: z.string().min(10, "Telefone inválido").max(20),
  email: z.string().email("Email inválido"),
})

type PatientFormData = z.infer<typeof patientSchema>

export function PatientForm() {
  const navigate = useNavigate()

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      cpf: "",
      name: "",
      birth_date: "",
      phone: "",
      email: "",
    },
  })

  const onSubmit = async (dataPatient: PatientFormData) => {
      const response = await postPatient(dataPatient)

      if (response.status) {
        toast(response.content as string)
        setTimeout(() => navigate('/'), 1000)
      } else {
        toast.error(response.content as string)
      }
  }

  return (
    <Card className="mt-13 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Cadastro de Paciente</CardTitle>
        <CardDescription>Preencha os dados do novo paciente</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={11} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={150} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={20} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1">
                Voltar
              </Button>
              <Button type="submit" className="flex-1">
                Cadastrar
              </Button>
            </div>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
