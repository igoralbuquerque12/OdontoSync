import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

import { Patient } from '../../interfaces/patient'
import { getPatient } from '../../services/patientService'
import { defaultErrorFunction } from '@/utils/errorTratament'


type PatientSearchProps = {
  next: (jump: number) => void
  setPatient: (patient: Patient) => void
  setCpf: (cpf: string) => void
}


export function PatientSearch({ next, setPatient, setCpf }: PatientSearchProps) {
  const [cpfInput, setCpfInput] = useState('')

  const PatientSearchMethod = async () => {
    try {
      if (!cpfInput || cpfInput.length !== 11) {
        toast.error('Digite um cpf válido.')
        return 
      }
      
      const response = await getPatient(cpfInput)
      setCpf(cpfInput)
  
      if (response.status) {
        const dataPatient: Patient = response.content as Patient
        setPatient(dataPatient)

        const nameSplit = dataPatient.name.split(' ')
        toast(`Paciente ${nameSplit[0]} ${nameSplit[nameSplit.length - 1]} encontrado`)

        next(2)
  
      } else {
        toast.error('Paciente não encontrado. Faço o cadastro dele.')
        document.getElementById('button-addPatient')?.classList.remove('hidden')
      }

    } catch (error) {
      defaultErrorFunction(error)
    }
    
  }

  return (
    <div>
      <Card className="mt-40 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className='text-2xl'>Pesquisa de Paciente</CardTitle>
          <CardDescription className='text-base'>Digite o CPF do paciente para iniciar um agendamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF (11 dígitos)</Label>
              <Input
                id="cpf"
                value={cpfInput}
                onChange={(event) => setCpfInput(event.target.value) }
                maxLength={11}
                placeholder="Digite o CPF do paciente"
              />
            </div>
            <div className='pt-3 ' >
              <Button onClick={PatientSearchMethod} className="border-1 bg-[#003566] text-white hover:bg-white hover:text-black p-5 mb-3 w-full" variant='default'>
                Pesquisar
              </Button>
              <div id='button-addPatient' className='hidden'>
                <Button onClick={() => next(1)} className="border-1 bg-[#003566] text-white hover:bg-white hover:text-black p-5 w-full" variant='default' >
                  Cadastrar Paciente
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

