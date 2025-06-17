import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Calendar, Users, TrendingUp } from "lucide-react"
import { ListSchedule } from "@/interfaces/schedule"

interface StatsCardsProps {
  schedules: ListSchedule[]
  loading: boolean
}

interface StatsData {
  totalRevenue: number
  totalAppointments: number
  totalPatients: number
  averageValue: number
}

export function StatsCards({ schedules, loading }: StatsCardsProps) {
  const [stats, setStats] = useState<StatsData>({
    totalRevenue: 0,
    totalAppointments: 0,
    totalPatients: 0,
    averageValue: 0,
  })

  useEffect(() => {
    if (schedules.length > 0) {
      const totalRevenue = schedules.reduce((acc, schedule) => {
        return acc + parseFloat(schedule.value)
      }, 0)

      const totalAppointments = schedules.length

      const uniquePatients = new Set(schedules.map(schedule => schedule.patient.cpf))
      const totalPatients = uniquePatients.size

      const averageValue = totalRevenue / totalAppointments

      setStats({
        totalRevenue,
        totalAppointments,
        totalPatients,
        averageValue
      })
    }
  }, [schedules])

  const cards = [
    {
      title: "Ganho Total",
      value: loading ? "..." : `R$ ${stats.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Horários Agendados",
      value: loading ? "..." : stats.totalAppointments.toString(),
      icon: Calendar,
      color: "text-[#003566]",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pacientes Atendidos",
      value: loading ? "..." : stats.totalPatients.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Valor Médio por Consulta",
      value: loading ? "..." : `R$ ${stats.averageValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="border-[#003566]/20 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}