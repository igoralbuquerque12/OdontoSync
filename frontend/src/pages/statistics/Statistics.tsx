import { useState } from "react"
import { StatsCards } from "@/components/statistics/stats-cards"
import { ScheduleChart } from "@/components/statistics/schedule-chart"
import { RevenueChart } from "@/components/statistics/revenue-chart"
import { DateRangeFilter } from "@/components/statistics/date-range-filter"
import { BarChart3 } from "lucide-react"

export default function Statistics() {
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8 text-[#003566]" />
            <h1 className="text-3xl font-bold text-gray-900">Estatísticas da Clínica</h1>
          </div>
          <p className="text-gray-600">Acompanhe o desempenho da sua clínica odontológica</p>
        </div>

        <div className="mb-8">
          <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>

        <div className="mb-8">
          <StatsCards startDate={dateRange.startDate} endDate={dateRange.endDate} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScheduleChart startDate={dateRange.startDate} endDate={dateRange.endDate} />
          <RevenueChart startDate={dateRange.startDate} endDate={dateRange.endDate} />
        </div>
      </div>
    </div>
  )
}
