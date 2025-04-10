import { MessageSquareText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
 
export function AIContainer() {
    return (
        <div className='h-[400px] w-full'>
            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-bold'>Precisa de ajuda?</h1>
                <p className='text-gray-700 font-medium'>Consiga ajuda usando um agente de IA </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 mt-3 gap-12 pt-10">
                <div className="w-50 h-50 bg-[#e8e8e8] rounded-full flex items-center justify-center">
                    <MessageSquareText className="w-18 h-18 text-white" />
                </div>

                <Button asChild variant="default" className='border-1 bg-[#003566] text-white hover:bg-white hover:text-black p-5 text-base'>
                    <Link to="/ai/contato">Contatar IA Assistente</Link>
                </Button>

            </div>
            
        </div>
    )
}