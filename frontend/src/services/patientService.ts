import { defaultErrorFunction } from '../utils/errorTratament'
import { Patient } from '../interfaces/patient'

interface returnType {
    status: boolean
    content: Patient | string | null
}

export async function getPatient(cpf: string = ''): Promise<returnType> {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/patient/${cpf}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
              },
        })
    
        if (!response.ok) {
            throw new Error('Bad return from get patient')
        }
        
        const dataPatient : Patient = await response.json()
        return {
            status: true,
            content: dataPatient
        }

    } catch (error) {
        defaultErrorFunction(error)
        return { 
            status: false,
            content: 'Não foi possível buscar os pacientes cadastrados.'
        }
    }
}


export async function postPatient(patient: Patient): Promise<returnType> {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/patient/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patient)
        })

        if (!response.ok) {
            const erroData = await response.json()
            if (erroData.cpf) {
                return { status: false, content: 'Já existe um paciente cadastrado com este CPF.' }
            } 

            throw new Error('Houve um erro desconhecido.')
        }

        const nameSplit = patient.name.split(' ')
        return { status: true, content: `Paciente ${nameSplit[0]} ${nameSplit[nameSplit.length - 1]} cadastrado com sucesso.` }

    } catch (error) {
        defaultErrorFunction(error)
        return {
            status: false,
            content: 'Houve um erro desconhecido.'
        }
    }
}
