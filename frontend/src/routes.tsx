import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/layout'
import Home from './pages/Home'
import RegisterSchedule from './pages/schedule/Register'
import RegisterUser from './pages/users/Register'
import RegisterPatient from './pages/patient/RegisterPatient'
import SearchPatient from './pages/patient/SearchPatient'
import Statistics from './pages/statistics/Statistics'
import NotFound from "@/pages/NotFound"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path='/agenda/cadastrar' element={<RegisterSchedule />}></Route>
                    <Route path='/paciente/buscar' element={<SearchPatient />}></Route>
                     <Route path='/paciente/cadastrar' element={<RegisterPatient />}></Route>
                     <Route path='/estatisticas' element={<Statistics />}></Route>
                </Route>
                <Route path='/cadastro' element={<RegisterUser />}></Route>

                <Route path='*' element={<NotFound />}/>
            </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes