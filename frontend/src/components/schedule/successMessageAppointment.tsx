import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Schedule } from "@/interfaces/schedule"
import { Patient } from "@/interfaces/patient"
import { useNavigate } from 'react-router-dom'

type SuccessMessageProps = {
  patient: Patient,
  schedule: Schedule
}

export function SuccessMessage({ patient, schedule }: SuccessMessageProps) {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate('/')
  }, 3000)

  return (
    <Card className="mt-40 max-w-md mx-auto gap-11">
      <CardHeader>
        <CardTitle className="text-xl">Consulta Agendada</CardTitle>
        <CardDescription className="text-base">A consulta foi agendada com sucesso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-10 text-lg">
            Consulta agendada para o paciente <strong>{patient.name}</strong> no dia <strong>{schedule.date}</strong> às <strong>{schedule.time}</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
