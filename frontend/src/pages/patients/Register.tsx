import { useState } from "react"
import { PatientSearch } from "@/components/patient/searchPatient"
import { PatientForm } from "@/components/patient/formPatient"
import { ScheduleForm } from "@/components/schedule/scheduleForm"
import { SuccessMessage } from "@/components/schedule/successMessageAppointment"

import { Patient, defaultPatient } from '../../interfaces/patient'
import { Schedule, defaultSchedule } from '../../interfaces/schedule'


export default function RegisterPatient() {
  const [actualStep, setActualStep] = useState(1) 
  const [cpf, setCpf] = useState("")
  const [patient, setPatient] = useState<Patient>(defaultPatient)
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule)


  const nextPage = (jump: number = 1) => {
    setActualStep(actualStep + jump)
  }

  const beforePage = (jump: number = 1) => {
    setActualStep(actualStep - jump)
  }


  return (
    <div>
      {actualStep === 1 && <PatientSearch next={nextPage} setPatient={setPatient} setCpf={setCpf} />}
      {actualStep === 2 && <PatientForm next={nextPage} prev={beforePage} cpf={cpf} setPatient={setPatient}  />}
      {actualStep === 3 && <ScheduleForm next={nextPage} prev={beforePage} patient={patient} setSchedule={setSchedule} />}
      {actualStep === 4 && <SuccessMessage patient={patient} schedule={schedule} />}
    </div>
  )
}