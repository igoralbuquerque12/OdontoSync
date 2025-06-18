import { RegisterPatientForm } from "@/components/patient/registerPatientForm"
import { UserPlus } from "lucide-react"

export default function RegisterPatient() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <UserPlus className="h-8 w-8 text-[#003566]" />
                        <h1 className="text-3xl font-bold text-gray-900">Cadastro de Paciente</h1>
                    </div>
                    <p className="text-gray-600">Preencha os dados para cadastrar um novo paciente</p>
                </div>
                <RegisterPatientForm />
            </div>
        </div>
    )
}