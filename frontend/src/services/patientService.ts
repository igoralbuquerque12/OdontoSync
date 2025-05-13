import { defaultErrorFunction } from '../utils/errorTratament'
import { Patient } from '../interfaces/patient'


export async function getPatients(cpf: string = ''): Promise<Patient | null> {
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
        return dataPatient || null

    } catch (error) {
        defaultErrorFunction(error)
        return null
    }
}


export async function postPatient(patient: Patient): Promise<boolean> {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/patient/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patient)
        })

        if (!response.ok) {
            throw new Error("Bad return from get patient")
        }

        return true

    } catch (error) {
        defaultErrorFunction(error)
        return false
    }
}
