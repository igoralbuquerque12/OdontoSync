import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Calendar } from "lucide-react"

interface ScheduleChartProps {
  startDate: string
  endDate: string
}

interface ChartData {
  date: string
  Schedule: number
  displayDate: string
}

export function ScheduleChart({ startDate, endDate }: ScheduleChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScheduleData = async () => {
      setLoading(true)
      try {
        // Simular chamada para API
        // const response = await fetch(`/api/Schedule/chart?startDate=${startDate}&endDate=${endDate}`)
        // const chartData = await response.json()

        // Dados simulados
        const mockData: ChartData[] = [
          { date: "2024-01-01", Schedule: 12, displayDate: "01/01" },
          { date: "2024-01-02", Schedule: 15, displayDate: "02/01" },
          { date: "2024-01-03", Schedule: 8, displayDate: "03/01" },
          { date: "2024-01-04", Schedule: 18, displayDate: "04/01" },
          { date: "2024-01-05", Schedule: 22, displayDate: "05/01" },
          { date: "2024-01-06", Schedule: 14, displayDate: "06/01" },
          { date: "2024-01-07", Schedule: 10, displayDate: "07/01" },
        ]

        setTimeout(() => {
          setData(mockData)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Erro ao buscar dados de agendamentos:", error)
        setLoading(false)
      }
    }

    fetchScheduleData()
  }, [startDate, endDate])

  return (
    <Card className="border-[#003566]/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#003566]">
          <Calendar className="h-5 w-5" />
          Agendamentos por Dia
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-gray-500">Carregando dados...</div>
          </div>
        ) : (
          <ChartContainer
            config={{
              Schedule: {
                label: "Agendamentos",
                color: "#003566",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} axisLine={{ stroke: "#003566" }} />
                <YAxis tick={{ fontSize: 12 }} axisLine={{ stroke: "#003566" }} />
                <ChartTooltip content={<ChartTooltipContent />} labelFormatter={(value) => `Data: ${value}`} />
                <Bar dataKey="Schedule" fill="#003566" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
