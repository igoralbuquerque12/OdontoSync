import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Home'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} ></Route>
            </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes