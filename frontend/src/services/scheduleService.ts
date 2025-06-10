import { defaultErrorFunction } from '../utils/errorTratament'
import { Schedule } from '../interfaces/schedule'

interface returnType {
    status: boolean
    content: Schedule | string | null
}

export async function postSchedule(schedule: Schedule): Promise<returnType> {
    try {
        const response = await fetch("http://localhost:8000/api/v1/schedule/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(schedule)
        })

        if (!response.ok) {
            throw new Error("Bad return from get schedule")
        }

        const createdData: Schedule = await response.json()

        return {
            status: true,
            content: createdData
        }

    } catch (error) {
        defaultErrorFunction(error)
        return {
            status: false,
            content: 'Houve um erro ao criar agendamento.'
        }
    }
}