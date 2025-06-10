import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from 'sonner'
import { PatternFormat } from 'react-number-format';

import { postSchedule } from '@/services/scheduleService'
import { Patient } from '@/interfaces/patient'
import { scheduleSchemaForm, Schedule } from '@/interfaces/schedule'
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
      date: new Date().toISOString().split('T')[0],
      time: '00:00',
      serviceType: '1',
      value: '0.00',
      patient: {
        name: patient.name,
        cpf: patient.cpf,
        phone: patient.phone
      }
    },
  })

  const onSubmit = async (dataSchedule: ScheduleFormData) => {
    const serviceType = parseInt(dataSchedule.serviceType)
    const value = parseFloat(dataSchedule.value.replace(',', '.')).toFixed(2)
    const dentist = '111111' // only at development area
    const patient = dataSchedule.patient.cpf

    const dataPostSchedule: Schedule = {
      date: dataSchedule.date,
      time: dataSchedule.time,
      service_type: serviceType,
      value: value.toString(),
      dentist: dentist,
      patient: patient
    }

    const response = await postSchedule(dataPostSchedule)

    if (response.status) {
      toast(`Agendamento cadastrado: ${dataSchedule.date} - ${dataSchedule.patient.name}`)

      setTimeout(() => {
        setSchedule(dataPostSchedule)
        next(1)
      }, 1000)
    } else {
      console.log('Erro no agendamento.')
      toast.error(response.content as string)
    }
  }


  return (
    <Card className="m-10 max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cadastro de Horário</CardTitle>
        <CardDescription>Preencha os dados do horário</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="patient.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
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
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="###.###.###-##"
                      mask="_"
                      value={field.value}
                      onValueChange={(values) => {
                        field.onChange(values.value);
                      }}
                      customInput={Input}
                      disabled={field.disabled}
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
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da Consulta</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora da Consulta</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serviço Prestado</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => prev(2)} className="flex-1">
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
