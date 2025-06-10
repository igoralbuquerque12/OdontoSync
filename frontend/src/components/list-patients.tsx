import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Schedule } from "@/interfaces/schedule"
import { Clock, MoreHorizontal, Phone } from "lucide-react"


const listPatients = [
  {
    id: "1",
    patientName: "Olivia Johnson",
    time: "09:00 AM",
    treatment: "Dental Cleaning",
    status: "Confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "OJ",
  },
  {
    id: "2",
    patientName: "Ethan Williams",
    time: "10:30 AM",
    treatment: "Root Canal",
    status: "Confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EW",
  },
  {
    id: "3",
    patientName: "Sophia Brown",
    time: "11:45 AM",
    treatment: "Consultation",
    status: "Pending",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SB",
  },
  {
    id: "4",
    patientName: "James Davis",
    time: "01:15 PM",
    treatment: "Tooth Extraction",
    status: "Confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JD",
  },
  {
    id: "5",
    patientName: "Emma Wilson",
    time: "03:00 PM",
    treatment: "Dental Filling",
    status: "Confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EW",
  },
  {
    id: "6",
    patientName: "Noah Martinez",
    time: "04:30 PM",
    treatment: "Teeth Whitening",
    status: "Pending",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "NM",
  },
]

export function ListPatient({ dataSchedule }: { dataSchedule: Schedule[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="hidden md:table-cell">Treatment</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listPatients.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={appointment.avatar} alt={appointment.patientName} />
                  <AvatarFallback>{appointment.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{dataSchedule[0].date}</p>
                  <p className="text-xs text-muted-foreground md:hidden">{appointment.treatment}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{appointment.time}</span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{appointment.treatment}</TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge
                variant={appointment.status === "Confirmed" ? "default" : "outline"}
                className={appointment.status === "Confirmed" ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {appointment.status}
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