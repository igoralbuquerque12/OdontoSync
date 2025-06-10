import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ListSchedule } from "@/interfaces/schedule"
import { Clock, MoreHorizontal, Phone } from "lucide-react"


const services = ['Aparelho ortodôntico fixo', 'Aparelho ortodôntico móvel', 'Alinhadores invisíveis (Invisalign)', 'Manutenção ortodôntica', 'Correção de mordida (mordida cruzada, aberta, profunda)'];
const status = "Confirmed"

export function ListPatient({ dataSchedule }: { dataSchedule: ListSchedule[] }) {
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Paciente</TableHead>
          <TableHead>Horário</TableHead>
          <TableHead className="hidden md:table-cell">Serviço</TableHead>
          <TableHead className="hidden md:table-cell">Contato</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataSchedule.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <p>{schedule.patient.name}</p>
                <div>
                  <p className="text-sm font-medium leading-none"></p>
                  <p className="text-xs text-muted-foreground md:hidden">{services[schedule.service_type]}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{schedule.time.split(':')[0]}:{schedule.time.split(':')[1]}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{services[schedule.service_type]}</TableCell>
                        <TableCell className="hidden md:table-cell">{schedule.patient.phone}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge
                variant={status === "Confirmed" ? "default" : "outline"}
                className={status === "Confirmed" ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                  <span className="sr-only">Call</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}