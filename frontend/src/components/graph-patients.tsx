import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Segunda", patients: 12 },
  { day: "Terça", patients: 19 },
  { day: "Quarta", patients: 15 },
  { day: "Quinta", patients: 22 },
  { day: "Sexta", patients: 18 },
  { day: "Sábado", patients: 8 },
]


export function PatientGraph() {
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