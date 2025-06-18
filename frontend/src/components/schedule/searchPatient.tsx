import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Search, UserPlus, AlertCircle } from "lucide-react"

import type { Patient } from "../../interfaces/patient"
import { getPatient } from "../../services/patientService"
import { defaultErrorFunction } from "@/utils/errorTratament"

type PatientSearchProps = {
  next: (jump: number) => void
  setPatient: (patient: Patient) => void
  setCpf: (cpf: string) => void
}

export function PatientSearch({ next, setPatient, setCpf }: PatientSearchProps) {
  const [cpfInput, setCpfInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAddButton, setShowAddButton] = useState(false)

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")

    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
    }
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    const numbersOnly = formatted.replace(/\D/g, "")
    setCpfInput(numbersOnly)
    setShowAddButton(false)
  }

  const PatientSearchMethod = async () => {
    try {
      if (!cpfInput || cpfInput.length !== 11) {
        toast.error("Digite um CPF válido.")
        return
      }

      setIsLoading(true)
      const response = await getPatient(cpfInput)
      setCpf(cpfInput)

      if (response.status) {
        const dataPatient: Patient = response.content as Patient
        setPatient(dataPatient)

        const nameSplit = dataPatient.name.split(" ")
        toast(`Paciente ${nameSplit[0]} ${nameSplit[nameSplit.length - 1]} encontrado`)

        next(2)
      } else {
        toast.error("Paciente não encontrado. Faço o cadastro dele.")
        setShowAddButton(true)
      }
    } catch (error) {
      defaultErrorFunction(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      PatientSearchMethod()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-10">
      <Card className="w-full max-w-2xl border-[#003566]/20 shadow-lg">
        <CardHeader className="">
          <CardTitle className="text-2xl text-[#003566] flex items-center gap-3">
            <Search className="h-7 w-7" />
            Pesquisa de Paciente
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Digite o CPF do paciente para iniciar um agendamento
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="cpf" className="text-gray-700 font-medium text-base">
                CPF do Paciente
              </Label>
              <Input
                id="cpf"
                value={formatCPF(cpfInput)}
                onChange={handleCPFChange}
                onKeyPress={handleKeyPress}
                maxLength={14}
                placeholder="000.000.000-00"
                className="h-12 text-lg border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
              />
              {cpfInput && cpfInput.length !== 11 && (
                <div className="flex items-center gap-2 text-amber-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  CPF deve conter 11 dígitos
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4">
              <Button
                onClick={PatientSearchMethod}
                disabled={isLoading || !cpfInput || cpfInput.length !== 11}
                className="w-full h-12 bg-[#003566] text-white hover:bg-[#003566]/90 text-lg font-medium transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Pesquisando...
                  </div>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Pesquisar Paciente
                  </>
                )}
              </Button>

              {showAddButton && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <Button
                    onClick={() => next(1)}
                    className="w-full h-12 bg-green-600 text-white hover:bg-green-700 text-lg font-medium transition-colors"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Cadastrar Novo Paciente
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
