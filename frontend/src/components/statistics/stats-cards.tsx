import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Calendar, Users, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  startDate: string
  endDate: string
}

interface StatsData {
  totalRevenue: number
  totalAppointments: number
  totalPatients: number
  occupancyRate: number
}

export function StatsCards({ startDate, endDate }: StatsCardsProps) {
  const [stats, setStats] = useState<StatsData>({
    totalRevenue: 0,
    totalAppointments: 0,
    totalPatients: 0,
    occupancyRate: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        // Simular chamada para API
        // const response = await fetch(`/api/stats?startDate=${startDate}&endDate=${endDate}`)
        // const data = await response.json()

        // Dados simulados
        const mockData: StatsData = {
          totalRevenue: 45230.5,
          totalAppointments: 156,
          totalPatients: 89,
          occupancyRate: 78.5,
        }

        setTimeout(() => {
          setStats(mockData)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [startDate, endDate])

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
      title: "Taxa de Ocupação",
      value: loading ? "..." : `${stats.occupancyRate}%`,
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