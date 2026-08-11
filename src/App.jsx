import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Navbar                from './components/Navbar/Navbar'
import Home                  from './components/Home/Home'
import About                 from './components/About/About'
import Consultation          from './components/Consultation/Consultation'
import RegisterConsultation  from './components/RegisterConsultation/RegisterConsultation'
import DietFoodService       from './components/DietFoodService/DietFoodService'
import RegisterDietFood      from './components/RegisterDietFood/RegisterDietFood'
import Contact               from './components/Contact/Contact'
import Footer                from './components/Footer/Footer'
import AdminBMICalculator    from './components/AdminBMICalculator/AdminBMICalculator'

function PublicSite() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Home />
        <About />
        <Consultation />
        <RegisterConsultation />
        <DietFoodService />
        <RegisterDietFood />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<PublicSite />} />
        <Route path="/admin" element={<AdminBMICalculator />} />
      </Routes>
    </BrowserRouter>
  )
}
