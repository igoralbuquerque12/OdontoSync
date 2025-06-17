import { ListSchedule } from "@/interfaces/schedule"


export function formatScheduleByWeekDay(schedules: ListSchedule[]): ListSchedule[][] {
    const groupedSchedules: ListSchedule[][] = [[], [], [], [], [], []]

    schedules.forEach(schedule => {
        const [year, month, day] = schedule.date.split('-').map(Number)
        const date = new Date(Date.UTC(year, month - 1, day, 3))
        
        const dayOfWeek = date.getDay() 

        if (dayOfWeek === 0) {
            return
        }

        groupedSchedules[dayOfWeek - 1].push(schedule)
    })

    return groupedSchedules
}