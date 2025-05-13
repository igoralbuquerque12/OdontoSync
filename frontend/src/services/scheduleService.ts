import { defaultErrorFunction } from '../utils/errorTratament'
import { Schedule } from '../interfaces/schedule'


export async function postSchedule(schedule: Schedule): Promise<boolean> {
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

        return true

    } catch (error) {
        defaultErrorFunction(error)
        throw error
        return false
    }
}