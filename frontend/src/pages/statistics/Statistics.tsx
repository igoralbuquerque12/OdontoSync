import { useEffect, useState } from "react"
import { StatsCards } from "@/components/statistics/stats-cards"
import { ScheduleChart } from "@/components/statistics/schedule-chart"
import { RevenueChart } from "@/components/statistics/revenue-chart"
import { DateRangeFilter } from "@/components/statistics/date-range-filter"
import { BarChart3 } from "lucide-react"
import { getWeekStartEndDates } from "@/utils/getDate"
import { getScheduleByInterval } from "@/services/scheduleService"
import { ListSchedule } from "@/interfaces/schedule"

export default function Statistics() {
  const dateWeek = getWeekStartEndDates()
  const [loading, setLoading] = useState(true)
  const [schedules, setSchedules] = useState<ListSchedule[]>([])
  const [dateRange, setDateRange] = useState({
    startDate: dateWeek[0],
    endDate: dateWeek[1],
  })

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const dataSchedules = await getScheduleByInterval(dateRange.startDate, dateRange.endDate)
        setSchedules(dataSchedules.content as ListSchedule[])
        
        setTimeout(() => {
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [dateRange])

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
          <StatsCards loading={loading} schedules={schedules} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScheduleChart schedules={schedules} loading={loading} />
          <RevenueChart schedules={schedules} loading={loading} />
        </div>
      </div>
    </div>
  )
}
