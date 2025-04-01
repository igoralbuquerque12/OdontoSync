import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
          <nav className="mx-7">
            <div className='flex gap-4'>
                <Button asChild variant="default" className='border-1 hover:bg-black hover:text-white'>
                    <Link to="/login">Login</Link>
                </Button>

                <Button asChild variant="default" className='border-1 hover:bg-black hover:text-white'>
                    <Link to="/cadastrar">Cadastrar</Link>
                </Button>
            </div>
          </nav>
    )
}

