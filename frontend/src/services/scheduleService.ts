import { defaultErrorFunction } from '../utils/errorTratament'
import { Schedule, ListSchedule } from '../interfaces/schedule'
import { formatDate } from '@/utils/formatDate'

interface returnType {
    status: boolean
    content: ListSchedule[] | Schedule[] | Schedule | string | null
}

export async function getSchedule(date: Date) {
    try {
        const dateFormated = formatDate(date)
        const response = await fetch(`http://localhost:8000/api/v1/schedule/?date=${dateFormated}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar dados de agendamentos')

        const data: ListSchedule[] = await response.json()

        return {
            status: true,
            content: data
        }
        
    } catch (error) {
        defaultErrorFunction(error)
        return {
            status: false,
            content: ('Erro ao buscar dados de agendamentos')
        }
    }
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