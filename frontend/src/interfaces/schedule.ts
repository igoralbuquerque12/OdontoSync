import { z } from "zod"

export const scheduleSchemaForm = z.object({
  date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Data de consulta é inválida",
  }),

  time: z.string().refine((val) => /^\d{2}:\d{2}$/.test(val), {
    message: "Horário de consulta é inválido. A hora e os minutos precisam ser válidos.",
  }),

  serviceType: z.string(),

  value: z.string(), 

  patient: z.object({
    name: z.string(),
    cpf: z.string(),
    phone: z.string(),
  })
})

export interface Schedule {
    date: string
    time: string
    service_type: number
    value: string
    dentist: string
    patient: string // receive only cpf
}

export const defaultSchedule = {
    date: '',
    time: '',
    service_type: 0,
    value: '',
    dentist: '',
    patient: ''
}