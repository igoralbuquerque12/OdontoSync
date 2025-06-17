import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { ListSchedule } from "@/interfaces/schedule"
import { formatScheduleByWeekDay } from "@/utils/formatSchedule"


export function PatientGraph({ dataSchedules }: { dataSchedules: ListSchedule[] }) {
  const schedulesFormatedByDayWeek = formatScheduleByWeekDay(dataSchedules)
  console.log(schedulesFormatedByDayWeek)
  const data = [
    { day: "Segunda", patients: schedulesFormatedByDayWeek[0].length },
    { day: "Terça", patients: schedulesFormatedByDayWeek[1].length },
    { day: "Quarta", patients: schedulesFormatedByDayWeek[2].length },
    { day: "Quinta", patients: schedulesFormatedByDayWeek[3].length },
    { day: "Sexta", patients: schedulesFormatedByDayWeek[4].length },
    { day: "Sábado", patients: schedulesFormatedByDayWeek[5].length },
  ]

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis className="font-medium" dataKey="day" fontSize={16} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip formatter={(value) => [`${value} pacientes`, "Quantidade"]} labelFormatter={(label) => `${label}`} />
          <Bar dataKey="patients" fill="#003566" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}