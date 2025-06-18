import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle } from "lucide-react"

import { getPatient } from "@/services/patientService"
import { Patient } from "@/interfaces/patient"

interface PatientSearchProps {
    onPatientFound: (patient: Patient) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

export function FilterPatientSearch({ onPatientFound, isLoading, setIsLoading }: PatientSearchProps) {
    const [cpf, setCpf] = useState("")
    const [error, setError] = useState("")

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
        setCpf(formatted)
        setError("")
    }

    const validateCPF = (cpf: string) => {
        const numbers = cpf.replace(/\D/g, "")
        return numbers.length === 11
    }

    const handleSearch = async () => {
        if (!validateCPF(cpf)) {
            setError("CPF deve conter 11 dígitos")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const cpfOnlyNumbers = cpf.replace(/\D/g, '')
            const data = await getPatient(cpfOnlyNumbers)

            if (!data.status) throw error

            setTimeout(() => {
                onPatientFound(data.content as Patient)
                setIsLoading(false)
            }, 500)
        } catch (error) {
            console.error("Error with get patient: ", error)
            setError("Paciente não encontrado")
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <Card className="border-[#003566]/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#003566]">
                    <Search className="h-5 w-5" />
                    Buscar Paciente
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
                            CPF do Paciente
                        </label>
                        <Input
                            id="cpf"
                            type="text"
                            value={cpf}
                            onChange={handleCPFChange}
                            onKeyPress={handleKeyPress}
                            placeholder="000.000.000-00"
                            maxLength={14}
                            className="border-[#003566]/30 focus:border-[#003566] focus:ring-[#003566]"
                        />
                        {error && (
                            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={handleSearch}
                        disabled={isLoading || !cpf}
                        className="bg-[#003566] text-amber-50 hover:bg-[#003566]/90 px-8"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Buscando...
                            </div>
                        ) : (
                            <>
                                <Search className="h-4 w-4 mr-2" />
                                Buscar
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
