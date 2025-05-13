import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/layout'
import Home from './pages/Home'
import RegisterPatient from './pages/patients/Register'
import RegisterUser from './pages/users/Register'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path='/agenda/cadastrar' element={<RegisterPatient />}></Route>
                </Route>
                <Route path='/cadastro' element={<RegisterUser />}></Route>
            </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes