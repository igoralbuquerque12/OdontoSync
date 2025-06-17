import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { UserRoundPlus } from 'lucide-react'

import { PatientGraph } from '../components/graph-patients'
import { ListPatient } from '../components/list-patients'
import { AIContainer } from '../components/ai-container'

import { getDateToday } from '../utils/getDate'
import { ListSchedule } from '@/interfaces/schedule'
import { getTodaySchedule, getScheduleByInterval } from '@/services/scheduleService'

import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { getWeekStartEndDates } from "@/utils/getDate"

const today = getDateToday();

export default function Home() {
  const [todaySchedules, setTodaySchedules] = useState<ListSchedule[]>([])
  const [weekSchedules, setWeekSchedules] = useState<ListSchedule[]>([])

  useEffect(() => {
    const todayDateFormated = formatDate(new Date())
    const weekDateFormated = getWeekStartEndDates()

    const getSchedules = async () => {
      const responseTodaySchedules = await getTodaySchedule(todayDateFormated)
      const responseWeekSchedules = await getScheduleByInterval(weekDateFormated[0], weekDateFormated[1])
      
      return {
        today: responseTodaySchedules.content,
        week: responseWeekSchedules.content
      }
    }

    const setSchedulesByFetch = async () => {
      const data = await getSchedules()
      setTodaySchedules(data.today as ListSchedule[])
      setWeekSchedules(data.week as ListSchedule[])
    }
    
    setSchedulesByFetch()
  }, [])

  return (
    <div>
      <div className='flex justify-between m-5 p-2'>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild variant="default" className='border-1 bg-[#003566] text-white hover:bg-white hover:text-black p-5'>
            <Link to="/agenda/cadastrar"><UserRoundPlus /> Cadastrar Horário</Link>
        </Button>
      </div>
      
      <div className='flex gap-0.5'>
        <div className="flex-1 border-[1px] border-gray-300 rounded shadow-sm m-5 p-5 ">
          <div className='pb-4'>
            <h1 className='text-2xl font-bold pb-1'>Quadro de Horários</h1>
            <p className='text-gray-500 font-medium'>Veja como está a distribuição dos horários da sua semana</p>
          </div>
          <PatientGraph dataSchedules={weekSchedules} />
        </div>

        <div className='border-[1px] border-gray-300 rounded shadow-sm m-5 p-5'>
          <AIContainer />
        </div>
      </div>
      
        
      <div className='flex-shrink-0 border-[1px] border-gray-300 rounded shadow-sm m-5 p-5'> 
        <div className='pb-4'>
          <h1 className='text-2xl font-bold pb-1'>Agenda do Dia</h1>
          <p className='text-gray-500 font-medium'>{today[0]}, {today[1]} de {today[2]} de {today[3]}</p>
        </div>
        <ListPatient dataSchedule={todaySchedules} />
      </div>
    </div>
  )
}