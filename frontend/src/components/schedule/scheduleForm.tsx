import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { PatternFormat } from "react-number-format"
import { Calendar, Clock, ArrowLeft, Save, DollarSign } from "lucide-react"

import { postSchedule } from "@/services/scheduleService"
import type { Patient } from "@/interfaces/patient"
import { scheduleSchemaForm, type Schedule } from "@/interfaces/schedule"
import { zodResolver } from "@hookform/resolvers/zod"

type ScheduleFormData = z.infer<typeof scheduleSchemaForm>

type ScheduleFormProps = {
  next: (jump: number) => void
  prev: (jump: number) => void
  patient: Patient
  setSchedule: (schedule: Schedule) => void
}

export function ScheduleForm({ next, prev, patient, setSchedule }: ScheduleFormProps) {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchemaForm),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      time: "00:00",
      serviceType: "1",
      value: "0.00",
      patient: {
        name: patient.name,
        cpf: patient.cpf,
        phone: patient.phone,
      },
    },
  })

  const onSubmit = async (dataSchedule: ScheduleFormData) => {
    const serviceType = Number.parseInt(dataSchedule.serviceType)
    const value = Number.parseFloat(dataSchedule.value.replace(",", ".")).toFixed(2)
    const dentist = "111111" // only at development area
    const patient = dataSchedule.patient.cpf

    const dataPostSchedule: Schedule = {
      date: dataSchedule.date,
      time: dataSchedule.time,
      service_type: serviceType,
      value: value.toString(),
      dentist: dentist,
      patient: patient,
    }

    const response = await postSchedule(dataPostSchedule)

    if (response.status) {
      toast(`Agendamento cadastrado: ${dataSchedule.date} - ${dataSchedule.patient.name}`)

      setTimeout(() => {
        setSchedule(dataPostSchedule)
        next(1)
      }, 1000)
    } else {
      console.log("Erro no agendamento.")
      toast.error(response.content as string)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl border-[#003566]/20 shadow-lg">
        <CardHeader className="">
          <CardTitle className="text-xl text-[#003566] flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Cadastro de Agendamento
          </CardTitle>
          <CardDescription className="text-gray-600">Preencha os dados do agendamento para o paciente</CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#003566] rounded-full"></span>
                  Dados do Paciente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="patient.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">Nome</FormLabel>
                        <FormControl>
                          <Input {...field} disabled className="bg-white cursor-not-allowed text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patient.cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">CPF</FormLabel>
                        <FormControl>
                          <PatternFormat
                            format="###.###.###-##"
                            mask="_"
                            value={field.value}
                            onValueChange={(values) => {
                              field.onChange(values.value)
                            }}
                            customInput={Input}
                            disabled
                            className="bg-white cursor-not-allowed text-sm disabled"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patient.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">Telefone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value}
                            disabled
                            className="bg-white cursor-not-allowed text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#003566]" />
                  Informações do Agendamento
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Data da Consulta</FormLabel>
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
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Hora da Consulta</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="time"
                            className="border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Serviço Prestado</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Digite o tipo de serviço"
                            className="border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Valor
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            step="0.01"
                            placeholder="0,00"
                            className="border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => prev(2)}
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
                      Agendando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Cadastrar Agendamento
                    </div>
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
