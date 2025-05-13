import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from 'sonner'

import type { Patient } from "@/interfaces/patient"
import { defaultErrorFunction } from '@/utils/errorTratament'
import { postPatient } from '@/services/patientService'

const patientSchema = z.object({
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  name: z.string().min(1, "Nome é obrigatório").max(150),
  birth_date: z.string().min(1, "Data de nascimento é obrigatória"),
  phone: z.string().min(10, "Telefone inválido").max(20),
  email: z.string().email("Email inválido"),
})

type PatientFormData = z.infer<typeof patientSchema>

type PatientFormProps = {
  cpf: string
  setPatient: (patient: Patient) => void 
  next: (jump: number) => void
  prev: (jump: number) => void
}

export function PatientForm({ cpf, setPatient, next, prev }: PatientFormProps) {
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      cpf: cpf,
      name: "",
      birth_date: "",
      phone: "",
      email: "",
    },
  })

  const onSubmit = async (dataPatient: PatientFormData) => {
    try {
      const response = await postPatient(dataPatient)

      if (response) {
        const nameSplit = dataPatient.name.split(' ')
        toast(`Paciente ${nameSplit[0]} ${nameSplit[nameSplit.length - 1]} cadastrado`)
        setPatient(dataPatient)
        
      } else {
        toast.error('Ops.. Houve um erro no cadastro do paciente')
      }

      next(1)

    } catch (error) {
      defaultErrorFunction(error)
    }
  }

  return (
    <Card className="mt-13 max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cadastro de Paciente</CardTitle>
        <CardDescription>Preencha os dados do novo paciente</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            '
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input {...field} disabled maxLength={11} />
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
              <Button type="button" variant="outline" onClick={() => prev(1)} className="flex-1">
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
