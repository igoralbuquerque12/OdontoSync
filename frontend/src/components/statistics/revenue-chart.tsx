import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { DollarSign } from "lucide-react"
import { ListSchedule } from "@/interfaces/schedule"

interface RevenueChartProps {
  schedules: ListSchedule[]
  loading: boolean
}

interface ChartData {
  date: string
  revenue: number
  displayDate: string
}

export function RevenueChart({ schedules, loading }: RevenueChartProps) {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    if (schedules.length > 0) {
      const revenueByDate = schedules.reduce((acc, schedule) => {
        const date = schedule.date
        const value = parseFloat(schedule.value)
        
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += value
        return acc
      }, {} as Record<string, number>)

      const chartData = Object.entries(revenueByDate).map(([date, revenue]) => ({
        date,
        revenue,
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
          <DollarSign className="h-5 w-5" />
          Faturamento por Dia
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
              revenue: {
                label: "Faturamento",
                color: "#003566",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="displayDate" tick={{ fontSize: 12 }} axisLine={{ stroke: "#003566" }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#003566" }}
                  tickFormatter={(value) => `R$ ${value.toLocaleString("pt-BR")}`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  labelFormatter={(value) => `Data: ${value}`}
                  formatter={(value: number) => [
                    `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                    "Faturamento",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#003566"
                  strokeWidth={3}
                  dot={{ fill: "#003566", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#003566", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
