import { useState } from "react"
import { FilterPatientSearch } from "@/components/patient/filterPatientSearch"
import { SearchPatientForm } from "@/components/patient/searchPatientForm"
import { Users } from "lucide-react"


export interface Patient {
  cpf: string
  name: string
  birth_date: string
  phone: string
  email: string
}

export default function SearchPatient() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePatientFound = (patient: Patient) => {
    setSelectedPatient(patient)
  }

  const handlePatientUpdated = (updatedPatient: Patient) => {
    setSelectedPatient(updatedPatient)
  }

  const handlePatientDeleted = () => {
    setSelectedPatient(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-[#003566]" />
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Pacientes</h1>
          </div>
          <p className="text-gray-600">Busque e gerencie os dados dos seus pacientes</p>
        </div>

        <div className="mb-8">
          <FilterPatientSearch onPatientFound={handlePatientFound} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>

        {selectedPatient && (
          <SearchPatientForm
            patient={selectedPatient}
            onPatientUpdated={handlePatientUpdated}
            onPatientDeleted={handlePatientDeleted}
          />
        )}
      </div>
    </div>
  )
}
