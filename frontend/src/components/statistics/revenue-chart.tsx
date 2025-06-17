import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { DollarSign } from "lucide-react"

interface RevenueChartProps {
  startDate: string
  endDate: string
}

interface ChartData {
  date: string
  revenue: number
  displayDate: string
}

export function RevenueChart({ startDate, endDate }: RevenueChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true)
      try {
        // Simular chamada para API
        // const response = await fetch(`/api/revenue/chart?startDate=${startDate}&endDate=${endDate}`)
        // const chartData = await response.json()

        // Dados simulados
        const mockData: ChartData[] = [
          { date: "2024-01-01", revenue: 2450.0, displayDate: "01/01" },
          { date: "2024-01-02", revenue: 3200.5, displayDate: "02/01" },
          { date: "2024-01-03", revenue: 1800.0, displayDate: "03/01" },
          { date: "2024-01-04", revenue: 4100.75, displayDate: "04/01" },
          { date: "2024-01-05", revenue: 5250.0, displayDate: "05/01" },
          { date: "2024-01-06", revenue: 3800.25, displayDate: "06/01" },
          { date: "2024-01-07", revenue: 2900.0, displayDate: "07/01" },
        ]

        setTimeout(() => {
          setData(mockData)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Erro ao buscar dados de faturamento:", error)
        setLoading(false)
      }
    }

    fetchRevenueData()
  }, [startDate, endDate])

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
