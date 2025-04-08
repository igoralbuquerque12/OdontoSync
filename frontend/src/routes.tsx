import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/layout'
import Home from './pages/Home'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} ></Route>
                </Route>
            </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes