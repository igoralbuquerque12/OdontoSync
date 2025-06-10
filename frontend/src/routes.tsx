import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/layout'
import Home from './pages/Home'
import RegisterSchedule from './pages/schedule/Register'
import RegisterUser from './pages/users/Register'
import RegisterPatient from './pages/patient/Register'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path='/agenda/cadastrar' element={<RegisterSchedule />}></Route>
                     <Route path='/paciente/cadastrar' element={<RegisterPatient />}></Route>
                </Route>
                <Route path='/cadastro' element={<RegisterUser />}></Route>
            </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes