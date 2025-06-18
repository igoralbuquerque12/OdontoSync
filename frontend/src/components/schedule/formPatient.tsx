import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { UserPlus, ArrowLeft, Save } from "lucide-react"

import type { Patient } from "@/interfaces/patient"
import { defaultErrorFunction } from "@/utils/errorTratament"
import { postPatient } from "@/services/patientService"

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

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) {
      return `(${numbers}`
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
  }

  const handlePhoneChange = (value: string, onChange: (value: string) => void) => {
    const formatted = formatPhone(value)
    onChange(formatted)
    return formatted
  }

  const onSubmit = async (dataPatient: PatientFormData) => {
    try {
      const response = await postPatient(dataPatient)

      if (response) {
        const nameSplit = dataPatient.name.split(" ")
        toast(`Paciente ${nameSplit[0]} ${nameSplit[nameSplit.length - 1]} cadastrado`)
        setPatient(dataPatient)
      } else {
        toast.error("Ops.. Houve um erro no cadastro do paciente")
      }

      next(1)
    } catch (error) {
      defaultErrorFunction(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl border-[#003566]/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#003566]/5 to-[#003566]/10">
          <CardTitle className="text-xl text-[#003566] flex items-center gap-2">
            <UserPlus className="h-6 w-6" />
            Cadastro de Paciente
          </CardTitle>
          <CardDescription className="text-gray-600">Preencha os dados do novo paciente para continuar</CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">CPF</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={formatCPF(field.value)}
                          disabled
                          className="bg-gray-50 cursor-not-allowed"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            handlePhoneChange(e.target.value, field.onChange)
                          }}
                          placeholder="(11) 99999-9999"
                          maxLength={15}
                          className="border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome completo do paciente"
                        maxLength={150}
                        className="border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          className="border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">E-mail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="exemplo@email.com"
                          className="border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => prev(1)}
                  className="flex-1 border-[#003566]/30 text-[#003566] hover:bg-[#003566] hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex-1 bg-[#003566] hover:bg-[#003566]/90 text-white transition-colors"
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Cadastrando...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Cadastrar Paciente
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}