import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Calendar } from "lucide-react"
import { ListSchedule } from "@/interfaces/schedule"

interface ScheduleChartProps {
  schedules: ListSchedule[]
  loading: boolean
}

interface ChartData {
  date: string
  appointments: number
  displayDate: string
}

export function ScheduleChart({ schedules, loading }: ScheduleChartProps) {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    if (schedules.length > 0) {
      const appointmentsByDate = schedules.reduce((acc, schedule) => {
        const date = schedule.date
        
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date]++
        return acc
      }, {} as Record<string, number>)

      const chartData = Object.entries(appointmentsByDate).map(([date, appointments]) => ({
        date,
        appointments,
        displayDate: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      }))

      chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      
      setData(chartData)
    }
  }, [schedules])

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
        ) : data.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-gray-500">Nenhum dado disponível para o período selecionado</div>
          </div>
        ) : (
          <ChartContainer
            config={{
              appointments: {
                label: "Agendamentos",
                color: "#003566",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} axisLine={{ stroke: "#003566" }} />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  axisLine={{ stroke: "#003566" }}
                  allowDecimals={false}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                  labelFormatter={(value) => `Data: ${value}`}
                  formatter={(value: number) => [`${value}`, " Agendamentos"]}
                />
                <Bar dataKey="appointments" fill="#003566" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
