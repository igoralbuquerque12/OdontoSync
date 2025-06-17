import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import { ptBR } from "date-fns/locale"

interface DateRangeFilterProps {
  dateRange: {
    startDate: string
    endDate: string
  }
  onDateRangeChange: (range: { startDate: string; endDate: string }) => void
}

export function DateRangeFilter({ dateRange, onDateRangeChange }: DateRangeFilterProps) {
  const [activePeriod, setActivePeriod] = useState<string>("Este mês")
  const [isCustomOpen, setIsCustomOpen] = useState(false)

  const formatDateToString = (date: Date): string => {
    return format(date, "yyyy-MM-dd")
  }

  const handlePresetClick = (preset: string) => {
    const today = new Date()
    let startDate: Date
    let endDate: Date = today

    switch (preset) {
      case "Esta semana":
        startDate = startOfWeek(today, { weekStartsOn: 1 })
        endDate = endOfWeek(today, { weekStartsOn: 1 })
        break
      case "Este mês":
        startDate = startOfMonth(today)
        endDate = endOfMonth(today)
        break
      case "Últimos 7 dias":
        startDate = subDays(today, 6)
        break
      case "Últimos 30 dias":
        startDate = subDays(today, 29)
        break
      default:
        return
    }

    setActivePeriod(preset)
    onDateRangeChange({
      startDate: formatDateToString(startDate),
      endDate: formatDateToString(endDate),
    })
  }

  const handleCustomDateChange = () => {
    setActivePeriod("Personalizado")
  }

  const presets = ["Esta semana", "Este mês", "Últimos 7 dias", "Últimos 30 dias"]

  return (
    <Card className="border-[#003566]/20">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium text-gray-700">Período:</span>

          {presets.map((preset) => (
            <Button
              key={preset}
              variant={activePeriod === preset ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetClick(preset)}
              className={
                activePeriod === preset
                  ? "bg-[#003566] text-white hover:bg-[#003566]/90"
                  : "border-[#003566]/30 text-[#003566] hover:bg-[#003566] hover:text-white"
              }
            >
              {preset}
            </Button>
          ))}

          <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={activePeriod === "Personalizado" ? "default" : "outline"}
                size="sm"
                className={
                  activePeriod === "Personalizado"
                    ? "bg-[#003566] text-white hover:bg-[#003566]/90"
                    : "border-[#003566]/30 text-[#003566] hover:bg-[#003566] hover:text-white"
                }
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Período personalizado
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-4">
                <div className="text-sm font-medium mb-3">Selecione o período</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Data inicial</label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => {
                        handleCustomDateChange()
                        onDateRangeChange({
                          ...dateRange,
                          startDate: e.target.value,
                        })
                      }}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Data final</label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => {
                        handleCustomDateChange()
                        onDateRangeChange({
                          ...dateRange,
                          endDate: e.target.value,
                        })
                      }}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setIsCustomOpen(false)}
                  className="w-full mt-3 bg-[#003566] hover:bg-[#003566]/90"
                  size="sm"
                >
                  Aplicar
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <div className="text-sm text-gray-600 ml-auto">
            {format(new Date(dateRange.startDate), "dd/MM/yyyy", { locale: ptBR })} -{" "}
            {format(new Date(dateRange.endDate), "dd/MM/yyyy", { locale: ptBR })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
