import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User, Save, Trash2, CheckCircle, AlertCircle } from "lucide-react"
import { Patient } from "@/interfaces/patient"

interface PatientFormProps {
  patient: Patient
  onPatientUpdated: (patient: Patient) => void
  onPatientDeleted: () => void
}

export function SearchPatientForm({ patient, onPatientUpdated, onPatientDeleted }: PatientFormProps) {
  const [formData, setFormData] = useState<Patient>(patient)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")

    if (numbers.length <= 2) {
      return `(${numbers}`
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
  }

  const handleInputChange = (field: keyof Patient, value: string) => {
    if (field === "phone") {
      value = formatPhone(value)
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      // Simular chamada para API
      // const response = await fetch(`/api/patients/${formData.cpf.replace(/\D/g, "")}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // })

      setTimeout(() => {
        onPatientUpdated(formData)
        setIsEditing(false)
        setIsSaving(false)
        setMessage({ type: "success", text: "Dados atualizados com sucesso!" })

        // Remove a mensagem após 3 segundos
        setTimeout(() => setMessage(null), 3000)
      }, 1000)
    } catch (error) {
      console.error('Error at update patient: ', error)
      setIsSaving(false)
      setMessage({ type: "error", text: "Erro ao salvar os dados" })
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Simular chamada para API
      // await fetch(`/api/patients/${formData.cpf.replace(/\D/g, "")}`, {
      //   method: "DELETE"
      // })

      setTimeout(() => {
        onPatientDeleted()
        setIsDeleting(false)
      }, 1000)
    } catch (error) {
      console.error("Error at delete patient: ", error)
      setIsDeleting(false)
      setMessage({ type: "error", text: "Erro ao deletar paciente" })
    }
  }

  const handleCancel = () => {
    setFormData(patient)
    setIsEditing(false)
    setMessage(null)
  }

  return (
    <Card className="border-[#003566]/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-[#003566]">
            <User className="h-5 w-5" />
            Dados do Paciente
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-[#003566]/30 text-[#003566] hover:bg-[#003566] hover:text-white"
                >
                  Editar
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-600 hover:text-white">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Deletar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja deletar o paciente <strong>{formData.name}</strong>? Esta ação não pode
                        ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isDeleting ? "Deletando..." : "Deletar"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <>
                <Button onClick={handleCancel} variant="outline" disabled={isSaving}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="bg-[#003566] text-amber-50 hover:bg-[#003566]/90">
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Salvando...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {message && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" value={formData.cpf} disabled className="bg-gray-50 cursor-not-allowed" />
          </div>

          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : "border-[#003566]/30 focus:border-[#003566]"}
            />
          </div>

          <div>
            <Label htmlFor="birth_date">Data de Nascimento</Label>
            <Input
              id="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={(e) => handleInputChange("birth_date", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : "border-[#003566]/30 focus:border-[#003566]"}
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              placeholder="(11) 99999-9999"
              maxLength={15}
              className={!isEditing ? "bg-gray-50" : "border-[#003566]/30 focus:border-[#003566]"}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : "border-[#003566]/30 focus:border-[#003566]"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}